import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaRegHeart } from "react-icons/fa";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [likedMovies, setLikedMovies] = useState([]); // Track liked movies

  useEffect(() => {
    fetch("http://www.omdbapi.com/?s=batman&apikey=f35dfaec")
      .then((response) => response.json())
      .then((data) => {
        if (data.Search) {
          setMovies(data.Search);
        } else {
          console.error("No movies found");
        }
      })
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleLikeButton = async (movieId) => {
    const userId = 1;
    console.log("btn clicked");

    try {
      const response = await fetch("http://localhost:8000/api/addfavourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, movieId }),
      });

      if (!response.ok) {
        throw new Error("Failed to like movie");
      }

      const data = await response.json();
      console.log(data.message);

      setLikedMovies((prev) => [...prev, movieId]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const moviesToDisplay = searchResults || movies;

  return (
    <>
      <div className="items-center z-0 pt-10 flex flex-col mt-20 px-4 md:px-8">
        <SearchBar onSearchResults={handleSearchResults} />
      </div>
      <Container>
        <h4 className="mt-4">Your Entertainment Zone</h4>
        <Row className="g-6 mt-4 p-2 ml-4 my-4 justify-center">
          {moviesToDisplay?.length > 0 ? (
            moviesToDisplay.map((movie) => (
              <Col key={movie.imdbID} xs={12} sm={6} md={4} lg={3}>
                <Card style={{ width: "100%" }}>
                  <Card.Img
                    variant="top"
                    src={
                      movie.Poster !== "N/A" ? movie.Poster : "placeholder.png"
                    }
                    alt={movie.Title}
                  />
                  <Card.Body>
                    <Card.Title className="text-truncate">
                      {movie.Title}
                    </Card.Title>
                    <Card.Text>Year: {movie.Year}</Card.Text>
                    <Card.Text>Type: {movie.Type}</Card.Text>
                    <Button
                      variant="primary"
                      href={`https://www.imdb.com/title/${movie.imdbID}`}
                      target="_blank"
                    >
                      View Details
                    </Button>
                    <FaRegHeart
                      size={20}
                      style={{
                        marginLeft: "38px",
                        cursor: "pointer",
                        color: likedMovies.includes(movie.imdbID)
                          ? "red"
                          : "black",
                      }}
                      onClick={() => handleLikeButton(movie.imdbID)}
                    />
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p>No movies to display</p>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Home;