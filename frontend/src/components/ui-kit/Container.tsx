import { variantResolver } from '@/utils/functions';
import { HTMLAttributes, memo, ReactElement } from 'react';

enum Variants {
  theme = 'THEME',
}

export type ContainerVariantsMap = 'theme';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  variant?: ContainerVariantsMap;
}

export const Container = memo(
  ({ variant, className = '' }: ContainerProps): ReactElement => {
    const classes: HTMLAttributes<HTMLDivElement>['className'] = `flex w-fit h-fit ${variantResolver(variant, Variants)} ${className}`;

    return <div className={classes}></div>;
  },
);
