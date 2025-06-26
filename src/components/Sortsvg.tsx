import React from 'react';

export default function Sortsvg({ color }: { color: string }) {
  return (
    <div>
      <svg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <path d='M8 0L2 6V7H14V6L8 0Z' fill={color}></path>
          <path d='M8 16L2 10V9H14V10L8 16Z' fill={color}></path>
        </g>
      </svg>
    </div>
  );
}
