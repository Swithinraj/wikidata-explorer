import React from 'react';

export default function ResultsList({ items, onSelect }) {
  if (!items.length) return null;
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <button onClick={() => onSelect(item.id)}>
            {item.label} ({item.id})
          </button>
        </li>
      ))}
    </ul>
  );
}
