import React from 'react';

export default function DetailsPanel({ props }) {
  if (!props || !props.length) return <p>Select an item to see its properties</p>;
  return (
    <table style={{ marginTop: '1rem', width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Property</th>
          <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Value</th>
        </tr>
      </thead>
      <tbody>
        {props.map((p, i) => (
          <tr key={i}>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{p.property}</td>
            <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{p.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
