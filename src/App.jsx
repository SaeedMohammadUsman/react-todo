import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedTodoList = localStorage.getItem("savedTodoList");
    if (savedTodoList) {
      // If there is saved data, load it
      setTodoList(JSON.parse(savedTodoList));
      setIsLoading(false);
    } 
    else {
    const myPromise = new Promise((resolve, reject) => {
      console.log("Promise initialized");
      setTimeout(() => {
        resolve({
          data: {
            todoList: [],
          },
        });
      }, 2000);
   
    });

    myPromise.then((result) => {
      setTodoList(result.data.todoList);
      setIsLoading(false);
    });
  }
  }, []);


  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  function addTodo(newTodo) {
    setIsLoading(true);
    
    // setTodoList((prevTodoList) => [...prevTodoList, newTodo]);
    
    setTodoList((prevTodoList) => {
      const updatedList = [...prevTodoList, newTodo];
      setTimeout(() => {
        setIsLoading(false); // Stop loading after the change
      }, 500);  // Simulate delay
      return updatedList;
    });
  
  
  
  }
  function removeTodo(id) {
    setIsLoading(true);  // Start loading when removing a todo
    setTodoList((prevTodoList) => {
      const updatedList = prevTodoList.filter(todo => todo.id !== id);
      setTimeout(() => {
        setIsLoading(false); // Stop loading after the change
      }, 500);  // Simulate delay
      return updatedList;
    });
   
    // setTodoList((prevTodoList) => prevTodoList.filter(todo => todo.id !== id));
    
    
  }


  return (
    <React.Fragment>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo}
      />
     {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
    </React.Fragment>
  );
}

export default App;
