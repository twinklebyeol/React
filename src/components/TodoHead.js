import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useTodoState } from "../TodoContext";

import App_todo from "../App_todo";

const TodoHeadBlock = styled.div`
  padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  h1,
  h2 {
    font-family: "Prompt", sans-serif;
  }
  h1 {
    font-size: 45px;
    margin-top: 20px;
    margin-left: 20px;
  }
  h2 {
    margin-top: 0;
    margin-left: 20px;
  }
  p,
  .day,
  .tasks-left {
    font-family: "Nanum Gothic", sans-serif;
  }
  p {
    margin: 0;
    text-align: center;
    font-size: 30px;
    font-weight: bold;
  }
  .tasks-left {
    text-align: center;
    text-decoration: underline;
    color: #88df18;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function TodoHead() {
  const todos = useTodoState();
  const [undoneTasks, setUndoneTasks] = useState(0);

  useEffect(() => {
    if (todos) {
      const undoneCount = todos.filter((todo) => !todo.done).length;
      setUndoneTasks(undoneCount);
    }
  }, [todos]);
  const today = new Date();
  const dateString = today.toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", { weekday: "short" });

  return (
    <TodoHeadBlock>
      <h1>YumDo!</h1>
      <h2>할 일 등록하기✏️</h2>
      <p>
        {dateString} ({dayName})
      </p>
      <div className="tasks-left">할 일 {undoneTasks}개 남음</div>
      <App_todo />
    </TodoHeadBlock>
  );
}

export default TodoHead;
