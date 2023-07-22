import React from "react";
import "../main.css"

function Tasks({ setFetchResult, fetchResult, setTrigger }) {

    function deleteHandler(id) {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
          })
            .then((r) => r.json())
            .then(() => setFetchResult(fetchResult.filter(current => current.id != id)));
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
            .then((r) => setTrigger((trigger) => !trigger));
    }
 
    return (
        <div>
            {fetchResult.map(current => {
                if(current.completed === false) {
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
                }
            })}
        </div>
    )
}

export default Tasks