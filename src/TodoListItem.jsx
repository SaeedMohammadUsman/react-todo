function TodoListItem(props) {
       const{todo}= props;
        return (
        <div>
        
        <li>{todo.id}</li>
        <li>{todo.title}</li>
       
        </div>);
    
}; 

export default TodoListItem ;