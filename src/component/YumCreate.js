
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from '../TodoContext';
// import DaumPost from './DaumPost';
import Address from '../Address';
import Imageupload from '../Imageupload';
import ImageUploader from '../ImageUploader';
import DaumPost from './DaumPost';

const CircleButton = styled.button`
  background: #FFC619;
  &:hover {
    background: #0029FF;
  }
  &:active {
    background: #0029FF;
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
      background: #88DF18;
      &:hover {
        background: #88DF18;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}

`;


const InsertFormPositioner = styled.div`

width : 100%;
bottom : 0;
left : 0;
position : abslute;
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
border: 1px solid #dee2e6;
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
  background: #FFC619;
  color: white;
  margin : 0 20px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {color: white;
  background: #0029FF;
}
`;


function YumCreate() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value);
  
    const onSubmit = e => {
      e.preventDefault(); // 새로고침 방지하기
      const restaurantInfo = {
        id: nextId.current,
        text: value,
        done: false,
        address: value,
      };
      dispatch({
        type: 'CREATE',
        todo: restaurantInfo,
      });
      setValue('');
      setOpen(false);
      nextId.current += 1;
    };

    return (
        <>
        {open && (
          
          <InsertFormPositioner>
                 <ImageUploader />
            <InsertForm onSubmit={onSubmit}>
          
                <Input
                  autoFocus
                  placeholder="맛집 주소를 입력해주세요!"
                  onChange={onChange}
                  value={value}
                />
                <DaumPost />
               
       
                <InputButton type="submit">등록</InputButton>
              </InsertForm>
            </InsertFormPositioner>
          )}
          <CircleButton onClick={onToggle} open={open}>
            <MdAdd />
          </CircleButton>
        </>
    );
}

export default React.memo(YumCreate);






