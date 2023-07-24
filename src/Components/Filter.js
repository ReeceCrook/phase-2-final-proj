import React from "react";

function Filter({ setFilterValue }) {  


    function handleChange(value) {
        setFilterValue(value)
    }

    
    return (
        <div className="filterDiv">
            <label htmlFor="filter"> Filter by: </label>
            <select id="filter" onChange={e => handleChange(e.target.value)}>
                <option value="All">All</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
            </select>
      </div>
    )
}

export default Filter