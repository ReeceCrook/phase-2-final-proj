import React from "react";

function Filter({ setFetchResult, setTrigger, fetchResult }) {  


    function handleChange(value) {
        console.log("")

        if(value !== "All") {
            setTrigger((trigger) => !trigger)
            setTimeout(() => {
                setFetchResult((result) => result.filter(current => current.type === value))
            }, 100)
            
        } else {
            setTrigger((trigger) => !trigger)
        }
        
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