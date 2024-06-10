import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [updatedTaskText, setUpdatedTaskText] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleUpdateTask = (task) => {
    setTaskToEdit(task);
    setUpdatedTaskText(task.text);
  };

  const handleSaveUpdatedTask = () => {
    setTasks(tasks.map(task =>
      task.id === taskToEdit.id ? { ...task, text: updatedTaskText } : task
    ));
    setTaskToEdit(null);
    setUpdatedTaskText('');
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder=" Enter the Task Here"
        />
        <button onClick={handleAddTask}>+</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {taskToEdit && taskToEdit.id === task.id ? (
              <>
                <input
                  type="text"
                  value={updatedTaskText}
                  onChange={(e) => setUpdatedTaskText(e.target.value)}
                />
                <button onClick={handleSaveUpdatedTask}>Save</button>
              </>
            ) : (
              <>
                <span
                  style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                  onClick={() => handleToggleComplete(task.id)}
                >
                  {task.text}
                </span>
                <button onClick={() => handleDeleteTask(task.id)} style={{ marginLeft: '20px' }}>Delete</button>
                <button onClick={() => handleUpdateTask(task)} style={{ marginLeft: '20px' }}>Update</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
