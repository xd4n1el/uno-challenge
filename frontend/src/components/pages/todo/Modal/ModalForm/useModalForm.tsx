'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';

import { TodoItem } from '@/utils/interfaces';
import { GET_TODO_LIST } from '@/queries/todo/queries';
import { getOperationName } from '@apollo/client/utilities';
import {
  ADD_ITEM_MUTATION,
  UPDATE_ITEM_MUTATION,
} from '@/queries/todo/mutations';
import { toast } from 'react-toastify';

type Values = Partial<Omit<TodoItem, 'id'>>;

interface useModalFormOptions {
  id?: string;
  initialValues?: Values;
}

export const useModalForm = ({
  id,
  initialValues: { name = '', todo = '' } = {},
}: useModalFormOptions = {}) => {
  const pathname = usePathname();
  const { replace, refresh } = useRouter();
  const [addItem] = useMutation(ADD_ITEM_MUTATION, {
    onError({ message }) {
      toast.error(message, { autoClose: 3000 });
    },
  });
  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION, {
    onError({ message }) {
      toast.error(message, { autoClose: 3000 });
    },
  });

  const formik = useFormik<Values>({
    initialValues: { name, todo },
    onSubmit,
  });

  // function syntax para ativar o hoisting
  async function onSubmit({ name, todo }: Values) {
    if (!name || !todo) {
      return toast.error(
        <>
          {!name && 'Nome é obrigatório.'}

          <br />

          {!todo && 'Tarefa é obrigatória.'}
        </>,
      );
    }

    try {
      if (id) {
        await updateItem({
          variables: {
            values: {
              id,
              name,
              todo,
            },
          },
          awaitRefetchQueries: true,
          refetchQueries: [getOperationName(GET_TODO_LIST) as any],
        });
      } else {
        await addItem({
          variables: {
            values: {
              name,
              todo,
            },
          },
          awaitRefetchQueries: true,
          refetchQueries: [getOperationName(GET_TODO_LIST) as any],
        });
      }
    } catch {
      return;
    } finally {
      replace(pathname);
      refresh(); // função que atualiza no lado do servidor, importante para o refetch
    }
  }

  return formik;
};
