import _ from 'lodash';
import { GroupType } from 'modules/groups/types';
import { LocalType } from 'modules/locals';
import moment from 'moment';
import 'moment/locale/ko';

/**
 * @description deviceCode
 * @return {object} * 터널명
 * */
export const deviceCode = {
  1: { code: 1, name: 'CCTV', key: 'cctv' },
  2: { code: 2, name: '스캐너', key: 'scn' },
  3: { code: 3, name: '가스센서', key: 'sensor' },
  4: { code: 4, name: '와이파이', key: 'wifi' },
  5: { code: 5, name: '비상방송', key: 'tts' },
  6: { code: 6, name: '비상전화', key: 'phone' },
  7: { code: 7, name: '무선장비', key: 'wireless' },
};

/**
 * @description 노선 굴진방향 리턴
 * @param {number} param 노선 local_area 데이터
 * @return {string} * 터널명
 * */
export const getLocalType = (param: number) => {
  const _localType = param;
  switch (_localType) {
    case 1:
      return '왕십리방향';
    case 2:
      return '종암동방향';
    // case 3:
    //   return '환기구';
    // case 4:
    //   return '정거장';
    // case 5:
    //   return '환승통로';
    default:
      return '';
  }
};

/**
 * @description 노선 터널명 리턴
 * @param {number} param 노선 local_area 데이터
 * @return {string} * 터널명
 * */
export const getTunnelName = (param: number) => {
  const _localArea = param;
  switch (_localArea) {
    case 0:
      return '수직구';
    case 1:
      return '1터널';
    case 2:
      return '2터널';
    case 3:
      return '3터널';
    case 4:
      return '4터널';
    default:
      return '미지정';
  }
};

/**
 * @description 스캐너 위치
 * */

// @ts-nocheck
export const getPosition = (item: GroupType) => {
  if (item) {
    const { local_type, group_kind, group_pos_x } = item;

    if (local_type === 1 || local_type === 2) {
      return group_kind === 3
        ? `${group_pos_x?.toLocaleString('ko-KR')}m`
        : group_kind === 1
        ? '입장'
        : group_kind === 2
        ? '퇴장'
        : group_kind === 3
        ? `${group_pos_x?.toLocaleString('ko-KR')}m`
        : group_kind === 4
        ? '막장'
        : '-';
    } else if (local_type === 4) {
      return '정거장';
    } else {
      return group_pos_x < 0 ? '지상부' : '하부';
    }
  }
};

export const getPosX = ({
  posX,
  localType,
}: {
  posX: number;
  localType: number;
}) => {
  const _posX = posX;
  if (localType === 1 || localType === 2 || localType === 5) {
    return `${posX >= 0 ? addComma(posX) : '- '}m`;
  } else if (localType === 3) {
    switch (_posX) {
      case -1:
        return '지상부';
      case 1:
        return '하부';
      default:
        return `${_posX}m`;
    }
  } else if (localType === 4) {
    //정거장
    return '정거장';
  } else return '-';
};

/**
 * @description 노선 Dropdown Options 데이터바인딩
 * @param {list} items localsData
 * @return {string} * 터널명
 * */
export const getLocalsOptions = (items: LocalType[], isAll: boolean = true) => {
  const _localItems = items;
  console.log('localarea->');

  const _localsOptions = _localItems.reduce(
    (acc: Array<any>, curr: LocalType) => {
      const {
        local_id: key,
        local_name,
        local_description,
        local_index: value,
        local_type,
        local_area,
        local_entrance,
        local_used,
        created_date,
      } = curr;

      const _localType = getLocalType(local_type);
      const _tunnelName = getTunnelName(local_area);

      const tempObj = {
        key,
        text: `${_tunnelName} ${local_name} ${
          _localType ? `${_localType}` : ''
        }`,
        value,
        // description: _tunnelName,
        type: local_type,
        area: local_area,
        entrance: local_entrance,
        disabled: local_used !== 0 ? false : true,
        created_date: created_date,
      };
      acc.push(tempObj);
      return acc;
    },
    isAll ? [{ key: 0, text: '전체', value: null, area: 0 }] : [],
  );
  return sortFn(_localsOptions, 'area');
};

/**
 * @description 노선 Dropdown Options 데이터바인딩
 * @param {list} items localsData
 * @return {string} * 터널명
 * */
