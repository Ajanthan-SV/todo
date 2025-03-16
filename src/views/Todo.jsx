import React, { useState, useEffect } from "react";
import { PlusCircle, CheckCircle2, Circle, Trash2 } from "lucide-react";


function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  // Load todos from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("userTodos")) || [];
    setTodos(storedTodos);
  }, []);

  // Save todos to local storage
  const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem("userTodos", JSON.stringify(todos));
  };

  //Add New Todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    const todoData = { text: newTodo, completed: false };

    // Update state and local storage
    const updatedTodos = [todoData, ...todos];
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
    setNewTodo("");
  };

  //  Toggle Completion Status
  const toggleTodo = async (id, completed) => {
    const updatedTodos = todos.map((todo, index) =>
      index === id ? { ...todo, completed: !completed } : todo
    );

    // Update state and local storage
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  //  Delete Todo
  const deleteTodo = async (id) => {
    const updatedTodos = todos.filter((_, index) => index !== id);

    // Update state and local storage
    setTodos(updatedTodos);
    saveTodosToLocalStorage(updatedTodos);
  };

  // Filter Todos
  const filteredTodos = filter === "completed" ? todos.filter(todo => todo.completed) : todos;

  return (
    <div className="container-fluid min-vh-100 py-5">
      <div className="todo-container">
        <div className="todo-card">
          <h1 className="display-4 mb-4 text-primary fw-bold">
            Start taking control of your tasks today!
          </h1>

          {/* Add Todo Form */}
          <form onSubmit={addTodo} className="mb-4">
            <div className="input-group">
              <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="What needs to be done?"
                className="form-control todo-input"
              />
              <button
                type="submit"
                className="btn btn-primary add-button d-flex align-items-center gap-2"
              >
                <PlusCircle size={20} />
                Add
              </button>
            </div>
          </form>

          {/* Filter Buttons */}
          <div className="btn-group mb-4">
            {["all", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`btn filter-button ${
                  filter === status ? "btn-primary" : "btn-outline-primary"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div className="list-group">
            {filteredTodos.map((todo, index) => (
              <div
                key={index}
                className={`list-group-item todo-item d-flex align-items-center gap-3 ${
                  todo.completed ? "completed" : ""
                }`}
              >
                {/* Toggle completion button */}
                <button
                  onClick={() => toggleTodo(index, todo.completed)}
                  className="btn action-button"
                >
                  {todo.completed ? (
                    <CheckCircle2 className="text-success" size={24} />
                  ) : (
                    <Circle className="text-secondary" size={24} />
                  )}
                </button>

                {/* Todo text */}
                <span className={`flex-grow-1 ${todo.completed ? "completed-text" : ""}`}>
                  {todo.text}
                </span>

                {/* Delete button */}
                <button
                  onClick={() => deleteTodo(index)}
                  className="btn action-button"
                >
                  <Trash2 className="text-danger" size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
