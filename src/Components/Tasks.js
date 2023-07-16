import React from "react";
import "../main.css"

function Tasks({ setFetchResult, fetchResult }) {

    function deleteHandler(id) {
        fetch(`http://localhost:3000/uncompleted/${id}`, {
            method: "DELETE",
          })
            .then((r) => r.json())
            .then(() => setFetchResult(fetchResult.filter(current => current.id != id)));
    }

    function completeHandler(chore) {
        fetch(`http://localhost:3000/uncompleted/${chore.id}`, {
            method: "DELETE",
          })
            .then((r) => r.json())
            .then(() => {
                setFetchResult(fetchResult.filter(current => current.id != chore.id))
                fetch("http://localhost:3000/completed", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(chore)
                })
            });

    }
 
    return (
        <div>
            {fetchResult.map(current => {
                return (
                    <div key={current.id} className="mappedResults">
                        <div className="innerMappedResults">
                            <h3>{current.name}</h3>
                            <img className="img" src={current.image} />
                            <li>{current.type}</li>
                            <div>

                                <button type="button" className="deleteButton" onClick={() => {
                                    const confirmBox = window.confirm("Are you sure you want to delete this Task?")
                                    if (confirmBox === true) {
                                        deleteHandler(current.id)
                                    }
                                }}>X</button>

                                <button type="button" className="completeButton" onClick={() => {
                                    const confirmBox = window.confirm("Did you do a good job?")
                                    if (confirmBox === true) {
                                        completeHandler(current)
                                    }
                                }}>✔</button>

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Tasks