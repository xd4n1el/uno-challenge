'use client';

import { gql } from '@apollo/client';

export const ADD_ITEM_MUTATION = gql`
  mutation create($values: ItemInput) {
    create(values: $values)
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation update($values: ItemInput) {
    update(values: $values)
  }
`;

export const REMOVE_ITEM_MUTATION = gql`
  mutation Remove($id: String!) {
    remove(id: $id)
  }
`;
