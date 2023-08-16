import React, { useState } from 'react';
import { doc, updateDoc } from '@firebase/firestore';
import { db } from '../firebase';
import styled from 'styled-components';






function TodoUpdate({ id, content, onTodoUpdated, done, text }) {
  
  const [msg, setMsg] = useState(content);

  const handleUpdateList = async () => {
    if (!msg.trim()) return;

    const date = new Date();
    const now_date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

    const listDoc = doc(db, 'todos', id);
    const editData = {
      content: msg,
      d_date: now_date,
      timeStamp: date,
    };

    await updateDoc(listDoc, editData);
    onTodoUpdated(); // 호출하여 부모 컴포넌트에 변화를 알립니다.
  };

  return (
    <div>
            
      <input type="text" value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button type="button" onClick={handleUpdateList}>
        수정
      </button>
    </div>
  );
}

export default TodoUpdate;