export const getGroupKindOptions = (items: Array<any>) => {
  const _groupOptions = items.reduce((acc, curr) => {
    const {
      group_id: key,
      group_name: value,
      group_pos_x,
      local_index,
      local_area,
      local_name,
      local_type,
      group_kind,
    } = curr;

    const tempObj = {
      key,
      text:
        group_kind !== 4
          ? `${getGroupKind(group_kind)}_${getPosX({
              posX: group_pos_x,
              localType: local_type,
            })}`
          : '막장',
      // text: `${local_name}${local_type ? `_${getLocalType(local_type)}` : ''}`,
      value: value,
      type: local_type,
      area: local_area,
      index: local_index,
      kind: group_kind,
      // description: `${
      //   local_type === 3 ? getPosX(group_pos_x) : `${group_pos_x}m`
      // } (${getGroupKind(group_kind)})`,
    };
    acc.push(tempObj);
    return acc;
  }, []);
  return sortFn(_groupOptions, 'kind');
};

/**
 * @description 스캐너 용도 리턴
 * @param {number} param 스캐너 용도 group_kind 데이터
 * @return {string} * 용도명
 * */
export const getGroupKind = (groupKind: number) => {
  switch (groupKind) {
    case 0:
      return '지정안함';
    case 1:
      return '입장';
    case 2:
      return '퇴장';
    case 3:
      return '위치추적';
    case 4:
      return '막장';
    default:
      return '-';
  }
};

/**
 * @description 소속사 Dropdown Options 데이터바인딩
 * @param {list} items companiesData
 * @return {Array} * options Data
 * */
export const getCompaniesOptions = (items: Array<any>) => {
  const _companiesItems = items;

  const _companieOptions = _companiesItems.reduce(
    (acc, curr) => {
      const { co_id, te_name, co_name } = curr;

      const tempObj = {
        key: co_id,
        text: co_name,
        value: co_id,
      };
      acc.push(tempObj);
      return acc;
    },
    [{ key: 0, text: '전체', value: null, area: 0 }],
  );
  return _companieOptions;
};

/**
 * @description 세자리에서 콤마 찍기
 * @param {number} number 노선 숫자 인자
 * @return {string} 콤마 찍힌 문자열
 * */
export const addComma = (number: number) => {
  if (!number) return 0;

  // eslint-disable-next-line no-restricted-globals
  // const _number = isNaN(number) ? number.replaceAll(',', '') : number;
  // const _comma =
  //   number <= 999
  //     ? _number
  //     : _number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return isNaN(number) ? 0 : Number(number).toLocaleString('ko-kr');
};

/**
@method percentBind 퍼센트 계산 수식 - 소수점 한자리까지만 연산
@param {Number} childNum 분자  - 일부
@param {Number} parentNum 분모  - 전체
*/
export const percentBind = (
  childNum: number,
  parentNum: number,
  decimalPoint = 10,
) => {
  if (childNum === 0) {
    return 0;
  }
  const _percent = (childNum / parentNum) * 100;
  const _Math = Math.round(_percent * decimalPoint) / decimalPoint;
  return mathRound(_Math, 1);
};

/**@description 12자리 이상 일 때, 입력된 값을 두자로 잘라서 : 를 넣는다. */
export const splitByColon = (str = '') => {
  const length = str.length;
  let point = str.length % 2;
  let splitedStr = '';

  splitedStr = str.substring(0, point);
  while (point < length) {
    if (splitedStr !== '') splitedStr += ':';
    splitedStr += str.substring(point, point + 2);
    point += 2;
  }

  return splitedStr;
};

/**@description 12자리 이하 일 때,  입력된 값을 두자로 잘라서 : 를 넣는다. */
export const splitByColonInput = (str: string) => {
  const _str = str.replace(/:/g, '');
  if (_str.length > 12) {
    return splitByColon(_str.substring(0, 12));
  }

  const length = _str.length;
  let point = _str.length % 2;
  let splitedStr = '';
  splitedStr = _str.substring(0, point);
  while (point < length) {
    if (splitedStr !== '') splitedStr += ':';
    splitedStr += _str.substring(point, point + 2);
    point += 2;
  }
  return splitedStr;
};

// 콘솔 에러 메시지 출력 제어값
const showError = false;
/**
  @decription [자리수0채우기] 1. 지정한 자리수만큼 0으로 채웁니다.
  @return {string}
 */
