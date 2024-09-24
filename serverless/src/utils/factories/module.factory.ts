import { BaseService } from '@/shared/base.service';
import { IResolver } from '@/utils/types';

/** Explicando
 *
 * ModuleFactory é bem simples, responsavel por pegar todos os serviços que vem no construtor
 * e agrupar os tipos dos serviços e resolvers para um common service, fazendo com que, caso haja mais services,
 * nao haja preocupação na hora de concatenar resolvers e queries,
 * assim facilitando a criação do nosso Apollo Server
 * Veja: utils/unobject.factory.ts para entender como ele irá funcionar posteriormente
 */

type IService = typeof BaseService;

export class ModuleFactory {
  public typeDefs: string = '';
  public resolvers = { Query: {}, Mutation: {} };

  constructor(...services: IService[]) {
    this.initialize(...services); // iniciar o Controller
  }

  private initialize(...services: any[]) {
    const types: string[] = [];

    // aqui só iteramos pelos services que vêm através do contrutor e juntamos tudo em apenas um lugar
    services.forEach(Service => {
      const instance = new Service(); // instanciar o service

      const serviceQueries: IResolver = instance.getQueries() ?? {}; // pegar todos os queries do service
      const serviceTypeDefs: string = instance.getTypeDefs() ?? ''; // pegar todos os typedefs do service
      const serviceMutations: IResolver = instance.getMutations() ?? {}; // pegar todos os mutations do service

      types.push(serviceTypeDefs);

      this.resolvers.Query = { ...this.resolvers.Query, ...serviceQueries };

      this.resolvers.Mutation = {
        ...this.resolvers.Mutation,
        ...serviceMutations,
      };
    });

    this.typeDefs = types.join('\n');
  }
}
