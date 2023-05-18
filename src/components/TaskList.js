import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    // TASKS WILL BE THERE EVEN AFTER REFRESHING PAGE
    useEffect (() => {
        const storedTasks = localStorage.getItem('tasks');
        if(storedTasks) {
            setTasks(JSON.parse(storedTasks));
        }
    }, []);

    // SAVE TASKS TO LOCAL STORAGE IN CASE STATE CHANGES
    useEffect (() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
    if (newTask.trim() !== '') {
        setTasks((prevTasks) => [...prevTasks, {name: newTask, completed: false}]);
        setNewTask('');
        }
    };

    const deleteTask = (index) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks.splice(index, 1);
            return updatedTasks;
        })
    };

    const toggleTask = (index) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks];
            updatedTasks[index] = {...updatedTasks[index], completed: !updatedTasks[index].completed} ;
            return updatedTasks;
        })
    };

    const handleInputChange = (e) => {
        setNewTask(e.target.value);
    };

    return (
        <div className='container'>
            <h2>Task List</h2>
            <div className='newtask'>
                <input type="text" value={newTask} onChange={handleInputChange} className='form-control' placeholder="Enter a new task" />
                <button onClick={addTask} className='btn btn-primary'>Add Task</button>
            </div>

            <div className='tasks'>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {tasks.map((task, index) => (
                    <li key={index} className='task'>
                        <input type="checkbox" checked={task.completed} onChange={() => toggleTask(index)} />
                        <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.name}
                        </span>
                        <button onClick={() => deleteTask(index)} className='btn btn-danger'>Delete</button>
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TaskList;