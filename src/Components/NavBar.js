import React from "react";
import { NavLink } from "react-router-dom";
import "../main.css"

function NavBar() {
    return (
        <div>
            <NavLink
                to="/"
                exact="true"
                className="navLinks"
            >
                Home
            </NavLink>
            <NavLink
                to="/addchore"
                exact="true"
                className="navLinks"
            >
                Add a new Chore
            </NavLink>
            <NavLink
                to="/completedchores"
                exact="true"
                className="navLinks"
            >
                Completed Chores
            </NavLink>
            </div>
      );
}


export default NavBar