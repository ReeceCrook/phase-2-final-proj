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
  const [filterValue, setFilterValue] = useState("All")


  useEffect(() => {
    fetch("http://localhost:3000/tasks")
        .then(res => res.json())
        .then(data => setFetchResult(data))
        .catch(event => console.log("Exception caught: ", event))
  }, [])

  return (
    <div className="App">
      <NavBar />
      <Filter 
        fetchResult={fetchResult}
        setFetchResult={setFetchResult} 
        setFilterValue={setFilterValue}
      />
      <Routes>
        <Route path="/addTask" element={<AddTask setFetchResult={setFetchResult} fetchResult={fetchResult} />} />
        <Route path="/completedTasks" element={
          <CompletedTasks 
            filterValue={filterValue}
            fetchResult={fetchResult}
            setFetchResult={setFetchResult} 
          />} />
        <Route exact path="/" element={<Tasks fetchResult={fetchResult} filterValue={filterValue} setFetchResult={setFetchResult} />} />
      </Routes>
    </div>
  );
}

export default App;
