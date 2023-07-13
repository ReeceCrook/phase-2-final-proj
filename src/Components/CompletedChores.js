import React, { useEffect, useState } from "react";
import "../main.css"

function CompletedChores({ completedChores, setCompletedChores }) {
    

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
                                    const confirmBox = window.confirm("Are you sure you want to delete this Chore?")
                                    if (confirmBox === true) {
                                        deleteHandler(current.id)
                                    }
                                }}>X</button>

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CompletedChores