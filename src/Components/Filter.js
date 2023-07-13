import React, { useEffect } from "react";

function Filter({ setFetchResult, setCompletedChores, filterValue, setFilterValue }) {


    useEffect(() => {
        if(filterValue !== "All") {
            setTimeout(() => {
                setFetchResult((result) => result.filter(current => current.type === filterValue))
                setCompletedChores((chores) => chores.filter(current => current.type === filterValue))
            }, 100)
        }

    }, [filterValue])
   
    return (
        <div className="filterDiv">
            <label htmlFor="filter"> Filter by: </label>
            <select id="filter" value={filterValue} onChange={e => setFilterValue(e.target.value)}>
                <option value="All">All</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
            </select>
      </div>
    )
}

export default Filter