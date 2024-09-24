export const TodoTypeDefs: string = `#graphql
  type Item {
    id: String
    name: String
    todo: String
  }

  input ItemInput {
    id: String
    name: String
    todo: String
  }

  type Query {
    find(filter: ItemInput): [Item]
  }

  type Mutation {
    create(values: ItemInput): Boolean
    update(values: ItemInput): Boolean
    remove(id: String!): Boolean
  }
`;
