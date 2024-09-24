import { IHandler } from '@/utils/interfaces';
import { ResolverFunction } from '@/utils/types';

export const createResolvers = <T>(...handlers: IHandler<T>[]) => {
  const resolvers: { [key: string]: ResolverFunction } = {};

  handlers.forEach(({ name, resolver }) => {
    resolvers[name] = resolver;
  });

  return resolvers;
};
