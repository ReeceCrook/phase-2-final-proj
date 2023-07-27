import React from "react";
import "../main.css"

function CompletedChores({ fetchResult, filterValue, setFetchResult }) {

    function deleteHandler(id) {
        fetch(`http://localhost:3000/tasks/${id}`, {
            method: "DELETE",
          })
            .then((r) => r.json())
            .then(() => setFetchResult([...fetchResult.filter(current => current.id !== id)]))
            .catch(event => console.log("Exception caught: ", event))
    }

    function resetHandler(chore) {
        fetch(`http://localhost:3000/tasks/${chore.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "completed": false
            })
          })
            .then((r) => r.json())
            .then(res => setFetchResult([...fetchResult.filter(current => current.id !== res.id), res]))
            .catch(event => console.log("Exception caught: ", event))
    }

    return (
        <div>
            {fetchResult.filter(current => filterValue !== "All" ? current.type === filterValue: current).map(filteredCurrent => {
                if(filteredCurrent.completed === true){
                    return (
                        <div key={filteredCurrent.id} className="completedChore">
                            <div className="innerCompletedChore">
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
                                        const confirmBox = window.confirm("Are you sure you want to reset this Task?")
                                        if (confirmBox === true) {
                                            resetHandler(filteredCurrent)
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