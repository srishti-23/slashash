import React, { useEffect, useState } from 'react';

const FavoriteMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId'); // or any other way to get the user ID


  useEffect(() => {
    if (!userId) {
      setError('User ID is not available');
      return;
    }
    const fetchFavorites = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/favourites?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch favorite movies');
        }
  
        const data = await response.json();
        console.log(data);
        setMovies(data.movies); 
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      }
    };
  
    fetchFavorites();
  }, [userId]);  // This will run when userId changes
   

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
 
      <div>
        <h1>Favorite Movies</h1>
        {error && <div>Error: {error}</div>}  {/* Display error if any */}
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
