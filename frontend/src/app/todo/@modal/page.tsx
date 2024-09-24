import { getTodos } from '@/app/actions/todo.actions';
import CloseButton from '@/components/pages/todo/Modal/CloseButton';
import ModalForm from '@/components/pages/todo/Modal/ModalForm';
import { revalidatePath } from 'next/cache';

const ModalPage = async ({
  searchParams: { id, create },
}: {
  searchParams: { id: string; create: boolean };
}) => {
  revalidatePath('/todo');

  if (!id && !create) return null;

  const { data } = await getTodos({ id });

  const [item] = create ? [] : data;

  return (
    <div className="absolute flex top-0 left-0 bottom-0 right-0 z-50 backdrop-blur-md w-full h-full">
      <div className="w-full h-fit max-w-[90%] bg-gray-300 m-auto shadow-md box-border p-3 rounded-lg sm:max-w-sm">
        <div className="w-fullh-fit mb-5 flex items-center justify-between">
          <h1 className="text-white font-bold text-lg mr-2">
            {item?.name || 'Novo Todo'}
          </h1>

          <CloseButton />
        </div>

        <ModalForm id={id} initialValues={item} />
      </div>
    </div>
  );
};

export default ModalPage;
