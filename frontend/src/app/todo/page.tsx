'use server';

import Header from '@/components/ui-kit/Header';
import TodoList from '@/components/pages/todo/TodoList';
import { getTodos } from '../actions/todo.actions';

const TodoPage = async ({
  searchParams: { name } = {},
}: {
  searchParams?: { name?: string };
}) => {
  const { data, success } = await getTodos({ name });

  return (
    <>
      <Header />

      <main className="flex w-full h-[calc(100svh_-_64px)] box-border py-3 px-6">
        <TodoList todos={data} success={success} />
      </main>
    </>
  );
};

export default TodoPage;