export const addZero = (str: string, digit = 3) => {
  if (str !== (null || undefined) && digit) {
    try {
      const _str = str.toString();
      let zeros = '';
      for (let i = 0; i < digit - _str.length; i++) {
        zeros += '0';
      }
      return zeros + _str;
    } catch (e) {
      showError && console.log('<addZero Error>', e);
    }
  }
};

/**
 * @description 자리수 만큼 남은 공간을 0으로 채우기
 */
export const zeroFill = (num: number, width: number) => {
  let _num = `${num} `;
  return _num.length >= width + 1
    ? _num
    : new Array(width + 1 - _num.length + 1).join('0') + _num;
};

/**
 * @description 객체 배열 오름차순
 */

export const sortFn = (
  items: Array<any> = [],
  key: string,
  oderBy: string = 'asc',
) => {
  // return items.sort((a, b) => {
  //   if (oderBy === 'asc') {
  //     if (a[key] > b[key]) return 1;
  //     if (a[key] < b[key]) return -1;
  //     return 0;
  //   } else if (oderBy === 'desc') {
  //     if (a[key] < b[key]) return 1;
  //     if (a[key] > b[key]) return -1;
  //     return 0;
  //   }
  // });
  return oderBy === 'asc'
    ? _.sortBy(items, key)
    : _.sortBy(items, key).reverse();
};

/**
 * @description input에 전화번호 입력시 하이픈(-)이 글자수에 따라 자동으로 붙는 스크립트
 */
export const autoHypenPhone = (string: string) => {
  let str = string.replace(/[^0-9]/g, '');
  let tmp = '';
  if (str.length < 4) {
    return str;
  } else if (str.length < 7) {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3);
    return tmp;
  } else if (str.length < 11) {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 3);
    tmp += '-';
    tmp += str.substr(6);
    return tmp;
  } else if (str.length === 11) {
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 4);
    tmp += '-';
    tmp += str.substr(7);
    return tmp;
  } else {
    // eslint-disable-next-line no-unreachable
    return string;
  }
};

/**
 * @description 시간 계산 함수 (MM개월 HH시간 mm분)
 */
export const getDiffTime = (toDate: Date | string, fromDate: Date | string) => {
  const _toDate = moment(toDate);
  const _fromDate = moment(fromDate);
  const month = moment.duration(_toDate.diff(_fromDate)).months();
  const day = moment.duration(_toDate.diff(_fromDate)).days();
  const hour = moment.duration(_toDate.diff(_fromDate)).hours();
  const minute = moment.duration(_toDate.diff(_fromDate)).minutes();
  const milliseconds = moment
    .duration(_toDate.diff(_fromDate))
    .asMilliseconds();

  let str = '';

  if (month > 0) {
    str += `0${month}개월 `;
  }
  if (day > 0) {
    str += `${day < 10 ? `0${day}` : day}일 `;
  }
  if (hour > 0) {
    str += `${hour < 10 ? `0${hour}` : hour}시간 `;
  }
  if (minute > 0) {
    str += `${hour === 0 ? '' : ''} ${minute < 10 ? `0${minute}` : minute}분`;
  }
  if (day <= 0 && hour <= 0 && minute <= 0 && milliseconds > 0) {
    str += `1분 미만`;
  }

  return str;
};

/**
 * @description 시간 계산 함수 (HH시간 mm분)
 * @description 최대 999시간 표현
 */
export const getDurationTime = (
  toDate: Date | string,
  fromDate: Date | string,
) => {
  const _toDate = moment(toDate);
  const _fromDate = moment(fromDate);
  const month = moment.duration(_toDate.diff(_fromDate)).months();
  const day = moment.duration(_toDate.diff(_fromDate)).days();
  const hour = moment.duration(_toDate.diff(_fromDate)).hours();
  const minute = moment.duration(_toDate.diff(_fromDate)).minutes();
  const milliseconds = moment
    .duration(_toDate.diff(_fromDate))
    .asMilliseconds();

  let str = '';

  // if (month > 0) {
  //   str += `0${month}개월 `;
  // }
  // if (day > 0) {
  //   str += `${day < 10 ? `0${day}` : day}일 `;
  // }
  if (hour > 0) {
    let _hour = day > 0 ? hour + day * 24 : hour;
    str += `${_hour < 10 ? `0${_hour}` : _hour >= 999 ? 999 : _hour}시간 `;
  }
  if (minute > 0) {
    str += `${hour === 0 ? '' : ''} ${minute < 10 ? `0${minute}` : minute}분`;
  }
  if (day <= 0 && hour <= 0 && minute <= 0 && milliseconds > 0) {
    str += `1분 미만`;
  }

  return str;
};

