// import { useState } from "react";
// import { InputWithLabel } from "./InputWithLabel";
// function AddTodoForm({ onAddTodo }) {
//   const [todoTitle, setTodoTitle] = useState();

//   function handleTitleChange(event) {
//     const newTodoTitle = event.target.value;
//     setTodoTitle(newTodoTitle);
//   }
//   function handleAddTodo(event) {
//     event.preventDefault();
//     // const todoTitle = event.target.elements.title.value;

//     // onAddTodo(todoTitle);
//     onAddTodo({ title: todoTitle, id: Date.now() });

//     console.log(todoTitle);
//     // event.target.reset();
//     setTodoTitle("");
//   }
//   return (
//     <div>
//       <form onSubmit={handleAddTodo} action="">
//         {/* <label htmlFor="todoTitle"> Title</label>
//         <input value={todoTitle} onChange={handleTitleChange} name="title" type="text" id="todoTitle" /> */}

//         <InputWithLabel
//           label="Title"
//           todoTitle={todoTitle}
//           handleTitleChange={handleTitleChange}>
//           Title
//           </InputWithLabel>


//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

// export default AddTodoForm;


import { useState } from "react";
import "./App.css";

function AddTodoForm({ onAddTodo }) {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;
    onAddTodo(newTodo);
    setNewTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Enter new task..."
        required
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTodoForm;
