import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TodoList from "./TodoList" ;
import AddTodoForm from "./AddTodoForm"; 

function App() {
// const [newTodo, setNewTodo] = useState(); 
const [todoList,setTodoList]= useState([]); 
  function addTodo(newTodo){
    setTodoList(prevTodoList => [...prevTodoList, newTodo]);
    
  }
  return (
    <>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {/* <p>{newTodo}</p> */}
      
      <TodoList todoList={todoList} />
    </>
  );
}

export default App;
