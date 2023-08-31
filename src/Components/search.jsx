import React, {useState, useEffect} from "react";

// import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
// import {faSearch} from "@fortawesome/free-solid-svg-icons";
function Search(props) {
  const [search, setSearch] = useState("cast");
  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("searching...");
    props.onSearch(search);
  };
  // Create a timeout to execute searchMovies after 700ms of user inactivity

  //Debouncing is a technique used to control how often a function is called, especially in scenarios where it can be triggered rapidly, such as in an input field where a user types.
  //?prevents unnecessary API requests for each character typed.
  useEffect(() => {
    // Create a timeout to execute searchMovies after 300ms of user inactivity
    //This timeout is set for 700 milliseconds
    const timeoutId = setTimeout(() => {
      //searchMovies function will be called only if there's a 700ms pause in the user's typing.
      props.onSearch(search);
    }, 700);

    // Clear the timeout on each change
    // it also serves another purpose in certain scenarios, and that's the case in the debouncing implementation you have

    //! serves as a cleanup mechanism, This demonstrates the flexibility of the return function in the useEffect hook., otherwise we'll have multiple timers running
    return () => {
      clearTimeout(timeoutId);
    };
  }, [search]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={onChange} />{" "}
        <button type="submit">
          {/* <FontAwesomeIcon icon={faSearch} /> */}
        </button>
      </form>
    </div>
  );
}

export default Search;
