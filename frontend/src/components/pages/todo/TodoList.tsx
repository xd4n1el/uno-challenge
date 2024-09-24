import { memo, ReactElement } from 'react';
import dynamic from 'next/dynamic';

import ListHeader from './ListHeader';
import ListLoader from './ListLoader';
import TodoItem from '@/components/pages/todo/TodoItem';

import { TodoItem as TodoItemValues } from '@/utils/interfaces';
import Loader from '@/components/ui-kit/Loader';

interface TodoListProps {
  todos: TodoItemValues[];
  success: boolean;
}

const List = dynamic(() => import('@/components/List'), {
  ssr: false,
  loading() {
    return <ListLoader />;
  },
});

const TodoList = memo<TodoListProps>(
  ({ todos = [], success = false }): ReactElement => {
    return (
      <div className="w-full h-[calc(100%_-_70px)] [&>.loader]:mx-auto">
        <ListHeader />

        {todos?.length > 0 && (
          <List items={todos}>
            <TodoItem />
          </List>
        )}

        {success && todos?.length === 0 && <Loader />}

        {!success && todos?.length === 0 && (
          <p className="mx-auto mt-10 text-cyan-200 font-bold text-xl tracking-wide w-fit h-fit">
            Não há itens a serem exibidos.
          </p>
        )}
      </div>
    );
  },
);

export default TodoList;
