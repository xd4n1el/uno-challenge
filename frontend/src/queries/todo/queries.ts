import { gql } from '@apollo/client';

export const GET_TODO_LIST = gql`
  query Find($filter: ItemInput) {
    find(filter: $filter) {
      id
      name
      todo
    }
  }
`;
