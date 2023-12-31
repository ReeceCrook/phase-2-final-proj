import React, { useState } from "react";
import "../main.css"

function AddChore({ fetchResult, setFetchResult }) {

    const [formData, setFormData] = useState({
        "name": "",
        "image": "",
        "completed": false,
        "type": "Daily"
    })

    function handleChange(e) {
        setFormData({
             ...formData,
            [e.target.id]: e.target.value,
        })
    }
    function handleSubmit(e) {
        e.preventDefault()
        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
            
            .then(r => r.json())
            .then(data => setFetchResult([...fetchResult, data]))
            .then(() => window.confirm("New Task Added"))
            .catch(event => console.log("Exception caught: ", event))
    }
    
    return (
        <form id="form" onSubmit={(e) => handleSubmit(e)}>
            <h1>Fill out new Task:</h1>
            <div className="addChoreDiv" >

                <label  htmlFor="name"> Name of Task: </label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} /> <br />

                <label  htmlFor="image"> Image of Task: </label>
                <input type="text" id="image" value={formData.image} onChange={handleChange} /> <br />

                <label  htmlFor="type"> Type of Task: </label>
                <select id="type" value={formData.type} onChange={handleChange}>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select> <br />

                <input type="submit" value="Submit New Task" className="submitButton" />
            </div> 
        </form>
    )
}

export default AddChore