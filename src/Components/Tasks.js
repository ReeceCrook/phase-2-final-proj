import React from "react";
import "../main.css"

function Tasks({ setTrigger, fetchResult, filterValue }) {

    function deleteHandler(id) {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
          })
            .then((r) => r.json())
            .then(() => fetchResult.filter(current => current.id != id))
            .then(() => setTrigger((trigger) => !trigger))
            .catch(event => console.log("Exception caught: ", event))
    }

    function completeHandler(chore) {
        fetch(`http://localhost:3000/tasks/${chore.id}`, {
            method: "PATCH",
            body: JSON.stringify({
                "completed": true
            }),
            headers: {
                'Content-type': 'application/json',
            },
          })
            .then((r) => r.json())
            .then(() => setTrigger((trigger) => !trigger))
            .catch(event => console.log("Exception caught: ", event))
    }
 
    return (
        <div>
            {fetchResult.filter(current => filterValue !== "All" ? current.type === filterValue: current).map(filteredCurrent => {
                if(filteredCurrent.completed === false) {
                    return (
                        <div key={filteredCurrent.id} className="mappedResults">
                            <div className="innerMappedResults">
                                <h3>{filteredCurrent.name}</h3>
                                <img className="img" src={filteredCurrent.image} />
                                <li>{filteredCurrent.type}</li>
                                <div>

                                    <button type="button" className="deleteButton" onClick={() => {
                                        const confirmBox = window.confirm("Are you sure you want to delete this Task?")
                                        if (confirmBox === true) {
                                            deleteHandler(filteredCurrent.id)
                                        }
                                    }}>X</button>

                                    <button type="button" className="completeButton" onClick={() => {
                                        const confirmBox = window.confirm("Did you do a good job?")
                                        if (confirmBox === true) {
                                            completeHandler(filteredCurrent)
                                        }
                                    }}>✔</button>

                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </div>
    )
}

export default Tasks