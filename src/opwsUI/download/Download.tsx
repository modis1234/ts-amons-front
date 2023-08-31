import { faFileArrowDown } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React from 'react';
import { saveAs } from 'file-saver';
import styled from 'styled-components';

const DownloadCmpt = styled.div`
  /* width: 100%; */
  width: 110px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #d8d8d8;
  border-radius: 4px;
  font-family: NotoSansCJKkr-Regular;
  color: #2e2e2e;
  transition: all 0.3s;
  .button-name {
    font-size: 14px;
  }
  .button-icon {
    font-size: 15px;
  }
  &.disabled {
    opacity: 0.5;
  }
  &:not(.disabled) {
    &:hover {
      cursor: pointer;
      border: 1px solid #bebebe;
      /* background-color: #f2f2f2; */
      color: var(--company-identity-color, #0000ff);
    }
  }
`;
const API = `http://${process.env.REACT_APP_API_SERVER}`;
const TS_INDEX = process.env.REACT_APP_TS_INDEX;

/**
 * @descrition 다운로드 기능 액션 함수
 * @param  {String} url API 요청 주소
 * @param  {String} data 요청 조건 데이터
 * @param  {String} fileName 다운로드 파일명
 * */

type DownLoadActionType = {
  url: string;
  data: string;
  fileName: string;
};
export const downloadAction = async ({
  url,
  data,
  fileName,
}: DownLoadActionType) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${API}${url}`,
      responseType: 'blob',
      data: {
        data,
        ts_index: TS_INDEX,
      },
    }).then((response) => {
      saveAs(new Blob([response.data]), `${fileName}.xlsx`);
      return true;
    });
  } catch (e) {
    return false;
  }
};

/**
 * @descrition download버튼 컴포넌트
 * @param  {Function} onDownload click 이벤트
 * */

type DownLoadType = {
  onDownload: () => void;
  disabled: boolean;
};

export const Download = ({ onDownload, disabled }: DownLoadType) => {
  return (
    <DownloadCmpt
      className={`download-button ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onDownload}
    >
      <span className="button-name">다운로드</span>
      <span className="button-icon">
        <FontAwesomeIcon icon={faFileArrowDown} />
      </span>
    </DownloadCmpt>
  );
};
