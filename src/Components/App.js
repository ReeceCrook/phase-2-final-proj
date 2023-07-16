import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../main.css"
import Filter from "./Filter";
import NavBar from "./NavBar";
import Tasks from "./Tasks";
import AddChore from "./AddChore";
import CompletedChores from "./CompletedChores";

function App() {
  const [fetchResult, setFetchResult] = useState([])
  const [completedChores, setCompletedChores] = useState([])
  const [trigger, setTrigger] = useState(true)
  

  useEffect(() => {
    fetch("http://localhost:3000/uncompleted")
        .then(res => res.json())
        .then(data => setFetchResult(data))
}, [trigger])


  return (
    <div className="App">
      <NavBar />
      <Filter 
        setTrigger={setTrigger}
        setFetchResult={setFetchResult} 
        setCompletedChores={setCompletedChores} 
      />
      <Routes>
        <Route path="/addTask" element={<AddChore />} />
        <Route path="/completedTasks" element={
        <CompletedChores 
          setTrigger={setTrigger}
          setFetchResult={setFetchResult} 
          completedChores={completedChores} 
          setCompletedChores={setCompletedChores} 
        />} />
        <Route exact path="/" element={<Tasks setFetchResult={setFetchResult} fetchResult={fetchResult} />} />
      </Routes>
    </div>
  );
}

export default App;
