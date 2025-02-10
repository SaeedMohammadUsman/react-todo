import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./TodoList";
import AddTodoForm from "./AddTodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;

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
  }, []);

  async function addTodo(newTodoTitle) {
    setIsLoading(true);

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;
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
      const updatedList = prevTodoList.filter((todo) => todo.id !== id);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return updatedList;
    });
  }

  return (
    <BrowserRouter>
      {/* <React.Fragment> */}
      <Routes>
        <Route
        path="/"
        element={
          <>
            <h1>Todo List</h1>
            <AddTodoForm onAddTodo={addTodo} />
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
            )}
          </>
        }
      />
      
      
      {/* new route */}
      <Route 
    path="/new" 
    element={<h1>New Todo List</h1>} 
  />
      </Routes>
      {/* </React.Fragment> */}
    </BrowserRouter>
    //
  );
}

export default App;
