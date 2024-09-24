import { v4 as generateUUID } from 'uuid';
import { GraphQLError } from 'graphql';
import { ApolloServerErrorCode } from '@apollo/server/errors';

import { TodoTypeDefs } from '@/services/todo/todo.queries';
import { BaseService, IBaseService } from '@/shared/base.service';

import { TODO_LIST } from '@/utils/make-data';
import { IResolverArgs, TodoItem } from '@/utils/interfaces';

/** Explicando
 *
 * Basicamente estou construindo um serviço que herda alguns métodos
 * que estão presentes no BaseService, o qual é responsável por fazer nosso modulo pai entender quais resolvers e types ele deve extrair
 */

export class TodoService extends BaseService implements IBaseService {
  typeDefs: string = TodoTypeDefs; // os tipos desse serviço para ser posteriormente passados ao apollo

  constructor() {
    super();

    this.initialize(this);
  }

  private findItem = ({ id, name, todo }: Partial<TodoItem>) => {
    return TODO_LIST.filter(item => {
      const matchId = id ? item.id === id : true;
      const matchName = name
        ? item.name.toLowerCase().includes(name.toLowerCase())
        : true;
      const matchTodo = todo
        ? item.todo.toLowerCase().includes(todo.toLowerCase())
        : true;

      return matchName && matchId && matchTodo;
    });
  };

  // responsavel por criar novos todos
  create = (
    parent: any,
    { values: { name, todo } }: IResolverArgs<TodoItem>,
  ) => {
    const [item] = this.findItem({ name }); // buscar elemento por nome na TODO_LIST

    if (item) {
      return new GraphQLError('Campo nome já está em uso.', {
        extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
      });
    }

    TODO_LIST.push({
      id: generateUUID(),
      name,
      todo,
    });

    console.log(new Date().toLocaleTimeString(), 'mutation create executed');
  };

  // responsavel por buscar itens na lista todo
  find = (parent: any, { filter }: IResolverArgs<TodoItem>) => {
    console.log(new Date().toLocaleTimeString(), 'query find executed');

    if (Object.keys(filter)?.length > 0) {
      return this.findItem(filter);
    }

    return TODO_LIST;
  };

  // método para atualizar o todo
  update = (parent: any, { values }: IResolverArgs<TodoItem>) => {
    const index = TODO_LIST.findIndex(
      ({ id: itemId }) => itemId === values?.id,
    );

    // validar se o elemento existe na lista
    if (index === -1) {
      throw new GraphQLError('Todo não encontrado', {
        extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
      });
    }

    const element = TODO_LIST[index];

    if (values?.name !== element?.name) {
      const [item] = this.findItem({ name: values?.name });

      if (item) {
        return new GraphQLError('Campo nome já está em uso.', {
          extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
        });
      }
    }

    for (const field in values) {
      if (!field || field === 'id') continue;

      (TODO_LIST as any)[index][field] = (values as any)[field];
    }

    console.log(new Date().toLocaleTimeString(), 'mutation update executed');
  };

  // excluír todo
  remove = (parent: any, { id }: any) => {
    const index = TODO_LIST.findIndex(({ id: itemId }) => itemId === id);

    if (index === -1) {
      throw new GraphQLError('Todo não encontrado', {
        extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
      });
    }

    TODO_LIST.splice(index, 1);

    console.log(
      new Date().toLocaleTimeString(),
      'mutation remove executed on: ',
      index,
    );
  };
}
