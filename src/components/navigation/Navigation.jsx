import React, { useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/img/logo.svg";
import "./navigation.scss";

const headerNav = [
  {
    icon: "home",
    href: "/",
  },
  {
    icon: "film",
    href: "/movie",
  },
  {
    icon: "monitor",
    href: "/tv",
  },
];
const Navigation = () => {
  const { pathname } = useLocation();
  const headerRef = useRef();
  const active = headerNav.findIndex((e) => e.href === pathname);

  return (
    <div ref={headerRef} className="nav-holder">
      <div className="nav-holder__logo logo">
        <Link className="logo__link" to="/">
          <img className="logo__img" src={logo} alt="movie app" />
        </Link>
      </div>
      <nav className="nav-holder__nav nav">
        {headerNav.map((e, i) => (
          <Link
            key={i}
            className={`nav__link ${i === active ? "active" : ""}`}
            to={e.href}
          >
            <span className={`icon-${e.icon}`}></span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Navigation;
