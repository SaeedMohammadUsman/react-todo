

import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = import.meta.env.VITE_TABLE_NAME;
const AIRTABLE_API_TOKEN = import.meta.env.VITE_AIRTABLE_API_TOKEN;
const API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setTodoList(data.records.map((record) => ({ id: record.id, title: record.fields.title })));
    } catch (error) {
      console.error("Fetch error:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function addTodo(newTodoTitle) {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify({
          fields: {
            title: newTodoTitle,
          },
        }),
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      setTodoList((prev) => [...prev, { id: data.id, title: data.fields.title }]);
    } catch (error) {
      console.error("POST error:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeTodo(id) {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("DELETE error:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Todo List</h1>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? <p>Loading...</p> : <TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
            </>
          }
        />
        <Route path="/new" element={<h1>New Todo List</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
