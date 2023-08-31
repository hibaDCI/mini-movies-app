import React, {useState} from "react";
import "./App.css";
import {FaSpinner} from "react-icons/fa";

import Search from "./Components/Search";
import MovieCard from "./Components/MovieCard";

function App() {
  // const [search, setSearch] = useState("cast");
  const [moviesList, setMoviesList] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // const handleChange = (text) => {
  //   setSearch(text);
  // };
  const handleSearch = async (text) => {
    if (text === "") {
      setMoviesList([]);
      return;
    }

    setIsLoading(true);
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=50033905&s=${text}`
    );
    const data = await response.json();
    console.log(data);
    if (data.Response === "True") {
      setIsLoading(false);
      setError(null);
      setMoviesList(data.Search);
    } else {
      setMoviesList([]);
      setIsLoading(false);
      setError(data.Error);
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setMoviesList([]);

  //     setIsLoading(true);
  //     const response = await fetch(
  //       `https://www.omdbapi.com/?apikey=50033905&s=${search}`
  //     );
  //     const data = await response.json();
  //     console.log(data);
  //     if (data.Response === "True") {
  //       setError(null);
  //       setMoviesList(data.Search);
  //       setIsLoading(false);
  //     } else {
  //       setMoviesList([]);
  //       setError(data.Error);
  //     }
  //   };
  //   fetchData();
  // }, [search]); // it tell when to call the useEffect again , but be careful with , be carful of the endless loop

  return (
    <div className="App">
      <h1> React search movies</h1>
      <Search onSearch={handleSearch} />
      <div
        style={{
          width: "100vw",

          backgroundColor: "aqua",
          textAlign: "center",
        }}
      >
        {isLoading ? (
          <FaSpinner className="spinner" />
        ) : (
          <div
            style={{
              width: "100vw",

              backgroundColor: "aqua",
              display: "flex",

              flexWrap: "wrap",
            }}
          >
            {moviesList.map((item, index) => {
              // return <div>{item.Title}</div>;

              return (
                <MovieCard key={index} title={item.Title} id={item.imdbID} />
              );
            })}
          </div>
        )}
      </div>
      {error !== null && <h4>{error}</h4>}
    </div>
  );
}

export default App;
