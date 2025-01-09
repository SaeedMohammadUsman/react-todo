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

function TodoList({todoList, onRemoveTodo}) {
  return (
    
     <ul>
        {todoList.map( (item) =>(
    
          <TodoListItem
            key={item.id}
            todo={item}
            onRemoveTodo={onRemoveTodo} 
            />
          ))}
      </ul> 
  )
}
export default TodoList;