
import { db } from './firebase';
import { collection, getDocs, doc, addDoc } from '@firebase/firestore';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
//추가 할 데이터를 저장할 state 생성
  var [newList, setNewList] = useState("")
  // console.log(newList)

  // 데이터를 저장할 state 변수 생성
  var [todos, setList] = useState([]);
  // 데이터 베이스 연결 객체 생성
  const todosCollectionRef = collection(db, 'todos');

  useEffect(() => {


  const getLists = async () => { 
      // getDocs로 데이터 가져오기
      const data = await getDocs(todosCollectionRef);
      // console.log(data);
      setList(
        //doc 을 사용하기 위해선 위에 모듈도 불러와야함 import getCocs 옆에 doc 넣기
        //map의 역할은 여러개의 데이터를 하나씩 꺼내서 담아주는 역할
        data.docs.map((doc) => ({
            ...doc.data(), id:doc.id})
        )
      );
  };

    getLists(); 

    

  });
  // DB에 입력할 날짜 생성
  const date = new Date();
  const now_date = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate())
  //console.log(now_date)

  // 파이어베이스에 데이터 추가
  const createList = () => {
  // addDoc (DB연결객체, 저장할데이터)
    // const input_data = ;
    addDoc(todosCollectionRef, {content:newList,d_date:now_date})
  }

  //get을 해서 가지고오면 다 가지고 오니까 map을 이용해 쪼개서 가지고 오기
  const showList = todos.map(
    (value) => (
      <div key={value.id}>
        <h2>
          {value.content}
          </h2>
          <span className='d_date'>{value.d_date}</span>
        </div>
    )
  )

  return (

    <div className="App"> 
      <form onSubmit={function (e) { 
        e.preventDefault()
        console.log(e.target.inputList.value)
      }}>
      <input
      type='text'
          placeholder='할 일 입력하기'
          onChange={function (e) {
            setNewList(e.target.value)
          }}
      ></input>
      <button type='button'
        onClick={createList}
        >목록 추가</button>
      </form>
      <hr />
      {showList}
    </div>
  );
}

export default App;







