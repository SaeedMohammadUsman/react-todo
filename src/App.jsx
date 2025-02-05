import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
  
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
  
    try {
      const response = await fetch(url, options);
    
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    
      const data = await response.json();
    
      const todos = data.records.map((record) => ({
        id: record.id,
        title: record.fields.title,
      }));
    
      setTodoList(todos);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error:", error.message);
    }
  }
  

  useEffect(() => {
    fetchData();
    // const savedTodoList = localStorage.getItem("savedTodoList");
    // if (savedTodoList) {
    //   // If there is saved data, load it
    //   setTodoList(JSON.parse(savedTodoList));
    //   setIsLoading(false);
    // } else {
    //   const myPromise = new Promise((resolve, reject) => {
    //     console.log("Promise initialized");
    //     setTimeout(() => {
    //       resolve({
    //         data: {
    //           todoList: [],
    //         },
    //       });
    //     }, 2000);
    //   });
  
    //   myPromise.then((result) => {
    //     const newTodoList = [...result.data.todoList]; 
    //     setTodoList(newTodoList);
    //     localStorage.setItem("savedTodoList", JSON.stringify(newTodoList)); 
    //     setIsLoading(false);
    //   });
    // }
  }, []);
  
  async function addTodo(newTodoTitle) {
    setIsLoading(true);
  
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          title: newTodoTitle,
          completedAt: new Date().toISOString(), // You can replace this with `null` if not completed yet
        },
      }),
    };
    console.log("Sending data:", {
      fields: {
        title: newTodoTitle,
        completedAt: new Date().toISOString(), // This sends the current date as an ISO string
      },
    });
  
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      const newTodo = {
        id: data.id, // Use Airtable's unique ID
        title: data.fields.title,
      };
  
      setTodoList((prevTodoList) => [...prevTodoList, newTodo]); // Update state only after success
    } catch (error) {
      console.error("POST error:", error.message);
    } finally {
      setIsLoading(false);
    }
  }
  
  function removeTodo(id) {
    setIsLoading(true); 
    setTodoList((prevTodoList) => {
      const updatedList = prevTodoList.filter(todo => todo.id !== id);
      setTimeout(() => {
        setIsLoading(false); 
      }, 500);  
      return updatedList;
    });
   
    
    
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
