
import { db } from './firebase';
import { collection, getDocs, doc, addDoc,updateDoc, deleteDoc, query, orderBy } from '@firebase/firestore';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';





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

width : 100%;
bottom : 0;
left : 0;
position : fixed;
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
  background: #0029FF;
  color: white;
  margin : 0 20px;
  padding: 10px;
  cursor: pointer;
  border-radius: 10px;
  &:hover {color: white;
  background: #FFC619;
}
`;







function App() {


  //렌더링 상태를 체크하기 위한  state 추가
  const [changed, setChanged] = useState(false);

//추가 할 데이터를 저장할 state 생성
  var [newList, setNewList] = useState("");
  // console.log(newList)

  // 데이터를 저장할 state 변수 생성
  var [todos, setList] = useState([]);
  // 데이터 베이스 연결 객체 생성
  const todosCollectionRef = collection(db, 'todos');


  useEffect(() => {
    const getLists = async () => { 
    
// getDocs(DB 연결객체)로 데이터 가져오기
// query(DB 연격객체. orderBy('기준열','정렬방식'))
      const data = await getDocs(
        query(todosCollectionRef, orderBy("timeStamp", "desc"))
      );
      // console.log(data);
      setList(
        //doc 을 사용하기 위해선 위에 모듈도 불러와야함 import getCocs 옆에 doc 넣기
        //map의 역할은 여러개의 데이터를 하나씩 꺼내서 담아주는 역할
        data.docs.map(
          (doc) => ({
            ...doc.data(), id:doc.id})
        )
      );
  };

    getLists(); 
    setChanged(false);
  },[changed]); //새로고침 못하게 막는 친구~ 필수!! 안쓰면 데이터 읽기용량 초과뜸
  
  
  // DB에 입력할 날짜 생성
  const date = new Date();
  const now_date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate())
  //console.log(now_date)

  // 파이어베이스에 데이터 추가
  const createList = () => {
    // addDoc (DB연결객체, 저장할데이터)
    // const input_data = ;
    addDoc(todosCollectionRef,
      {
        content: newList,
        d_date: now_date,
        timeStamp: date
      }
    )
    setChanged(true)
  };


  const updateList = async (id, content) => {
    console.log(id, '/', content);
    const msg = prompt('내용 수정', content);

    if (msg) {
      //id를 이용하여 데이터베이스에서 수정할 데이터 검색
      //doc('데이터베이스','콜렉션', 검색할 key(id))
      const listDoc = doc(db, 'todos', id); //데이터베이스에서 찾을 데이터

      //수정할 데이터
      const editData = {
        content: msg,
        d_date: now_date,
        timeStamp: date
      }

      //updateDoc(변경될 데이터, 수정할 데이터)
      await updateDoc(listDoc, editData);
      setChanged(true);
    }
  }


  const deleteList = async (id) => {
    var del_ck = window.confirm('정말 삭제하시겠습니까?');

    if (del_ck) {
       //id를 이용하여 데이터베이스에서 수정 할 데이터 검색
      // doc('데이터베이스','콜렉션', 검색할 key(id))
      const listDoc = doc(db, 'todos', id); //데이터베이스에서 찾을 데이터

      //deleteDoc(삭제할 데이터)
      await deleteDoc(listDoc)
      setChanged(true)
     }
    }


  //get을 해서 가지고오면 다 가지고 오니까 map을 이용해 쪼개서 가지고 오기
  const showList = todos.map(
    (value) => (
      <div key={value.id}>
        <h2>
          {value.content}
          
        <span className='d_date'>{value.d_date}</span>
        <button type='button' onClick={function () {
          updateList(value.id, value.content)
        }} className='update-button'>수정</button>
          <button
            type="button"
            onClick={()=>{deleteList(value.id)}}
          className='delete-button'>삭제</button>
        </h2>
        </div>
    )
  )
  const handleCreateList = () => {
  
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      createList();
    }
  };

  return (

    <div className="App"> 
      <InsertFormPositioner>
      {/* <form onSubmit={function (e) { 
        e.preventDefault()
        console.log(e.target.inputList.value)
      }}> */}
         <Input
              type="text"
              value={newList}
              placeholder="할 일 입력하기"
              onChange={(e) => setNewList(e.target.value)}
              onKeyDown={handleKeyPress}
            />
      </InsertFormPositioner>
      <CircleButton type="button" onClick={handleCreateList} className='add-button'>+</CircleButton>
      {showList}
    </div>

    
  );
}

export default App;








