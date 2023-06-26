import React, { useState, useEffect } from "react";
import axios from "axios";
import { RouteURL, Redirects } from "../../language/constant.js";
import { useNavigate } from "react-router";
import "./Todo.css";

const Todo = () => {
  const [todo, setTodo] = useState("");
  const [getTodo, setGetTodo] = useState([]);
  const userId = localStorage.getItem("key");
  const navigate = useNavigate();

  const json = JSON.stringify({
    title: todo,
    dst_id: userId,
  });

  const getAllTodos = async () => {
    const ListOfTodo = await axios.get(
      `${RouteURL.getAllTodo}?dst_id=${userId}`
    );
    setGetTodo(ListOfTodo.data.data);
  };

  // console.log("getTodo ",getTodo);
  useEffect(() => {
    getAllTodos();
  }, [userId]);

  // console.log("ListOfTodo ",ListOfTodo.data);

  const handleCreateTodo = async () => {
    await axios.post(`${RouteURL.createTodo}?${userId}`, json, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTodo("");
    getAllTodos();
  };

  const handleSignOut = () => {
    localStorage.clear("key");
    navigate(Redirects.signin);
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <div className="header">
          <h2> what's the plan for today ? </h2>
        </div>

        <div>
          <form>
            <input
              placeholder="write a todo..."
              value={todo}
              type="text"
              onChange={(e) => setTodo(e.target.value)}
              className="task-input"
            />

            <button className="button-add" onClick={handleCreateTodo}>
              Add
            </button>

            {/* <div className="sign-btn">
            <button onClick={handleSignOut}>Sign Out</button>
          </div> */}
          </form>
        </div>

        <div>
          {getTodo &&
            getTodo.map((val) => (
              <li className="list-item">
                {val.title}
                
                <div>
                  <button className="button-complete task-button">
                    <i className="fa fa-check-circle"></i>
                  </button>
                  <button className="button-edit task-button">
                    <i className="fa fa-edit"></i>
                  </button>
                  <button className="button-delete task-button">
                    <i className="fa fa-trash"></i>
                  </button>
                </div>
                
              </li>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
