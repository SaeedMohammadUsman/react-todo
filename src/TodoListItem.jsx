function TodoListItem({todo, onRemoveTodo}) {
//        const{todo}= props;
        return (
        <div>
        
        {/* <li>{todo.id}</li> */}
        <li>{todo.title}<button type="button" onClick={() => onRemoveTodo(todo.id)} >Remove</button></li>
       
        </div>);
    
}; 

export default TodoListItem ;