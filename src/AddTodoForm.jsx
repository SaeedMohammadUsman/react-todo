import { useState } from "react";
import { InputWithLabel } from "./InputWithLabel";
function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = useState();

  function handleTitleChange(event) {
    const newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }
  function handleAddTodo(event) {
    event.preventDefault();
    // const todoTitle = event.target.elements.title.value;

    // onAddTodo(todoTitle);
    onAddTodo({ title: todoTitle, id: Date.now() });

    console.log(todoTitle);
    // event.target.reset();
    setTodoTitle("");
  }
  return (
    <div>
      <form onSubmit={handleAddTodo} action="">
        {/* <label htmlFor="todoTitle"> Title</label>
        <input value={todoTitle} onChange={handleTitleChange} name="title" type="text" id="todoTitle" /> */}

        <InputWithLabel
          label="Title"
          todoTitle={todoTitle}
          handleTitleChange={handleTitleChange}>
          Title
          </InputWithLabel>


        <button>Add</button>
      </form>
    </div>
  );
}

export default AddTodoForm;
