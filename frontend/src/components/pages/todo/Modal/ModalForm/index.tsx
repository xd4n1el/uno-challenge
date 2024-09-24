'use client';

import { ReactElement } from 'react';
import { useModalForm } from './useModalForm';

import Input from '@/components/ui-kit/Input';
import IconButton from '@/components/IconButton';
import Textarea from '@/components/ui-kit/Textarea';

import SaveIcon from '@/assets/save.icon.svg';

import { TodoItem } from '@/utils/interfaces';

export interface ModalFormProps {
  id: string;
  initialValues?: Partial<TodoItem>;
}

const ModalForm = (props: ModalFormProps): ReactElement => {
  const { handleChange, handleSubmit, values } = useModalForm(props);

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-fit flex flex-col [&>*]:mb-3 [&>*:last-child]:mb-0">
      <Input
        name="name"
        variant="THEME"
        onChange={handleChange}
        value={values.name}
        placeholder="Nome"
      />

      <Textarea
        name="todo"
        variant="THEME"
        className="max-h-52"
        onChange={handleChange}
        value={values.todo}
        placeholder="Tarefa"
      />

      <div className="flex w-fit h-fit ml-auto mt-6">
        <IconButton
          aria-label="Salvar"
          type="submit"
          Icon={SaveIcon}
          variant="GREEN"
        />
      </div>
    </form>
  );
};

export default ModalForm;
