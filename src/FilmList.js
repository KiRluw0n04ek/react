import React, { useState } from 'react';
import films from './film';

const FilmList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFilms, setFilteredFilms] = useState(films);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = films.filter((film) =>
      film.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredFilms(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="film-list">
        {filteredFilms.map((film) => (
          <div key={film.id} className="film-item">
            <img src={film.image} alt={film.name} />
            <h3>{film.name}</h3>
            <p>Year: {film.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilmList;
