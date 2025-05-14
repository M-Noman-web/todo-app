import { useEffect, useState } from "react";
import "../App.css"; // Make sure this path is correct

const Todo = () => {
  const [task, setTask] = useState([]);
  const [inputVal, setInputVal] = useState("");

  // ✅ Load tasks from localStorage on first render
  useEffect(() => {
    const storedTasks = localStorage.getItem("todo-tasks");
    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    }
  }, []);

  // ✅ Save tasks to localStorage whenever task state changes
  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(task));
  }, [task]);

  const addTask = () => {
    if (inputVal.trim() !== "") {
      setTask([...task, { text: inputVal, completed: false }]);
      setInputVal("");
    }
  };

  const taskCompleted = (index) => {
    setTask(
      task.map((t, idx) =>
        idx === index ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTask = (indexRemove) => {
    setTask(task.filter((_, index) => index !== indexRemove));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-heading">Simple Todo App</h1>
      <div className="todo-input-group">
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()} // ✅ Add task on Enter key
          type="text"
          placeholder="Enter task here"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="todo-list">
        {task.map((t, index) => (
          <div key={index} className="todo-item">
            <li
              className={`task-text ${t.completed ? "completed" : ""}`}
              onClick={() => taskCompleted(index)}
            >
              {t.text}
            </li>
            <button className="delete-btn" onClick={() => deleteTask(index)}>
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
