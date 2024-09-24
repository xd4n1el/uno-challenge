import { IResolverArgs } from '@/utils/interfaces';
import { IResolver, ResolverFunction } from '@/utils/types';

export interface Handler {
  name: string;
  resolver: ResolverFunction;
}

export interface IBaseService<T = any> {
  create(parent: any, args: IResolverArgs<T>): any | Promise<any>;
  find(parent: any, args: IResolverArgs<T>): any | Promise<any>;
  update(parent: any, args: IResolverArgs<T>): any | Promise<any>;
  remove(parent: any, args: IResolverArgs<T>): any | Promise<any>;
  typeDefs: string;
}

/** Explicando
 *
 * classe responsavel por passar os metodos da classe que a herdar para o modulo construtor de resolvers e types,
 * contudo, ela é limitada a pegar apenas métodos tradicionais, em caso de haver mais métodos
 * é necessário chamar addQueries ou addMutations, apesar de não ser algo que tenha agradado.
 */

export abstract class BaseService<T extends IBaseService = any> {
  private queries: IResolver = {};
  private mutations: IResolver = {};

  private service: T | any; // o service seria a classe que esta herdando essa classe

  private createhandler(target: IResolver, { name, resolver }: Handler) {
    Object.assign(target, { [name]: resolver });
  }

  protected initialize(service: T) {
    this.service = service; // porque nao há como chamar super(this) na classe a qual esta herdando, e passar super(Service) nao me pareceu uma boa pratica

    this.addQuery({ name: 'find', resolver: service.find });
    this.addMutation({ name: 'create', resolver: service.create });
    this.addMutation({ name: 'update', resolver: service.update });
    this.addMutation({ name: 'remove', resolver: service.remove });
  }

  protected addQuery(queries: Handler) {
    this.createhandler(this.queries, queries);
  }

  protected addMutation(mutation: Handler) {
    this.createhandler(this.mutations, mutation);
  }

  // aqui nos fazemos um metodo genérico para pegarmos as queries
  protected getQueries() {
    return this.queries;
  }

  // aqui um metodo generico para pegarmos as mutações
  protected getMutations() {
    return this.mutations;
  }

  // aqui um metodo generico para pegarmos os tipos
  protected getTypeDefs() {
    return this.service.typeDefs;
  }
}
