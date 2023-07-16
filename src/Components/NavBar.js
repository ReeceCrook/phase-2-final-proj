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
                to="/addTask"
                exact="true"
                className="navLinks"
            >
                Add New Task
            </NavLink>
            <NavLink
                to="/completedTasks"
                exact="true"
                className="navLinks"
            >
                Completed Tasks
            </NavLink>
            </div>
      );
}


export default NavBar