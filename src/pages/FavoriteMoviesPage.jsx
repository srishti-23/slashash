import React, { useEffect, useState } from 'react';

const FavoriteMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const userId = 1;
  // Fetch favorite movies when the component mounts
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/favourites?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch favorite movies');
        }

        const data = await response.json();
        setMovies(data.movies); 
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };

    fetchFavorites();
  }, [userId]);  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Favorite Movies</h1>
      {movies.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>{movie.title} ({movie.release_year})</h3>
              <p>{movie.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteMoviesPage;
