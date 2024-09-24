'use client';

import { memo, ReactNode, useEffect, useRef } from 'react';

import Row from './Row';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList } from 'react-window';

interface RowHeight {
  height: number;
  index: number;
}

export interface ListProps {
  children: ReactNode;
  items?: any[];
}

const List = memo<ListProps>(({ children, items = [] }) => {
  const listRef = useRef<VariableSizeList>(null);
  const rowHeights = useRef<RowHeight[]>([]);

  useEffect(() => {
    if (items?.length > 0) scrollToBottom();
  }, [items]);

  const getItemSize = (pos: number) => {
    const heights = rowHeights?.current || [];

    const { height = 0 } = heights?.find(({ index }) => index === pos) || {};

    return height + 8 || 82;
  };

  const addRowHeight = (index: number, height: number) => {
    listRef?.current?.resetAfterIndex?.(0);

    rowHeights?.current?.push({ index, height });
  };

  const scrollToBottom = () => {
    listRef?.current?.scrollToItem?.(items.length - 1, 'end');
  };

  return (
    <AutoSizer className="animate-in fade-in-0 duration-1000">
      {({ height, width }) => (
        <VariableSizeList
          ref={listRef}
          width={width}
          itemData={items}
          height={height}
          itemCount={items.length}
          itemSize={getItemSize}>
          {({ index, data, ...rest }: any) => {
            return (
              <Row
                {...rest}
                data={data[index]}
                index={index}
                getHeight={addRowHeight}>
                {children}
              </Row>
            );
          }}
        </VariableSizeList>
      )}
    </AutoSizer>
  );
});

export default List;
