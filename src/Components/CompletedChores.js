import React, { useEffect } from "react";
import "../main.css"

function CompletedChores({ completedChores, setCompletedChores, setFetchResult, setTrigger }) {
    
    useEffect(() => {
        fetch("http://localhost:3000/completed")
            .then(res => res.json())
            .then(data => setCompletedChores(data))
    }, [])

    function deleteHandler(id) {
        fetch(`http://localhost:3000/completed/${id}`, {
            method: "DELETE",
          })
            .then((r) => r.json())
            .then(() => setCompletedChores(completedChores.filter(current => current.id != id)));
    }

    function resetHandler(chore) {
        deleteHandler(chore.id)
        fetch(`http://localhost:3000/uncompleted`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(chore)
          })
            .then((r) => r.json())
            .then(() => {
                setFetchResult((fetchResult) => fetchResult, chore)
                setTrigger((trigger) => !trigger)
            })
    }

    return (
        <div>
            {completedChores.map(current => {
                return (
                    <div key={current.id} className="completedChore">
                        <div className="innerCompletedChore">
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
                                    const confirmBox = window.confirm("Are you sure you want to reset this Task?")
                                    if (confirmBox === true) {
                                        resetHandler(current)
                                    }
                                }}>🔄</button>

                                

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CompletedChores