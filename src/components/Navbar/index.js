import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <div className="flex gap-3 items-center justify-end">
        <Link
          className={`no-underline opacity-50 ${
            pathname === "/" && "!opacity-100"
          } `}
          to="/"
        >
          Home
        </Link>
        <Link
          className={`no-underline opacity-50 ${
            pathname === "/consent" && "!opacity-100"
          } `}
          to="/consent"
        >
          Consents
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
