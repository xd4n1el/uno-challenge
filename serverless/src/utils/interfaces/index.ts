import { ResolverFunction } from '@/utils/types';

export interface TodoItem {
  id: string;
  name: string;
  todo: string;
}

export interface IResolverArgs<T = any> {
  filter: T;
  values: T;
}

export interface BaseService {
  getQueries: () => any;
  getTypeDefs: () => any;
  getMutations: () => any;
}

export interface Constructo<T = any> {
  new (...args: any[]): T;
}

export interface IHandler<TArgs = any> {
  name: string;
  resolver: ResolverFunction<TArgs>;
}
