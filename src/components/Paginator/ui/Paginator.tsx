import React from 'react';



type PaginationProps = {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav?: {
    current: number;
    total: number;
  };
};

export function Paginator (props: PaginationProps)  {
  const { nav = null, disable, onNextPageClick, onPrevPageClick } = props;

  return (
    <div>
        <button onClick={onPrevPageClick} disabled={disable.left}></button>
        <span>Страница {nav?.current} из {nav?.total} </span>
        <button onClick={onNextPageClick} disabled={disable.right}></button>
    </div>
  )
}