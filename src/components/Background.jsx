import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router 사용
import startIcon from '../assets/start-icon.png';
import loginIcon from '../assets/login-icon.svg';

// 랜덤 별 생성 함수
const generateRandomStars = (count) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const topPosition = Math.random() * 100;

    // 언더바 위치(90% ~ 100%)에는 별을 생성하지 않음
    if (topPosition >= 90) {
      continue;
    }

    stars.push({
      size: `${Math.random() * 0.2 + 0.1}vw`, // 크기: 0.2vw ~ 0.3vw
      top: `${topPosition}%`, // 위치: 0% ~ 95% (상단)
      left: `${Math.random() * 100}%`, // 위치: 0% ~ 100% (좌측)
    });
  }
  return stars;
};

// 언더바
const Underbar = () => {
  const [time, setTime] = useState('');

  // 현재 시간을 업데이트하는 함수
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
      setTime(formattedTime);
    };

    updateTime();
    const timer = setInterval(updateTime, 10000); // 10초마다 업데이트

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  return (
    // 언더바 크기
    <div className="fixed bottom-0 left-0 h-[5vh] min-h-[35px] w-full bg-[#C0C0C0] shadow-[0_-1px_0_#000] flex items-center justify-between px-4 ">
      {/* Start 버튼 */}
      <button
        className="
      inline-flex items-center justify-center
      bg-[#C0C0C0]
      shadow-[inset_2px_2px_0_#FFF,inset_-2px_-2px_0_#808080,inset_2px_2px_0_#DFDFDF]
      text-black font-main
      text-[min(2vw,16px)]
      px-[1vw] py-[0.5vh]
      cursor-pointer
      active:border-r-[1px] active:border-b-[1px] active:border-[#FFF]
      active:shadow-[inset_1px_1px_0_#000,inset_-2px_-2px_0_#DFDFDF,inset_2px_2px_0_#808080]
      h-80%
    "
        onClick={() => {}}
      >
        <img
          src={startIcon}
          alt="Start Icon"
          className="h-[80%] max-h-[25px] aspect-square mr-2"
        />
        Start
      </button>

      {/* 시간 표시 박스 */}
      <div
        className="
    inline-flex items-center justify-center
    bg-[#C0C0C0] 
    shadow-[inset_-2px_-2px_0_#FFF,inset_2px_2px_0_#808080]
    text-black font-main
    text-[min(2vw,16px)]   /* 폰트 크기 반응형: 최대 16px */
    px-[1vw] py-0          /* 가로 패딩만 반응형, 세로 패딩 고정 */
    h-[32px]               /* 세로 높이 고정 */
  "
      >
        {time}
      </div>
    </div>
  );
};

// 배경화면
const Background = ({ children }) => {
  const [stars, setStars] = useState([]);
  useEffect(() => {
    const initialStars = generateRandomStars(30);
    setStars(initialStars);
  }, []);
  const navigate = useNavigate(); // React Router의 네비게이션 함수

  return (
    <div className="relative h-screen w-screen bg-[#202020] overflow-auto scrollbar-hide">
      {/* 로그인/회원가입 버튼 */}
      <button
        className="absolute top-4 left-4 p-2 bg-transparent"
        onClick={() => navigate('/login')} // /login 경로로 이동
      >
        <img
          src={loginIcon}
          alt="Login Icon"
          className="
      w-16 h-16        // 기본 크기 (64px)
      sm:w-20 sm:h-20  // 화면 너비 640px 이상 (80px)
      md:w-24 md:h-24  // 화면 너비 768px 이상 (96px)
      lg:w-28 lg:h-28  // 화면 너비 1024px 이상 (112px)
      xl:w-30 xl:h-30  // 화면 너비 1280px 이상 (120px)
    "
        />
      </button>
      {/* 랜덤 별 렌더링 */}
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute bg-white rounded-full"
          style={{
            width: star.size,
            height: star.size,
            top: star.top,
            left: star.left,
          }}
        ></div>
      ))}
      {/* children 렌더링 */}
      <div>{children}</div>
      {/* 언더바 */}
      <Underbar />
    </div>
  );
};

export default Background;
