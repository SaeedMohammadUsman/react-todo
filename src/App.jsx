import PropTypes from "prop-types";

import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

import { BrowserRouter, Routes, Route } from "react-router-dom";

const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_API_TOKEN = import.meta.env.VITE_AIRTABLE_API_TOKEN;

function App() {
  const API_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${
    import.meta.env.VITE_TABLE_NAME
  }`;

  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAscending, setIsAscending] = useState(true);
  const [sortBy, setSortBy] = useState("title");

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}?view=Grid%20view`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
      });
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      if (!Array.isArray(data.records))
        throw new Error("Invalid response format");

      // Ensure all records have fields and title before setting state
      const validRecords = data.records
        .filter((record) => record.fields && record.fields.title) // Filter out invalid data
        .map((record) => ({
          id: record.id,
          title: record.fields.title, // Extract title safely
          createdTime: record.createdTime || new Date().toISOString(),
        }));

      const sortedData = sortData(validRecords);
      setTodoList(sortedData);
    } catch (error) {
      console.error("Fetch error:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function sortData(records) {
    return records
      .map((record) => ({
        id: record.id,
        title: record.title || "Untitled", // Fallback for missing title
        createdTime: record.createdTime || new Date().toISOString(),
      }))
      .sort((a, b) => {
        let valueA =
          sortBy === "title" ? a.title.toLowerCase() : new Date(a.createdTime);
        let valueB =
          sortBy === "title" ? b.title.toLowerCase() : new Date(b.createdTime);

        if (valueA < valueB) return isAscending ? -1 : 1;
        if (valueA > valueB) return isAscending ? 1 : -1;
        return 0;
      });
  }

  async function addTodo(newTodoTitle) {
    if (!newTodoTitle.trim()) {
      console.error("Cannot add an empty todo");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
        },
        body: JSON.stringify({
          fields: { title: newTodoTitle },
        }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      // await fetchData();
      if (!data.fields || !data.fields.title) {
        throw new Error("API response missing title field");
      }

      const newTodo = {
        id: data.id,
        title: data.fields.title,
        createdTime: data.createdTime || new Date().toISOString(),
      };

      setTodoList((prev) => sortData([...prev, newTodo]));
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

      setTodoList((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
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
              <h1>Todo List </h1>

              <div className="todo-input-container">
                <AddTodoForm onAddTodo={addTodo} />
              </div>
              <div className="todo-actions">
                <button onClick={() => setIsAscending((prev) => !prev)}>
                  Sort {isAscending ? "Descending" : "Ascending"}
                </button>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="title">Sort by Title</option>
                  <option value="createdTime">Sort by Created Time</option>
                </select>
              </div>

              {isLoading ? (
                <p>Loading...</p>
              ) : (
                (() => {
                  const sortedTodoList = sortData(todoList);
                  return (
                    <TodoList
                      todoList={sortedTodoList}
                      onRemoveTodo={removeTodo}
                    />
                  );
                })()
              )}
            </>
          }
        />
        <Route
          path="/new"
          element={<TodoList todoList={todoList} onRemoveTodo={removeTodo} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
App.propTypes = {};
export default App;