/**
 * @description 소수점 정리 함수
 */

export const getDecimalPoint = (value: string, decimalNum = 1) => {
  // eslint-disable-next-line no-useless-escape
  const _value = value.replace(/[^0-9|^\.]/g, '');
  const parts = _value.toString().split('.');
  let result = '';

  if (parts[0] && parts[0].length > 5) {
    parts[0] = parts[0].toString().substring(0, 5);
  }
  if (parts[1] && parts[1].length > 1) {
    parts[1] = parts[1].toString().substring(0, decimalNum);
  }
  if (parts.length > 2) {
    result = parts[0] + (parts[1] || parts[1] === '' ? `.${parts[1]}` : '');
  } else {
    result = parts[0] + (parts[1] || parts[1] === '' ? `.${parts[1]}` : '');
  }
  return result;
};

/**
 * @description 작업자 나이 계산
 */
export const birthCalculator = (birth: string) => {
  const splitBirth = birth.split('-');
  const Years: number =
    Number(splitBirth[0]) >= 30
      ? Number(splitBirth[0])
      : Number(`20${splitBirth[0]}`);
  const Months: number = Number(splitBirth[1]);
  const Days: number = Number(splitBirth[2]);
  const today = new Date();
  const birthDate = new Date(Years, Months, Days); // 2000년 8월 10일
  const age = today.getFullYear() - birthDate.getFullYear() + 1;

  return age;
};

/**
 * @description 혈액형 그룹 변환
 */
export const TransBloodGroup = (bloodGroup: number) => {
  switch (bloodGroup) {
    case 0:
      return '-';
    case 1:
      return 'Rh+';
    case 2:
      return 'Rh-';
    default:
      return null;
  }
};

/**
 * @description 혈액형 변환
 */
export const TransBloodType = (bloodType: number) => {
  switch (bloodType) {
    case 0:
      return '-';
    case 1:
      return 'A';
    case 2:
      return 'B';
    case 3:
      return 'O';
    case 4:
      return 'AB';
    default:
      return null;
  }
};

/**
 * @description 새로고침
 */
export const refresher = (hour: number) => {
  // const _isNumber  =
  const count = hour * 60 * 60 * 1000; // milliesecond
  return setTimeout(() => {
    window.location.reload();
    // refresher();
  }, count); // 6시간마다
};

/**
 * @description 한글 입력 판단
 */
export const isKorean = (value: string) => {
  const regExp = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
  return regExp.test(value);
};

/**
 * @description 반올림
 */
export const mathRound = (number: number, point: number = 2) => {
  const _decimal = 10 * point;
  return Math.round((number + Number.EPSILON) * _decimal) / _decimal;
};

/**
 * @description getProcess
 */

export const getProcessCode = (code: number) => {
  switch (code) {
    case 1:
      return { name: '미착공', color: '#286e41' };
    case 2:
      return { name: '천공', color: '#7c3795' };
    case 3:
      return { name: '장약', color: '#636363' };
    case 4:
      return { name: '발파', color: '#971717' };
    case 5:
      return { name: '버력처리', color: '#375795' };
    case 6:
      return { name: '숏크리트', color: '#7c4c17' };
    case 7:
      return { name: '강지보', color: '#707017' };
    case 8:
      return { name: '격자지보', color: '#a1922b' };
    case 9:
      return { name: '록볼트', color: '#175c59' };
    case 10:
      return { name: '방수시트', color: '#1b2f54' };
    case 11:
      return { name: '라이닝', color: '#3c3a3a' };
    case 12:
      return { name: '근무교대', color: '#407d23' };
    case 13:
      return { name: '장비점검', color: '#4c7e7c' };
    case 14:
      return { name: '기타', color: '#351c3e' };
    case 15:
      return { name: '굴진중', color: '#ce3f3f' };
    default:
      return { name: null, color: '#ffffff' };
  }
};
