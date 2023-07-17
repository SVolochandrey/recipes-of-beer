import React from "react";
import { Link } from "react-router-dom";
import { PiBeerStein as Beer } from "react-icons/pi";

import css from "./Header.module.css";

const Header = () => {
  return (
    <div className={css.header}>
      <Link to="/" className={css.link}>
        <h1 className={css.title}>
          Beer<span>Recipes</span>
        </h1>
        <Beer className={css.icon} />
      </Link>
    </div>
  );
};

export default Header;
