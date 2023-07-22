import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "../main.css"
import Filter from "./Filter";
import NavBar from "./NavBar";
import Tasks from "./Tasks";
import AddTask from "./AddTask";
import CompletedTasks from "./CompletedTasks";

function App() {
  const [fetchResult, setFetchResult] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [trigger, setTrigger] = useState(true)
  
  fetch("http://localhost:3000/tasks")
    .then(res => res.json())
    .then(data => setFetchResult(data))





  return (
    <div className="App">
      <NavBar />
      <Filter 
        setTrigger={setTrigger}
        fetchResult={fetchResult}
        setFetchResult={setFetchResult} 
        setCompletedTasks={setCompletedTasks} 
      />
      <Routes>
        <Route path="/addTask" element={<AddTask setTrigger={setTrigger} />} />
        <Route path="/completedTasks" element={
        <CompletedTasks 
          setTrigger={setTrigger}
          fetchResult={fetchResult}
          setFetchResult={setFetchResult} 
          completedTasks={completedTasks} 
          setCompletedTasks={setCompletedTasks} 
        />} />
        <Route exact path="/" element={<Tasks setTrigger={setTrigger} setFetchResult={setFetchResult} fetchResult={fetchResult} setCompletedTasks={setCompletedTasks}  />} />
      </Routes>
    </div>
  );
}

export default App;
