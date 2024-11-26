function AddTodoForm(props){
    function handleAddTodo (event){
       event.preventDefault();
        const todoTitle = event.target.elements.title.value;
       props.onAddTodo(todoTitle); 
        
        console.log(todoTitle); 
        event.target.reset();
    }
    return (
        <div>
            <form onSubmit={handleAddTodo} action="">
                <label htmlFor="todoTitle" >  Title</label>
                <input name="title" type="text" id="todoTitle" />
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddTodoForm;