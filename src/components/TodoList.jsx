import PropTypes from "prop-types";
import TodoListItem from "./TodoListItem";


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

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      createdTime: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoList;