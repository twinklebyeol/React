import React, { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

function DaumPost() {
  const [openPostcode, setOpenPostcode] = useState(false);

  const handleComplete = (data) => {
    // 검색 결과 항목을 클릭했을 때 실행할 코드
    // 이 부분에 data를 활용한 작업을 추가하세요.
    console.log(data);
  };

  const handleClickButton = () => {
    setOpenPostcode(true);
  };

  return (
    <div>
      <button onClick={handleClickButton}>주소 검색</button>
      {openPostcode && (
        <DaumPostcode onComplete={handleComplete} />
      )}
    </div>
  );
}

export default DaumPost;
