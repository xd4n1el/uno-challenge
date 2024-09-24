'use server';

import { GET_TODO_LIST } from '@/queries/todo/queries';
import clientAPI from '@/services/apollo';

export const getTodos = async ({
  name,
  id,
}: { name?: string; id?: string } = {}) => {
  try {
    const { data: { find = [] } = {} } = await clientAPI.query({
      query: GET_TODO_LIST,
      variables: { filter: { name, id } },
      fetchPolicy: 'no-cache',
    });

    if ((!name && find?.length === 0) || (!id && find?.length === 0)) {
      throw new Error();
    }

    return { success: true, data: find };
  } catch (error: any) {
    console.log('error fetching todos: ', error?.message);

    return { success: false, error };
  }
};
