
import './App.css';
import { useState } from "react";




function App() {
  //toDo 라는 state를 관리하는 setTodo 함수.
  const [toDo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  



  const onSubmit = (e) => {
    e.preventDefault();
    if (toDo === "") {
      return
    }
    setTodos((currentArray) => [toDo, ...currentArray])
    setTodo("");
  }
   
     const onChange = (e) => {
       setTodo(e.target.value);
    
  }
  
  return (
  
  <div className="App"> 
      <h1>ToDoList</h1>
      <form onSubmit={onSubmit}>
        {/* value 값이 toDo 값으로 들어감 */}
        <input type='text' placeholder='입력하세요!' value={toDo} onChange={onChange} />
          <button type='submit'>등록하기</button>
      </form>
      <ul>
        {todos.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
    </div>
  );
}

export default App;


