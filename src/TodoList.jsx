import TodoListItem from "./TodoListItem";
const todoList = [
  {
    id: "1",
    title: "Complete assignment1",
  },
  {
    id: "2",
    title: "Complete assignment2",
  },
  {
    id: "3",
    title: "Complete assignment3",
  },
];

function TodoList({todoList}) {
  return (
    
     <ul>
        {todoList.map( (item) =>(
    
          <TodoListItem
            key={item.id}
            todo={item}/>
          ))}
      </ul> 
  )
}
export default TodoList;