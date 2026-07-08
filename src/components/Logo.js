import React from 'react';

export default function Logo({ className, height, width }) {
  return (
    <img
      src="/logo.png"
      alt="Tailors2U Logo"
      height={height}
      width={width}
      className={className}
      style={{ display: 'inline-block', verticalAlign: 'middle', objectFit: 'contain' }}
      draggable={false}
    />
  );
}
