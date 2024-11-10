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
  
function TodoList(){
return (
    <div>
    <ul>
    {todoList.map(function (item) {
      return <li key={item.id}>{item.title}</li>;
    })}
  </ul>
  </div>
)
}
export default TodoList;