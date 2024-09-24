'use client';

import { useQueryState } from 'nuqs';

import IconButton from '@/components/IconButton';

import AddIcon from '@/assets/add.icon.svg';
import Input from '@/components/ui-kit/Input';
import { usePathname, useRouter } from 'next/navigation';

const ListHeader = () => {
  const { replace } = useRouter();
  const pathname = usePathname();

  const [name, setName] = useQueryState<string>('name', {
    shallow: false,
    defaultValue: '',
    parse: value => (value || '')?.toString(),
    clearOnDefault: true,
  }); // query é sempre melhor que state interno

  const onAdd = () => {
    replace(`${pathname}?create=true`);
  };

  return (
    <div className="w-full h-fit box-bordr py-3 flex box-border px-2 justify-between mb-4">
      <Input
        defaultValue={name || ''}
        variant="THEME"
        onChange={({ target: { value } }) => setName(value || '')}
        placeholder="Buscar..."
      />

      <IconButton
        Icon={AddIcon}
        variant="GREEN"
        aria-label="Adicionar"
        onClick={onAdd}
      />
    </div>
  );
};

export default ListHeader;
