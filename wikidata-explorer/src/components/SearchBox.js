import React, { useState } from 'react';

export default function SearchBox({ onSearch }) {
  const [term, setTerm] = useState('');

  const submit = e => {
    e.preventDefault();
    if (term.trim()) onSearch(term);
  };

  return (
    <form onSubmit={submit} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={term}
        onChange={e => setTerm(e.target.value)}
        placeholder="Search Wikidata…"
      />
      <button type="submit">Search</button>
    </form>
  );
}
