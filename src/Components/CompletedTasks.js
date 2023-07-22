import React from "react";
import "../main.css"

function CompletedChores({ completedTasks, setCompletedTasks, fetchResult, setFetchResult, setTrigger }) {
    


    function deleteHandler(id) {
        fetch(`http://localhost:3000/completed/${id}`, {
            method: "DELETE",
          })
            .then((r) => r.json())
            .then(() => setCompletedTasks(completedTasks.filter(current => current.id != id)));
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
            {
            fetchResult.map(current => {
                if(current.completed === true){
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
                }
                
            })}
        </div>
    )
}

export default CompletedChores