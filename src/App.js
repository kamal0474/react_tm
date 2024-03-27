import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([

  ]);

  // Function to add a new task to the state
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };
   
  //Function to update the status of a task
  const updateTaskStatus = (index, status) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = status;
    setTasks(updatedTasks);
  };
  
  // Function to delete a task from the state
  
  const deleteTask = (taskId, status) => {
    if (status !== 'Completed') {
      setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    } else {
      alert('Completed tasks cannot be deleted.');
    }
  };
  return (
    <div className="App">
      <header>
        <h1>Task Tracker</h1>
      </header>
      <main>
        <TaskForm onAddTask={addTask} />
        <TaskList tasks={tasks} onUpdateTaskStatus={updateTaskStatus} onDeleteTask={deleteTask}/>
      </main>
      <footer>
        <p>&copy; 2024 Task Tracker App</p>
      </footer>
    </div>
  );
}

export default App;
