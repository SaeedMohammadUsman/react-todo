import style from "./TodoListItem.module.css";
import PropTypes from "prop-types";


function TodoListItem({todo, onRemoveTodo}) {
//        const{todo}= props;
        return (
        <div>
        
        {/* <li>{todo.id}</li> */}
        <li className={style.ListItem}>{todo.title}<button type="button" onClick={() => onRemoveTodo(todo.id)} >Remove</button></li>
       
        </div>);
    
}; 
TodoListItem.propTypes = {
        todo: PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          title: PropTypes.string.isRequired,
        }).isRequired,
        onRemoveTodo: PropTypes.func.isRequired,
      };
export default TodoListItem ;