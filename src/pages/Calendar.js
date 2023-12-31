import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Schedule from '../components/calendar/Schedule';
import { CalendarDiv, DrawerDiv } from './../styles/CalendarStyle';
import './../styles/fullCalendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { Drawer } from 'antd';
import axios from 'axios';
import moment from 'moment';
import tinycolor from 'tinycolor2';
import { ScaleLoader } from 'react-spinners';

const Calendar = ({ isDataChanged, setIsDataChanged }) => {
  const [eventData, setEventData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectId, setSelectId] = useState(0);
  const [selectTitle, setSelecTitle] = useState('');
  const [selectStartDate, setSelectStartDate] = useState('');
  const [selectEndDate, setSelectEndDate] = useState('');
  const [selectReview, setSelectReview] = useState('');
  const [todoData, setTodoData] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();

  const queryYear = searchParam.get('year');
  const queryMonth = searchParam.get('month');

  const today = moment(Date.now()).format('YYYY-MM');
  const todayYear = today.split('-')[0];
  const todayMonth = today.split('-')[1];

  const [year, setYear] = useState(queryYear ? queryYear : todayYear);
  const [month, setMonth] = useState(queryMonth ? queryMonth : todayMonth);
  const calRef = useRef(null);

  // 세부 여행 일정 표시
  const showDrawer = e => {
    setTodoData(null);
    const idTitle = e.event._def.extendedProps.idTitle;
    getTitle(idTitle);
    getTodo(idTitle);
    setOpen(true);
  };

  // 캘린더 월 변경
  const handleDatesSet = () => {
    if (calRef.current) {
      const calApi = calRef.current.getApi();

      const currentYear = calApi.getDate().getYear() + 1900;
      const currentTempMonth = calApi.getDate().getMonth() + 1;
      const currentMonth = currentTempMonth < 10 ? '0' + currentTempMonth : currentTempMonth;

      setYear(currentYear);
      setMonth(currentMonth);
    }
  };

  // title 가져오기
  const getTitle = async idTitle => {
    try {
      const res = await axios.get(`/api/calender/${idTitle}`);
      const result = res.data;
      setSelectId(result.idTitle);
      setSelecTitle(result.title);
      setSelectStartDate(result.startDate);
      setSelectEndDate(result.endDate);
      setSelectReview(result.travelReview);
    } catch (err) {
      console.log(err);
    }
  };

  // 할일 가져오기
  const getTodo = async idTitle => {
    try {
      const res = await axios.get(`/api/calender/${idTitle}/sub`);
      const result = res.data;
      const promises = result.map(item => getCheckList(item));
      const todoArray = await Promise.all(promises);
      setTodoData(todoArray);
    } catch (err) {
      console.log(err);
    }
  };

  // 체크리스트 가져오기
  const getCheckList = async item => {
    try {
      const res = await axios.get(`/api/calender/${item.idSub}/check`);
      const result = res.data;
      const newTodo = { ...item, checkList: result };
      return newTodo;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    searchParam.set('year', year);
    searchParam.set('month', month);
    setSearchParam(searchParam);

    if (calRef.current) {
      const calApi = calRef.current.getApi();
      calApi.gotoDate(`${year}${month}`);
    }

    // calendar event 데이터 가져오기
    const getCalendarData = async () => {
      try {
        const res = await axios.get(`/api/calender?year=${year}&month=${month}`);
        const result = res.data;
        // calendar event 생성
        const newEventData = result.map(item => {
          // 새로운 종료 날짜 생성(기존 종료일 + 1)
          const originEndDate = item.endDate;
          const date = new Date(originEndDate);
          const addOneDay = 86400000;
          const newDate = Number(date) + addOneDay;
          const newEndDate = moment(newDate).format('YYYY-MM-DD');
          const isDark = tinycolor(`#${item.calColor}`).isDark();

          return {
            idTitle: item.idTitle,
            color: `#${item.calColor}`,
            textColor: isDark ? '#fff' : '#000',
            end: newEndDate,
            start: item.startDate,
            title: item.title,
          };
        });
        setEventData(newEventData);
      } catch (err) {
        console.log(err);
      }
    };

    getCalendarData();
  }, [year, month, calRef, isDataChanged]);

  return (
    <CalendarDiv>
      <div className="wrap">
        <FullCalendar
          ref={calRef}
          height="690px"
          initialView="dayGridMonth"
          locale={'ko'}
          dayCellContent={day => day.dayNumberText.replace('일', '')}
          plugins={[dayGridPlugin]}
          events={eventData}
          eventClick={showDrawer}
          datesSet={handleDatesSet}
          dayMaxEvents={true}
          moreLinkContent={args => {
            return <span>{'+' + args.num}</span>;
          }}
        />
      </div>
      <DrawerDiv>
        <Drawer
          placement="right"
          closable={false}
          open={open}
          getContainer={false}
          mask={false}
          destroyOnClose={true}
        >
          {todoData === null ? (
            <ScaleLoader color="#cccccc" className="scale-loader" />
          ) : (
            <Schedule
              selectId={selectId}
              selectTitle={selectTitle}
              selectStartDate={selectStartDate}
              selectEndDate={selectEndDate}
              selectReview={selectReview}
              todoData={todoData}
              setIsDataChanged={setIsDataChanged}
              setOpen={setOpen}
            />
          )}
        </Drawer>
      </DrawerDiv>
    </CalendarDiv>
  );
};
export default Calendar;
