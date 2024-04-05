import React, { useState } from 'react';

function SearchForm({ onSearch }) {
  const [town, setTown] = useState('');
  const [radius, setRadius] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(town, radius);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Town"
        value={town}
        onChange={(e) => setTown(e.target.value)}
      />
      <input
        type="text"
        placeholder="Radius (in miles)"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;
