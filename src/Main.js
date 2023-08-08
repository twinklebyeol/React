import React from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css'; // 이 부분도 수정해야 할 수도 있습니다.
import yumdoLogo from './images/mainimg.png';
import pulsIcon from './images/plusbutton.svg';
import foodImg from './images/food.png';




function Main() {
  const navigate = useNavigate(); 
  const goTotodopage = () => {
    navigate("/todopage"); 
  };
  const goToyumpage = () => {
    navigate("/yumpage"); 
  };




  return (
    <div className="App">
      <div className="maintitle_wrap">
        <img className='foodimg' src={foodImg} alt="Foodimg" />
        <h1>YumDo!</h1>
        <img className='yumdologo' src={yumdoLogo} alt="YumDo! Logo" />
      </div>
      <div className="button-container">
        <h2>✏️ 할 일 등록하기</h2>
        
        <button className='plusbutton1' onClick={goTotodopage}>
          <img className='imgbutton1' src={pulsIcon} alt="My Icon" />
        </button>
      </div>

      <div className="button-container">
        <h2>🥘 맛 집 등록하기</h2>
        <button className="plusbutton2" onClick={goToyumpage}>
            <img className='imgbutton2' src={pulsIcon} alt="My Icon" />
     </button>
      </div>
    </div>
  );
}

export default Main;
