import React, { useState } from 'react';
import Button from './Button';
import youtubeImage from '../assets/youtube_icon.png';
import Input from '../components/Input';
import api from '../api/axios_config';
import { getCookie } from '../utils/cookie'; // 쿠키 함수 import

const Mpopup = ({
  className,
  variant = 'default',
  onClose,
  onNameChange = () => {},
}) => {
  const styles = {
    subscribe: `w-[889px] h-[506px] bg-[#c3c7cb] shadow-[5px_5px_0px_1px_rgba(0,0,0,0.90),inset_8px_8px_0px_0px_rgba(255,255,255,0.90)]`,
    profile: `w-[889px] h-[506px] bg-[#c3c7cb] shadow-[5px_5px_0px_1px_rgba(0,0,0,0.90),inset_8px_8px_0px_0px_rgba(255,255,255,0.90)]`,
    youlogin: `w-[402px] h-[209px] bg-[#c3c7cb] border-4 border-black`,
    default: '',
  };

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [preview, setPreview] = useState(null); // 이미지 미리보기 상태
  const [file, setFile] = useState(null); // 실제 파일 저장 상태
  const [profileImageUrl, setProfileImageUrl] = useState(null); // 서버에서 받은 프로필 이미지 URL

  // 프로필 이미지 업로드
  const handleProfileImageUpload = async () => {
    if (!file) return; // 파일이 없으면 업로드하지 않음

    const formData = new FormData();
    formData.append('file', file); // FastAPI는 'file' 필드를 기대함

    try {
      const response = await api.put('/profile/upload', formData, {
        headers: {
          Authorization: `Bearer ${getCookie('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.profile_img_url) {
        setProfileImageUrl(response.data.profile_img_url); // 상태 업데이트
        alert('프로필 이미지가 성공적으로 업로드되었습니다.');
      } else {
        alert('프로필 이미지 업로드에 실패했습니다. 다시 시도하세요.');
      }
    } catch (error) {
      console.error('프로필 이미지 업로드 오류:', error);
      alert('프로필 이미지 업로드 중 오류가 발생했습니다. 다시 시도하세요.');
    }
  };

  // 비밀번호 변경
  const handlePasswordChange = async () => {
    if (!password) return; // 비밀번호가 없으면 변경하지 않음

    try {
      const response = await api.put(
        '/profiles/password-change',
        { new_password: password }, // JSON 형식으로 전송
        {
          headers: {
            Authorization: `Bearer ${getCookie('access_token')}`,
            'Content-Type': 'application/json', // JSON 형식 명시
          },
        }
      );

      if (response.status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
      } else {
        alert('비밀번호 변경에 실패했습니다. 다시 시도하세요.');
      }
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      alert('비밀번호 변경 중 오류가 발생했습니다. 다시 시도하세요.');
    }
  };

  // 이름 변경
  const handleNameChange = async () => {
    if (!name) return; // 이름이 없으면 변경하지 않음

    try {
      const response = await api.put(
        '/profiles/name-change',
        { name: name }, // 서버에서 요구하는 키는 'name'
        {
          headers: {
            Authorization: `Bearer ${getCookie('access_token')}`,
            'Content-Type': 'application/json', // JSON 형식 명시
          },
        }
      );

      if (response.status === 200) {
        alert('이름이 성공적으로 변경되었습니다.');
        setName(response.data.user_name); // 서버에서 반환된 새로운 이름으로 상태 업데이트
        onNameChange(response.data.user_name); // 콜백 호출하여 새로운 이름 전달
      } else {
        alert('이름 변경에 실패했습니다. 다시 시도하세요.');
      }
    } catch (error) {
      console.error('이름 변경 오류:', error);
      alert('이름 변경 중 오류가 발생했습니다. 다시 시도하세요.');
    }
  };

  // 저장 버튼 클릭 시 실행
  const handleSave = async () => {
    if (file) await handleProfileImageUpload(); // 사진이 변경된 경우
    if (password) await handlePasswordChange(); // 비밀번호가 변경된 경우
    if (name) await handleNameChange(); // 이름이 변경된 경우

    onClose(); // 팝업 닫기
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      {/* 정보수정 창 */}
      {variant === 'profile' && (
        <div className={`${styles.profile} ${className} p-8 relative`}>
          <div className="w-[875px] h-11 bg-[#0000aa] absolute top-3 left-3" />
          <h2 className="text-white text-[32px] font-normal relative z-10 mt-2 -top-7 -left-2">
            내 정보 수정
          </h2>
          <div className="flex">
            <div className="flex flex-col">
              {/* 프로필 이미지 업로드 영역 */}
              <div
                className="w-[18.75rem] h-[16.25rem] bg-[#ffffff] flex items-center justify-center mr-12 relative overflow-hidden"
                style={{
                  boxShadow:
                    'inset -3px -3px 0px #FFF, inset 3px 3px 0px #808080',
                }}
              >
                {/* 업로드된 이미지 미리보기 */}
                {preview || profileImageUrl ? (
                  <img
                    src={profileImageUrl || preview}
                    alt="Uploaded Preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  // 기본 배경
                  <p className="text-gray-500 text-center text-[1rem]">
                    이미지를 여기에 추가하세요
                  </p>
                )}
                {/* 파일 선택 입력 */}
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      // 미리보기 이미지로 표시
                      const imageUrl = URL.createObjectURL(file);
                      setPreview(imageUrl);
                      setFile(file); // 실제 파일 저장
                    }
                  }}
                />
              </div>
              <div className="pl-16">
                <Button
                  type="popup"
                  onClick={() => {
                    document.getElementById('fileInput').click(); // 파일 입력 필드 트리거
                  }}
                  className="w-[155px] h-[46px] text-xl font-normal mt-4"
                >
                  프로필 변경
                </Button>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center mb-6">
                <label
                  htmlFor="email"
                  className="text-[2rem] w-[200px] text-right"
                >
                  이&nbsp;&nbsp;&nbsp;&nbsp;름 :
                </label>
                <Input
                  id="name"
                  name="name"
                  value={name}
                  className="flex-1"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* 비밀번호 입력 */}
              <div className="flex items-center mb-6">
                <label
                  htmlFor="password"
                  className="text-[2rem] w-[200px] text-righ"
                >
                  비밀번호 :
                </label>
                <Input
                  id="password"
                  name="password"
                  className="flex-1"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="w-[820px] h-[0px] shadow-[4px_4px_4px_0px_rgba(255,255,255,1.00),inset_0px_-4px_4px_0px_rgba(0,0,0,0.25)] border-2 border-[#868a8e] absolute bottom-20 left-1/2 transform -translate-x-1/2" />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <Button
              type="popup"
              onClick={onClose}
              className="w-[155px] h-[46px]"
            >
              취소
            </Button>
            <Button
              type="popup"
              onClick={handleSave} // 저장 버튼 클릭 시 handleSave 실행
              className="w-[155px] h-[46px]"
            >
              저장
            </Button>
          </div>
          <div className="absolute bottom-[90.5%] right-[1%] z-10">
            <Button
              type="x"
              onClick={onClose}
              className="w-[27px] h-[27px] flex justify-center items-center text-3xl font-normal"
            >
              X
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Mpopup;
