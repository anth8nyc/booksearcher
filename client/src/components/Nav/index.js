import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a className="navbar-brand mr-4" href="/">
        Google Books
      </a>
      <Link to={"/books/"} className="text-white mr-2">
        Search Books
      </Link>
      <Link to={"/saved/"} className="text-white">
        My Books
      </Link>
    </nav>
  );
}

export default Nav;
