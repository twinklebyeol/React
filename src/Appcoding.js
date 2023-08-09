
import { db } from './firebase';
import { collection, getDocs, doc, addDoc,updateDoc, deleteDoc, query, orderBy } from '@firebase/firestore';
import './App.css';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import {Button, Navbar, Container, Nav} from 'react-bootstrap'
import { useEffect, useState } from 'react';

//props 는 외부에서 내부로 주입되는 상태
//state 는 내부적으로 사용하는 상태
function Counter(props) {
  let countState = useState( props.initValue);
  let count = countState[0];
  let setCount = countState[1];
  console.log(countState);
  function up(){
    // console.log(1);
    setCount(count +1);
  }
  
  return (

    <div>
      
      <h1>{props.title}</h1>
      <button onClick={up}>+</button> {count}
      
    </div>
  )
}

function App() {

  return (

    <div> 
      <Counter title="불면증 카운터" initValue={10}></Counter>
      <Counter title="손님 카운터" initValue={10}></Counter>
    </div>
    
  );
}

export default App;








