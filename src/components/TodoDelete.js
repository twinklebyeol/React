import React from 'react';
import { doc, deleteDoc } from '@firebase/firestore';
import { db } from '../firebase';

function TodoDelete({ id, onTodoDeleted }) {
  const handleDeleteList = async () => {
    const del_ck = window.confirm('정말 삭제하시겠습니까?');

    if (del_ck) {
      const listDoc = doc(db, 'todos', id);
      await deleteDoc(listDoc);
      onTodoDeleted(); // 호출하여 부모 컴포넌트에 변화를 알립니다.
    }
  };

  return (
    <div>
      <button type="button" onClick={handleDeleteList}>
        삭제
      </button>
    </div>
  );
}

export default TodoDelete;
