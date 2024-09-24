export type IResolvers = {
  Query: any;
  Mutation: any;
};

export type ResolverFunction<TArgs = any> = (parent: any, args: TArgs) => any;

export type IResolver = { [key: string]: ResolverFunction };
