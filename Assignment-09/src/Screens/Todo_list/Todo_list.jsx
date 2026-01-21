import React, { cloneElement, useState } from "react";
import Navi from "../Navi";
import Input from "../../components/Input/Input";

import "./Todo_list.css";

export default function Todo_list() {
  let [task, setTask] = useState();
  let [taskArray, setTaskArray] = useState([]);
  let [counter, setCounter] = useState(1);

  // console.log(task);

  let submitHandler = () => {
    if (task.trim() === "") return;
    const newTask = {
      id: counter,
      text: task,
    };
    setTaskArray([...taskArray, newTask]);

    setCounter(counter + 1);
    setTask("");
  };
  // console.log(taskArray);

  let deletHandler = (value) => {
    const filtered = taskArray.filter((task) => task.id !== value);
    setTaskArray(filtered);
  };
  return (
    <>
      <Navi />
      <div className="todo-container">
        <h2>Todo List</h2>
        <br />
        <div className="input-box">
          <Input
            ONChange={(e) => {
              setTask(e.target.value);
            }}
            label="Add a new task..."
            type="text"
          />
          <button id="add-btn" onClick={submitHandler}>
            Add Task
          </button>
        </div>
        <ul id="todo-list" style={{ margin: "40px 0" }}>
          {taskArray.map((e, i) => {
            return (
              <>
                {e !== "" && (
                  <li key={e.id}>
                    {e.text}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deletHandler(e.id);
                      }}
                    >
                      Delete
                    </button>
                  </li>
                )}
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
}
