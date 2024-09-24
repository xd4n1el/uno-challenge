import { TodoItem } from '@/utils/interfaces';
import { createStore } from 'zustand';

interface TodoStore {
  items: TodoItem[];
}

export const useTodoStore = createStore<TodoStore>(set => ({
  items: [],
  addTodo(item: TodoItem) {
    set(state => ({ items: [...state.items, item] }));
  },
  updateTodo() {},
  removeTodo() {},
}));
