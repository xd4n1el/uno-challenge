'use client';

import { variantResolver } from '@/utils/functions';
import { ButtonHTMLAttributes, ComponentType, ReactElement } from 'react';

export enum Variants {
  RED = 'bg-red-600',
  BLUE = 'bg-blue-600',
  GREEN = 'bg-green-600',
}

export type VariantsMap = 'RED' | 'BLUE' | 'GREEN';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: ComponentType<any>;
  variant?: VariantsMap;
}

const IconButton = ({
  Icon,
  variant,
  ...rest
}: IconButtonProps): ReactElement => {
  return (
    <button
      {...rest}
      className={`w-fit h-fit flex box-border p-2 rounded-full ${variantResolver(variant, Variants)}`}>
      <Icon className="w-4 h-4 fill-white" />
    </button>
  );
};

export default IconButton;
