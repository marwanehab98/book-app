// import React from "react";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/sidebar/Sidebar";
import Books from "../Books/Books";
import Favourites from "../Favourites/Favourites";
import { useLocation } from "react-router-dom";

const Main = () => {
  // console.log(useLocation().pathname);

  const [books, setBooks] = useState([]);
  useEffect(() => {
    // console.log(books);
  }, [books]);

  const handleAllBooks = (data) => {
    setBooks(data);
  }

  const [favourites, setFavourites] = useState([]);
  useEffect(() => {
    // console.log(favourites);
  }, [favourites]);

  const handleFavourites = (data) => {
    setFavourites(data);
  }

  return (
    <div className="main-layout">
      <SideBar />
      {useLocation().pathname === "/main" ? <Books
        myFavourites={favourites}
        myBooks={books}
        favourites={handleFavourites}
        allBooks={handleAllBooks}
      /> : null}
      {useLocation().pathname === "/favourites" ? <Favourites
        myFavourites={favourites}
        favourites={handleFavourites}
      /> : null}
    </div>
  );
};

export default Main;
