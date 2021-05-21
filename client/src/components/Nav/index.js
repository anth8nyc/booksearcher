import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Google Books
      </a>
      <Link></Link>
      <Link to={"/books/"} className="text-white mr-2">
        <strong>Search Books</strong>
      </Link>
      <Link to={"/saved/"} className="text-white">
        <strong>Saved Books</strong>
      </Link>
    </nav>
  );
}

export default Nav;
