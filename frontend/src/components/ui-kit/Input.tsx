'use client';

import { variantResolver } from '@/utils/functions';
import { InputHTMLAttributes, ReactElement } from 'react';

export enum Variants {
  THEME = 'text-cyan-200 border-b border-b-cyan-200',
}

export type VariantsMap = 'THEME';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: VariantsMap;
}

const Input = ({
  variant,
  className = '',
  ...rest
}: InputProps): ReactElement => {
  return (
    <input
      {...rest}
      className={`rounded-sm focus:outline-0 !max-w-none box-border pl-3 pr-1 py-1 ${variantResolver(variant, Variants)} ${className}`}
    />
  );
};

export default Input;
