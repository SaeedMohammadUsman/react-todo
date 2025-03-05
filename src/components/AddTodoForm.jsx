
import PropTypes from "prop-types";
import InputWithLabel from "./InputWithLabel";
import { useState } from "react";
import "../App.css";

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim() === "") return;
    onAddTodo(todoTitle);
    setTodoTitle("");
  };

  return (
    <form onSubmit={handleAddTodo} className="todo-form">
                    <div className="todo-input-container">

      <InputWithLabel
        id="todoTitle"
        todoTitle={todoTitle} 
        handleTitleChange={handleTitleChange} 
       >
         Enter new task: 
        </InputWithLabel> 
      
      <button type="submit">Add</button>
      </div>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
