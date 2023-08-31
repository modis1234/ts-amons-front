//@ts-nocheck
import { faCaretDown } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatePicker, { registerLocale } from 'react-datepicker';
import './react-datepicker.css';
import ko from 'date-fns/locale/ko';
// import getYear from 'date-fns/getYear';
// import getMonth from 'date-fns/getMonth';
import { getYear, getMonth } from 'date-fns';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import styled from 'styled-components';

import { Icon } from 'semantic-ui-react';

const CalendarUICmpt = styled.div`
  /* date picker customize 시작 */
  display: flex;
  &.error {
    color: #ce3f3f;
  }
  .icon-box {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 5px;
    .cal-icon {
      top: 12px;
      position: absolute;
      display: inline-block;
      vertical-align: middle;
      font-size: 16px;
      color: red;
    }
  }
  .custom-triangle {
    position: absolute;
    right: -2px;
    &:hover {
      cursor: pointer;
      color: var(--company-identity-color, #0000ff);
      /* border-top: 6px solid var(--company-identity-color, #0000ff); */
    }
  }
  .cal-subtitle {
    font-family: NotoSansCJKkr-Medium;
    font-size: 16px;
    color: var(--company-identity-color, #0000ff);
    padding: 0px;
    margin: -5px;
  }
  /* .react-datepicker__triangle {
    position: absolute;
    margin-left: 80px !important;
  } */
  .react-datepicker__input-time-container {
    font-family: NotoSansCJKkr-Regular;
    font-size: 14px;
  }
  .react-datepicker-time__input input[type='time'] {
    height: 30px;
    font-family: NotoSansCJKkr-Regular;
  }
  .saturday {
    color: #305a70;
  }
  .sunday {
    color: #ce3f3f;
  }
  .react-datepicker {
    margin-left: -40px;
    font-family: NotoSansCJKkr-Regular;
    font-size: 14px;
    .react-datepicker__day-names {
      font-family: NotoSansCJKkr-Medium;
      font-size: 15px;
    }
    .react-datepicker__day--selected,
    .react-datepicker__day--keyboard-selected {
      color: #2e2e2e;
      border-color: transparent !important ;
      background-color: transparent !important;
    }
    .react-datepicker__day--today {
      color: inherit;
      font-family: NotoSansCJKkr-Regular !important;
      font-weight: 100 !important;
    }
    .react-datepicker__day--disabled {
      color: #ccc !important;
    }
  }
  .increase-button,
  .decrease-button {
    font-family: NotoSansCJKkr-Medium;
    font-size: 20px;
    vertical-align: middle;
    text-align: center;
    padding: 5px;
    padding-top: 0px;
    margin: 5px;
    border-radius: 200px;
    height: 23px;
    border: solid 1px rgba(34, 36, 38, 0.35);
    display: inline-block;
    font-weight: bolder;
    cursor: pointer;
    &:hover {
      color: var(--company-identity-color, #0000ff) !important;
      background-color: #ffffff;
    }
  }
  select {
    font-family: NotoSansCJKkr-Medium;
    &:hover {
      cursor: pointer;
    }
  }
  .date-picker-custom-input.wrapper {
    padding-right: 20px;

    &:hover {
      cursor: pointer;
      color: var(--company-identity-color, #0000ff);
      border-color: var(--company-identity-color, #0000ff);
    }
  }

  /* date picker customize 종료 */
`;

type CalendarUIType = {
  type: string;
  className: string;
  icon: boolean;
  headerText: string;
  onChangeDate: (date: Date | string, type: string) => void;
  setDate: Date;
  error: boolean;
};

type DateType = Date;

const CalendarUI = ({
  type = 'from', //from/to/daily
  className,
  icon = false,
  headerText = '시작일을 선택하세요.',
  onChangeDate,
  setDate,
  error = false,
}: CalendarUIType) => {
  const today = new Date();

  const years = _.range(2018, getYear(new Date()) + 5, 1); // 수정
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const [startDate, setStartDate] = useState<DateType>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
  );

  const [endDate, setEndDate] = useState<DateType>(
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
      23,
      59,
      59,
    ),
  );

  const [initDate, setInitDate] = useState<DateType | null>(null);

  useEffect(() => {
    setInitDate(setDate ? new Date(setDate) : null);
  }, [setDate]);

  const onChangeStartDate = (date: DateType) => {
    setInitDate(date);
    onChangeDate(date, type);
  };

  // 요일 반환
  const getDayName = (date: DateType) => {
    return date.toLocaleDateString('ko-KR', { weekday: 'long' }).substr(0, 1);
  };

  // 날짜 비교시 년 월 일까지만 비교하게끔
  const createDate = (date: DateType) => {
    return new Date(
      new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0),
    );
  };

  const StartDateInput = ({ onClick }: { onClick: () => void }) => (
    <div className="date-picker-custom-input wrapper">
      <div className="date-picker-custom-input start" onClick={onClick}>
        {moment(initDate).format('YYYY-MM-DD HH:mm')}
        <FontAwesomeIcon className="custom-triangle" icon={faCaretDown} />
      </div>
    </div>
  );

  return (
    <CalendarUICmpt
      className={`calendarui-component ${error ? 'error' : ''} ${
        className ? className : ''
      }`}
    >
      {icon && (
        <div className="icon-box">
          <Icon name="calendar alternate outline" />
        </div>
      )}
      <DatePicker
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <>
            <p className="cal-subtitle">{headerText}</p>
            {/* <div className="border-line" /> */}
            <div
              style={{
                margin: 10,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div
                className="decrease-button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {'<'}
              </div>

              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(value)}
              >
                {years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                className="select-box"
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) =>
                  changeMonth(months.indexOf(value))
                }
              >
                {months.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div
                className="increase-button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {'>'}
              </div>
            </div>
          </>
        )}
        className="date-picker-input"
        locale={ko}
        name="day_start"
        useWeekdaysShort
        selected={initDate}
        onChange={(date) => onChangeStartDate(date)}
        maxDate={endDate}
        // startDate={initDate}
        startDate={startDate}
        // endDate={new Date('2022-12-28')}
        customInput={<StartDateInput />}
        dayClassName={(date: Date) =>
          getDayName(createDate(date)) === '토'
            ? 'saturday'
            : getDayName(createDate(date)) === '일'
            ? 'sunday'
            : undefined
        }
        showTimeInput
        timeInputLabel="시간선택 : "
      />
    </CalendarUICmpt>
  );
};

export default CalendarUI;
