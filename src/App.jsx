import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const API_BASE_URL = 'https://api.themoviedb.org/3';
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const [MovieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState();
  const [genres, setGenres] = useState([]);

  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  }

  const [errorMessage, setErrorMessage] = useState('');

  const fetchMovies = async (query = '') => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&` : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc&`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.response === 'False') {
        setErrorMessage(data.error || 'No movies found.');
      } else {
        setErrorMessage('');
        setMovieList(data.results);
        return;
      }
    } catch(er) {
        console.error('Error fetching movies:', er);
        setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
        setIsLoading(false);
    }
  }

  const fetchGenres = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/genre/movie/list`,
        API_OPTIONS
      );

      const data = await response.json();
      setGenres(data.genres);
    } catch (error) {
      console.error("Failed to fetch genres", error);
    }
  };

  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  useEffect(() => {
    fetchGenres();
  }, []);
  return (
    <main>
      <div className='pattern' />
      <div className="wrapper">
        <header>
          <img src={'/hero-img.png'} alt="Hero Banner" className="hero" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className='all-movies'>
          <h2 className='mt-5'>Top movies</h2>
          {isLoading ? (
            <p className='text-white'><Spinner /></p>
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {MovieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} genres={genres}/>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App;