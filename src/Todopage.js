import React, {useState} from 'react';
import styles from "./Todopage.module.css";


function Todopage() {

const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, newTodo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
      <div className={styles.todo_container}>
      <h1 className={styles.todotitle}>YumDo!</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <div id={"todo-item" + this.props.id} style={this.state.style}>
                <input type="button" value="✅" onClick={() => { this.checkitem() }} />
                {this.props.text}
                <input type="button" value="❌" onClick={() => { this.props.delete(this.props.id) }} />
                
            </div>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDeleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>

    
  );
}
export default Todopage;
