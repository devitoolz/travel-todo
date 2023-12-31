import React, { useEffect, useState } from 'react';
import {
  About,
  AddButton,
  Content,
  Header,
  InfoButton,
  MainContainer,
  PageSwitch,
  TutorialModal,
} from '../styles/AppStyle';

import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthAsia, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';

import { register } from 'swiper/element/bundle';

import logoSmall from '../assets/logosmall.png';
import mapImg from '../assets/map.png';
import map2Img from '../assets/map2.png';
import calendarImg from '../assets/calendar.png';
import todoImg from '../assets/todo.png';
import github from '../assets/github.png';
import notion from '../assets/notion.png';
import member1 from '../assets/member1.png';
import member2 from '../assets/member2.png';
import member3 from '../assets/member3.png';
import member4 from '../assets/member4.png';

const Main = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [switchBool, setSwitchBool] = useState(pathname.includes('map'));
  const [previousPath, setPreviousPath] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tutorialOpen, setTutorialOpen] = useState(null);

  useEffect(() => {
    const isFirst = localStorage.getItem('travel-todo');
    if (!isFirst) {
      localStorage.setItem('travel-todo', JSON.stringify(false));
    }

    if (isFirst !== 'false') {
      setTutorialOpen(true);
    } else {
      setTutorialOpen(false);
    }
  }, []);

  useEffect(() => {
    if (pathname.includes('map')) {
      if (!previousPath) {
        setPreviousPath('/calendar');
      }
      setSwitchBool(true);
    } else if (pathname.includes('calendar')) {
      if (!previousPath) {
        setPreviousPath('/map');
      }
      setSwitchBool(false);
    }
  }, [previousPath, pathname]);

  const handleSwitchChange = () => {
    setPreviousPath(pathname + search);
    setSwitchBool(!switchBool);
    navigate(previousPath);
  };

  const handleAddClick = () => {
    navigate('/todo');
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  register();

  return (
    <>
      <MainContainer>
        <Header>
          <img src={logoSmall} alt="" className="logo-small" />
          <div className="header-btn-container">
            <InfoButton onClick={showModal} />
            <PageSwitch
              onChange={handleSwitchChange}
              checked={switchBool}
              checkedChildren={<FontAwesomeIcon icon={faCalendarDays} />}
              unCheckedChildren={<FontAwesomeIcon icon={faEarthAsia} />}
            />
          </div>
        </Header>
        <Content>
          <Outlet />
        </Content>
        <AddButton
          onClick={handleAddClick}
          icon={<FontAwesomeIcon icon={faPlus} />}
          type="primary"
          shape="circle"
        />
      </MainContainer>
      <About
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
        centered
        footer={
          <div>
            <span>Team Notion </span>
            <a
              href="https://devitoolz.notion.site/Travel-Todo-TT-8f38ae2892434e6d953f8ae4c6589b5c?pvs=4"
              rel="noreferrer"
              target="_blank"
            >
              <img src={notion} alt="노션 바로가기" className="notion" />
            </a>
          </div>
        }
      >
        <div className="wrap">
          <h2 className="title">About</h2>
          <h3>나의 여행 기록을 관리할 수는 없을까?</h3>
          <p className="about-text">
            <span>
              여행 일정을 <b>계획</b>하고,
            </span>
            <br />
            <span>
              일정에 필요한 <b>준비물을 체크</b>하고,
            </span>
            <br />
            <span>
              여행에 대한 <b>리뷰를 작성</b>하는 것까지!
            </span>
            <br />
            <span>여행 전부터 여행 후까지 나만의 여행 일지를 관리할 수 있는 서비스입니다.</span>
          </p>
          <span className="member-title">프로젝트를 함께 만든 사람들</span>
          <div className="member-wrap">
            <div className="front-wrap">
              <h4>Front-end</h4>
              <div>
                <div className="member-detail-wrap">
                  <img src={member1} alt="박상렬 이미지" />
                  <div>
                    <span className="member-name">박상렬</span>
                    <div className="icons">
                      <a href="https://github.com/devitoolz" rel="noreferrer" target="_blank">
                        <img src={github} alt="깃허브 바로가기" className="github" />
                      </a>
                    </div>
                  </div>
                </div>
                <span className="roles">
                  기본 UI / 지도 페이지 /<br />
                  여행 일정 등록·수정 페이지 / 노션 관리
                </span>
              </div>
              <div>
                <div className="member-detail-wrap">
                  <img src={member2} alt="박주희 이미지" />
                  <div>
                    <span className="member-name">박주희</span>
                    <div className="icons">
                      <a href="https://github.com/heeheepark" rel="noreferrer" target="_blank">
                        <img src={github} alt="깃허브 바로가기" className="github" />
                      </a>
                    </div>
                  </div>
                </div>
                <span className="roles">
                  인트로 페이지 / 캘린더 페이지 /<br />
                  여행 일정 등록·수정 페이지
                </span>
              </div>
            </div>
            <div className="back-wrap">
              <h4>Back-end</h4>
              <div>
                <div className="member-detail-wrap">
                  <img src={member3} alt="신형주 이미지" />
                  <div>
                    <span className="member-name">신형주</span>
                    <div className="icons">
                      <a href="https://github.com/Shin-HyoungJoo/" rel="noreferrer" target="_blank">
                        <img src={github} alt="깃허브 바로가기" className="github" />
                      </a>
                    </div>
                  </div>
                </div>
                <span className="roles">맵 페이지 / todo-페이지</span>
              </div>
              <div>
                <div className="member-detail-wrap">
                  <img src={member4} alt="권민구 이미지" />
                  <div>
                    <span className="member-name">권민구</span>
                    <div className="icons">
                      <a href="https://github.com/KwonMingu" rel="noreferrer" target="_blank">
                        <img src={github} alt="깃허브 바로가기" className="github" />
                      </a>
                    </div>
                  </div>
                </div>
                <span className="roles">todo-페이지 / 캘린더 페이지</span>
              </div>
            </div>
          </div>
        </div>
      </About>
      <TutorialModal
        width={1000}
        open={tutorialOpen}
        footer={[]}
        centered
        onCancel={() => setTutorialOpen(false)}
        maskClosable={false}
      >
        <h2 style={{ fontSize: 30, color: '#1e88e5', paddingLeft: 14, marginBottom: 20 }}>
          Tutorial
        </h2>
        <swiper-container navigation="true">
          <swiper-slide>
            <img src={mapImg} style={{ width: 850, height: 585 }} alt="Map" />
            <p>
              <span>
                <strong style={{ color: 'red', paddingRight: 5 }}>❑</strong>
                페이지 토글 버튼 : 지도 / 달력 페이지로 전환할 수 있습니다.
              </span>
              <span>
                <strong style={{ color: 'aqua', paddingLeft: 30, paddingRight: 5 }}>❑</strong>
                About 버튼 : Travel Todo 프로젝트 소개를 볼 수 있습니다.
              </span>
            </p>
            <p>
              <span>
                <strong style={{ color: 'lime', paddingRight: 5 }}>❑</strong>
                일정 추가 버튼 : 일정 추가 페이지로 이동합니다.
              </span>
              <span>
                <strong style={{ color: 'blue', paddingLeft: 30, paddingRight: 5 }}>❑</strong>
                색상 변경 : 지도의 채우기, 선 색을 변경할 수 있습니다.
              </span>
            </p>
          </swiper-slide>
          <swiper-slide>
            <img src={map2Img} style={{ width: 850, height: 585 }} alt="Map" />
            <p>
              <span>
                <strong style={{ color: 'red', paddingRight: 5 }}>❑</strong>
                수정 / 삭제 버튼 : 일정을 수정, 삭제 할 수 있습니다.
              </span>
              <span>
                <strong style={{ color: 'aqua', paddingLeft: 30, paddingRight: 5 }}>❑</strong>할 일
                펼치기 / 접기 버튼 : 해당 일정의 할 일을 볼 수 있습니다.
              </span>
            </p>
            <p>
              <span>
                <strong style={{ color: 'lime', paddingRight: 5 }}>❑</strong>
                체크 리스트 펼치기 / 접기 버튼 : 해당 할 일의 체크 리스트를 볼 수 있습니다.
              </span>
            </p>
          </swiper-slide>
          <swiper-slide>
            <img src={calendarImg} style={{ width: 850, height: 585 }} alt="Calendar" />
            <p>
              <span>
                <strong style={{ color: 'red', paddingRight: 5 }}>❑</strong>
                일정 상세 보기 : 클릭하면 해당 일정의 상세 내용을 보여줍니다.
              </span>
              <span>
                <strong style={{ color: 'aqua', paddingLeft: 30, paddingRight: 5 }}>❑</strong>
                수정 / 삭제 버튼 : 일정을 수정, 삭제 할 수 있습니다.
              </span>
            </p>
            <p>
              <span>
                <strong style={{ color: 'lime', paddingRight: 5 }}>❑</strong>월 변경 버튼 : 달력의
                월을 변경할 수 있습니다.
              </span>
              <span>
                <strong style={{ color: 'blue', paddingLeft: 30, paddingRight: 5 }}>❑</strong>
                Today 버튼 : 오늘에 해당하는 달로 되돌아 갑니다.
              </span>
            </p>
          </swiper-slide>
          <swiper-slide>
            <img src={todoImg} style={{ width: 850, height: 585, objectFit: 'cover' }} alt="Todo" />
            <p>
              <span>
                <strong style={{ color: 'red', paddingRight: 5 }}>❑</strong>
                여행할 지역 및 기간 설정 : 여행할 지역과 기간을 설정합니다.
              </span>
              <span>
                <strong style={{ color: 'aqua', paddingLeft: 30, paddingRight: 5 }}>❑</strong>
                색상 변경 : 달력에서 표시될 일정 이벤트의 색상을 변경할 수 있습니다.
              </span>
            </p>
            <p>
              <span>
                <strong style={{ color: 'lime', paddingRight: 5 }}>❑</strong>할 일 추가 버튼 :
                클릭마다 할 일 목록이 추가됩니다.
              </span>
              <span>
                <strong style={{ color: 'blue', paddingLeft: 30, paddingRight: 5 }}>❑</strong>
                체크 리스트 추가 버튼 : 클릭마다 해당 할 일에 체크 리스트가 추가됩니다.
              </span>
            </p>
          </swiper-slide>
        </swiper-container>
      </TutorialModal>
    </>
  );
};

export default Main;
