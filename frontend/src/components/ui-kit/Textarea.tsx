'use client';

import { variantResolver } from '@/utils/functions';
import { ReactElement, TextareaHTMLAttributes } from 'react';

export enum Variants {
  THEME = 'text-cyan-200 border-b border-b-cyan-200',
}

export type VariantsMap = 'THEME';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: VariantsMap;
}

const Textarea = ({
  variant,
  className = '',
  ...rest
}: TextareaProps): ReactElement => {
  return (
    <textarea
      {...rest}
      className={`rounded-sm focus:outline-0 !max-w-none box-border px-3 pt-1 pb-3 ${variantResolver(variant, Variants)} ${className}`}
    />
  );
};

export default Textarea;
