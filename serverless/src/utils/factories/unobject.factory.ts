import { ApolloServer, BaseContext, ContextFunction } from '@apollo/server';
import {
  StandaloneServerContextFunctionArgument,
  startStandaloneServer,
} from '@apollo/server/standalone';

import { Constructo } from '@/utils/interfaces';
import { ListenOptions } from 'net';

/** Explicando
 *
 * Essa classe na verdade é simplesmente responsavel por transformar nosso
 * modulo em um servidor apollo, passando os resolvers e tipos
 */

type Context = ContextFunction<
  [StandaloneServerContextFunctionArgument],
  BaseContext
>;

interface Config {
  context?: Context;
  listen?: ListenOptions;
}

export class UnobjectFactory {
  create(Module: Constructo) {
    const module = new Module(); // pega as configs do apollo server baseado no module
    const server = new ApolloServer(module);

    return { ...server, start: (config: Config) => this.start(server, config) };
  }

  private async start(server: ApolloServer, config: Config) {
    const standalone = await startStandaloneServer(server, config);

    return standalone;
  }
}
