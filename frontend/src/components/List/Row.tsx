'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  memo,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
} from 'react';

import type { ListChildComponentProps } from 'react-window';

export interface RowProps extends ListChildComponentProps {
  data: any;
  children: ReactNode;
  getHeight: (index: number, height: number) => void;
}

const Row = memo<RowProps>(({ children, data, index, style, getHeight }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const height = rowRef?.current?.clientHeight || 0;

    getHeight(index, height);
  }, []);

  return (
    <div style={style}>
      <div ref={rowRef}>
        {Children.map(children, child => {
          if (!isValidElement(child)) return child;

          return cloneElement(child as ReactElement, { ...data });
        })}
      </div>
    </div>
  );
});

export default Row;
