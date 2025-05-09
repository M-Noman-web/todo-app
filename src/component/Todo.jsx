import { useState } from "react";
import "../App.css";

const Todo = () => {
  const [task, setTask] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const addTask = () => {
    if (inputVal.trim() !== "") {
      setTask([...task, inputVal]);
      setInputVal("");
    }
  };

  const deleteTask = (indexRemove) => {
    setTask(task.filter((_, index) => index !== indexRemove));
  };

  return (
    <>
      <div className="containers">
        <h1>Simple Todo App</h1>
        <input
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          type="text"
          placeholder="Enter todo task here"
        ></input>
        <button onClick={addTask}>Add Task</button>
        <ul>
          {task.map((task, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "2rem 2rem 0px 0px",
              }}
            >
              <li>{task} </li>
              <button
                style={{
                  background: "red",
                }}
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
