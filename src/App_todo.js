import "./App.css";
import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "@firebase/firestore";
import { db } from "./firebase";
import { createGlobalStyle } from "styled-components";
import TodoCreate from "./components/TodoCreate";
import TodoUpdate from "./components/TodoUpdate";
import TodoDelete from "./components/TodoDelete";
import TodoHead from "./components/TodoHead";
import TodoTemplate from "./components/TodoTemplate";

const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const [changed, setChanged] = useState(false);
  const [todos, setList] = useState([]);
  const todosCollectionRef = collection(db, "todos");

  useEffect(() => {
    const getLists = async () => {
      const data = await getDocs(
        query(todosCollectionRef, orderBy("timeStamp", "desc"))
      );
      setList(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getLists();
    setChanged(false);
  }, [changed]);

  const handleTodoUpdated = () => {
    setChanged(true);
  };

  const handleTodoDeleted = () => {
    setChanged(true);
  };

  const handleTodoCreated = () => {
    setChanged(true);
  };

  return (
    <div className="App">
      <GlobalStyle />
      <TodoTemplate>
        <TodoHead />
        <TodoCreate onTodoCreated={handleTodoCreated} />
        {todos.map((value) => (
          <div key={value.id}>
            <h2>
              {value.content}
              <span className="d_date">{value.d_date}</span>
              <TodoUpdate
                id={value.id}
                content={value.content}
                onTodoUpdated={handleTodoUpdated}
              />
              <TodoDelete id={value.id} onTodoDeleted={handleTodoDeleted} />
            </h2>
          </div>
        ))}
      </TodoTemplate>
    </div>
  );
}

export default App;
