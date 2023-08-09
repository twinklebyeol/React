import React from 'react';
import styled from 'styled-components';
import { useTodoState } from '../TodoContext';


const TodoHeadBlock = styled.div`

padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }
  .tasks-left {
    color: #20c997;
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
    const dayName = today.toLocaleDateString('ko-KR', { weekday: 'long' });








    return (
        
        <TodoHeadBlock>
            <h1>{dateString}</h1>
            <div className='day'>{dayName}</div>
            <div className='tasks-left'>할 일 {undoneTasks.length }개 남음</div> 
        </TodoHeadBlock>


    );
}

export default TodoHead;