import { BsSearch } from 'react-icons/bs';
import './Searchbar.css';
import { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmitForm = e => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmitForm}>
        <button type="submit" className="SearchForm-button ">
          <BsSearch size="20" />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleQueryChange}
        />
      </form>
    </header>
  );
};
