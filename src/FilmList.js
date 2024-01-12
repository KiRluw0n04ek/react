import React, { useState } from 'react';
import films from './film';

const FilmList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFilms, setFilteredFilms] = useState(films);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [watchedFilms, setWatchedFilms] = useState([]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = films.filter((film) =>
      film.name.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredFilms(filtered);
  };

  const handleDetailsClick = (film) => {
    setSelectedFilm(film.id === selectedFilm ? null : film.id);
  };

  const handleWatchedToggle = (film) => {
    const updatedWatchedFilms = watchedFilms.includes(film.name)
      ? watchedFilms.filter((watchedFilm) => watchedFilm !== film.name)
      : [...watchedFilms, film.name];

    setWatchedFilms(updatedWatchedFilms);
  };

  const handleSort = (type) => {
    const sortedFilms = [...filteredFilms].sort((a, b) => {
      if (type === 'alphabetical') {
        return a.name.localeCompare(b.name);
      } else if (type === 'year') {
        return a.year - b.year;
      }
      return 0;
    });

    setFilteredFilms(sortedFilms);
  };

  const calculateScalePercentage = () => {
    const totalFilms = filteredFilms.length;
    const selectedFilmsCount = watchedFilms.length;

    return (selectedFilmsCount / totalFilms) * 100;
  };

  return (
    <div>
      <div>
        <button onClick={() => handleSort('alphabetical')}>Sort Alphabetically</button>
        <button onClick={() => handleSort('year')}>Sort by Year</button>
      </div>
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
            <p>
              Year: {film.year}{' '}
              <button onClick={() => handleDetailsClick(film)}>
                Details
              </button>{' '}
              <label>
                Watched
                <input
                  type="checkbox"
                  checked={watchedFilms.includes(film.name)}
                  onChange={() => handleWatchedToggle(film)}
                />
              </label>
            </p>
            {selectedFilm === film.id && <p>Release Year: {film.year}</p>}
          </div>
        ))}
      </div>
      <div className="watched-section">
        <h2>Переглянуті фільми</h2>
        <div className="oval-container">
          <div
            className="oval-fill"
            style={{ width: `${calculateScalePercentage()}%` }}
          />
        </div>
        <div className="watched-list">
          {watchedFilms.map((film) => (
            <div key={film}>{film}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilmList;
