import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';


const TodoHeadBlock = styled.div`




padding-top: 20px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
h1,
h2{
  font-family: "Prompt", sans-serif;
}

h1{
  font-size: 45px;
  margin-top : 20px;
  margin-left : 20px;
}
h2{  
   margin-top : 0;
margin-left : 20px;
}

p,
.day,
.tasks-left{
font-family: 'Nanum Gothic', sans-serif;
}

p {
  margin: 0;
  text-align : center;
  font-size: 30px;
  font-weight: bold;
}
.tasks-left {

   text-align : center;
text-decoration : underline;
  color: #FF196C;
  font-size: 18px;
  margin-top: 40px;
  font-weight: bold;
}
`;


function TodoHead() {
    const todos = useTodoState();
    //done 값이 false 인 항목들의 개수를 화면으로 보여줌 (할일 몇개 남음)
    const undoneTasks = todos.filter(todo => !todo.done);

    //날짜 보여줌 Date 의 toLocaleString 이라는 함수를 사용
    const today = new Date();
    const dateString = today.toLocaleString('ko-KR', {

        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const dayName = today.toLocaleDateString('ko-KR', { weekday: 'short' });



    return (
        
      <TodoHeadBlock>
        <h1>YumDo!</h1>
        <h2>할 일 등록하기✏️</h2>
            <p>{dateString} ({dayName})</p>
            <div className='tasks-left'>할 일 {undoneTasks.length }개 남음</div> 
        </TodoHeadBlock>
    );
}

export default TodoHead;