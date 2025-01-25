import React from 'react';
import Button from './Button';
import matchIcon from '../assets/share.png';

const Match = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative -top-10">
        {/* 상단 파란색 바 */}
        <div className="w-[879px] h-11 bg-[#0000aa] relative top-[6rem] left-[0.5rem] z-20" />

        {/* 제목 */}
        <h2 className="text-white text-[32px] font-normal relative z-30 top-[3.2rem] left-6">
          Match Chart
        </h2>

        {/* 메인 창 */}
        <div className="relative w-[889px] h-[506px] bg-[#c3c7cb] shadow-[5px_5px_0px_1px_rgba(0,0,0,0.90),inset_8px_8px_0px_0px_rgba(255,255,255,0.90)] z-10">
          {/* 텍스트를 하단에 배치 */}
          <p className="absolute bottom-[6rem] left-[2.5rem] text-black text-lg">
            유효코드를 입력하신 후 완료버튼을 누르면 <br /> 알고리즘 일치율
            보드판을 보실 수 있습니다.
          </p>

          {/* 오른쪽 입력 칸 */}
          <div className="absolute top-[3rem] right-[2rem] w-[300px] h-[400px] bg-white shadow-[4px_4px_4px_0px_rgba(255,255,255,1.00),inset_0px_-4px_4px_0px_rgba(0,0,0,0.25)] border-2 border-[#868a8e] z-[999]">
            {/* 입력 칸 내용 */}
            <div className="p-4">
              <h3 className="text-black text-xl font-bold mb-4">
                유효코드 입력
              </h3>
              <input
                type="text"
                placeholder="유효코드를 입력하세요"
                className="w-full p-2 border border-[#868a8e] rounded-md mb-4"
              />
              <button className="w-full bg-[#0000aa] text-white py-2 rounded-md">
                완료
              </button>
            </div>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <Button
          type="x"
          className="relative -top-[31rem] -right-[53rem] text-black text-2xl cursor-pointer z-30"
          onClick={onClose} // 창 닫기
        >
          X
        </Button>

        {/* 아이콘 */}
        <img
          src={matchIcon}
          alt="match Icon"
          className="absolute top-[7rem] left-[1rem] z-40 w-[25rem] h-[25rem]"
        />
      </div>
    </div>
  );
};

export default Match;
