'use client';

import { memo, ReactElement } from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { useQueryState } from 'nuqs';

import IconButton from '@/components/IconButton';

import EditIcon from '@/assets/edit.icon.svg';
import TrashIcon from '@/assets/trash.icon.svg';

import { TodoItem as TodoItemValues } from '@/utils/interfaces';
import { REMOVE_ITEM_MUTATION } from '@/queries/todo/mutations';

export type TodoItemProps = TodoItemValues;

const TodoItem = memo<TodoItemProps>(({ name, todo, id }): ReactElement => {
  const { refresh } = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemId, setItemId] = useQueryState('id', {
    shallow: false,
  });
  const [removeItem] = useMutation(REMOVE_ITEM_MUTATION, {
    variables: {
      id,
    },
  });

  const update = () => {
    setItemId(id!);
  };

  const remove = async () => {
    try {
      await removeItem();
    } catch ({ message }: any) {
      console.log(message);
    } finally {
      refresh();
    }
  };

  return (
    <div className="flex flex-col box-border p-2 border-2 border-cyan-300 shadow-md rounded-lg overflow-hidden first:mt-3 last:pb-3">
      <div className="w-full mb-2 py-2 flex items-center border-b border-gray-200">
        <p className="mr-2">{name}</p>

        <div className="flex w-fit h-fit ml-auto [&>*]:mr-2 [&>*:last-child]:mr-0">
          <IconButton
            Icon={EditIcon}
            variant="BLUE"
            aria-label="Atualizar Todo"
            onClick={update}
          />

          <IconButton
            Icon={TrashIcon}
            variant="RED"
            aria-label="Remover Todo"
            onClick={remove}
          />
        </div>
      </div>

      <p className="break-all whitespace-pre-wrap">{todo}</p>
    </div>
  );
});

export default TodoItem;
