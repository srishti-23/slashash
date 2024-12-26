import React, { useEffect, useState } from "react";

const FavoriteMoviesPage = () => {
  const [movies, setMovies] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);

  const userId = 0;
  useEffect(() => {
    if (!userId) {
      setError("User ID is not available");
      return;
    }

    const fetchFavorites = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/favourites?userId=${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch favorite movies");
        }

        const data = await response.json();
        console.log(data);
        setMovies(data.favourites); // Ensure this matches your API response structure
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchFavorites();
  }, [userId]); // This will run when userId changes

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Favorite Movies</h1>
      {Array.isArray(movies) && movies.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <h3>
                {movie.title} ({movie.release_year})
              </h3>
              <p>{movie.description}</p>
              <button onClick={() => handleLikeButton(movie)}>Like</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoriteMoviesPage;
