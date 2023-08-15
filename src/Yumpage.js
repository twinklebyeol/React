import { useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { Line } from "rc-progress";
import Address from "./Address";

const Yumpage = () => {
  const storage = getStorage();
  const [files, setFileList] = useState([]); // 파일 리스트
  const [isUploading, setUploading] = useState(false); // 업로드 상태
  const [photoURL, setPhotosURL] = useState([]); // 업로드 완료된 사진 링크들
  const [progress, setProgress] = useState(0); // 업로드 진행상태
  const [address, setAddress] = useState(""); // 주소 입력 상태

  // 주소 입력을 처리하는 함수
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  // 파일 선택시 파일리스트 상태 변경해주는 함수
  const handleImageChange = (e) => {
    for (const image of e.target.files) {
      setFileList((prevState) => [...prevState, image]);
    }
  };

  // 업로드시 호출될 함수
  const handleImageUpload = async (e, fileList) => {
    e.preventDefault();
    try {
      setUploading(true);
      // 업로드의 순서는 상관없으니 Promise.all로 이미지 업로드후 저장된 url 받아오기
      const urls = await Promise.all(
        fileList?.map((file) => {
          // 스토리지 어디에 저장되게 할껀지 참조 위치를 지정. 아래와 같이 지정해줄시 images 폴더에 파일이름으로 저장
          const storageRef = ref(storage, `images/${file.name}`);

          // File 또는 Blob 타입일 경우 uploadBytes 또는 uploadBytesResumable 메소드를 사용
          // 만약 base64 또는 data_url 문자열로 업로드를 진행할 경우는 uploadString 사용
          // 자세한 내용은 https://firebase.google.com/docs/storage/web/upload-files 공식문서 참고
          const task = uploadBytesResumable(storageRef, file);

          // 업로드 진행률을 모니터링, 업로드 진행률 퍼센트로 상태 지정
          task.on("state_changed", (snapshot) => {
            setProgress(
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
            );
          });
          return getDownloadURL(storageRef);
        })
      );
      // 업로드된 이미지 링크 상태로 지정 (보통은 해당 링크를 데이터베이스(파이어스토어)에 저장)
      setPhotosURL(urls);
      alert("성공적으로 업로드 되었습니다");
    } catch (err) {
      console.error(err);
    }
    // 초기화
    setProgress(0);
    setUploading(false);
  };

  return (
    <div>
      <form onSubmit={(e) => handleImageUpload(e, files)}>
        {/* 주소 입력 필드 */}
        <label>
          주소:
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="주소를 입력하세요"
          />
        </label>
        <Address />
        {/* rc-progress의 Line 컴포넌트로 파일 업로드 상태 표시 */}
        <Line percent={progress} strokeWidth={4} strokeColor="#ff567a" />
        <label>
          파일:
          <input
            multiple
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">{isUploading ? "업로드중..." : "업로드"}</button>
      </form>
      {/* 업로드된 사진 목록 */}
      {photoURL?.length > 0 && (
        <ul>
          {photoURL.map((url, index) => (
            <li key={index}>
              <img src={url} alt="사용자 첨부 이미지" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Yumpage;
