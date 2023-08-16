import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { addDoc, collection } from '@firebase/firestore';
import { MdAdd } from 'react-icons/md';
import { db } from '../firebase';

const CircleButton = styled.button`
  background: #0029FF;
  &:hover {
    background: #FFC619;
  }
  &:active {
    background: #FFC619;
  }
  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.125s all ease-in;
  ${props =>
    props.open &&
    css`
      background: #FF196C;
      &:hover {
        background: #FF196C;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: fixed;
`;

const InsertForm = styled.form`
  display: flex;
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px;
  margin-left: 8px;
  border-radius: 4px;
  border: none;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
  padding-right: 8px;
`;

const InputButton = styled.button`
  width: 100px;
  border: 0;
  outline: none;
  font-size: 15px;
  background: #0029FF;
  color: white;
  margin: 0;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {
    color: white;
    background: #FFC619;
  }
`;

function TodoCreate({ onTodoCreated }) {
  const [open, setOpen] = useState(false);
  
  const [newList, setNewList] = useState('');
  const todosCollectionRef = collection(db, 'todos');

  const handleCreateList = async () => {
    if (newList.trim() === '') return;

    const date = new Date();
    const now_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    await addDoc(todosCollectionRef, {
      content: newList,
      d_date: now_date,
      timeStamp: date,
    });

    setNewList('');
    setOpen(false);
    onTodoCreated();
  };

  const onToggle = () => setOpen(!open);

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleCreateList();
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    handleCreateList();
  };

  return (
    <div>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              type="text"
              value={newList}
              placeholder="할 일 입력하기"
              onChange={e => setNewList(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <InputButton type="submit">입력</InputButton>
          </InsertForm>
        </InsertFormPositioner>
      )}
        <CircleButton onClick={onToggle} open={open}>
            <MdAdd />
          </CircleButton>
    </div>
  );
}

export default TodoCreate;
