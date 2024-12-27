import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  function useSemiPersistentState() {
    const [todoList, setTodoList] = useState(() => {
      const savedTodoList = localStorage.getItem("savedTodoList");
      return savedTodoList ? JSON.parse(savedTodoList) : [];
    });

    useEffect(() => {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }, [todoList]);

    return [todoList, setTodoList];
  }

  
  const [todoList, setTodoList] = useSemiPersistentState();

  function addTodo(newTodo) {
    setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
  }
  function removeTodo(id) {
    setTodoList((prevTodoList) => prevTodoList.filter(todo => todo.id !== id));
  }

  
  return (
    <React.Fragment>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}
      />
      {/* <p>{newTodo}</p> */}

      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
      
      </React.Fragment>
  );
}

export default App;
