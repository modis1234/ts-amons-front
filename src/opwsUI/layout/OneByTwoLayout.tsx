import React, { useEffect } from 'react';
import styled from 'styled-components';

const OneByTwoCmpt = styled.div<{ rightHeader: boolean | undefined }>`
  width: 100%;
  height: 100%;
  display: flex;
  .left_box {
    width: 368px;
    height: 100%;
    border: 1px solid #c5c9cf;
    padding-top: 24px;
    padding-left: 22px;
    padding-right: 22px;
    padding-bottom: 18px;
    background-color: #ffffff;

    .left-header {
      width: 100%;
      height: 24px;
      font-family: NotoSansCJKkr-Medium;
      font-size: 16px;
      color: #7c7c7c;
      display: flex;
      align-items: center;
    }
    .left-body {
      width: 100%;
      height: calc(100% - 24px);
      padding-top: 29px;
    }

    // semantic-ui css 적용
    /* .ui.form input {
            font-family: 'NotoSansCJKkr-Regular';
        }
        .ui.input > input {
            &:focus {
                border-color: var(
                    --company-identity-color,
                    #0000ff
                ) !important;
            }
        }
        .ui.form input {
            border-radius: 4px;
            &:focus {
                border-color: var(
                    --company-identity-color,
                    #0000ff
                ) !important;
            }
        }
        .ui.selection.active.dropdown .menu {
            border-color: var(--company-identity-color, #0000ff) !important;
        }
        .ui.form textarea {
            &:focus {
                border-color: var(
                    --company-identity-color,
                    #0000ff
                ) !important;
            }
        }
        .submit-button {
            width: 100%;
            height: 50px;
            font-weight: 400;
            font-family: NotoSansCJKkr-Medium !important;
            font-size: 18px;
            background-color: var(--company-identity-color, #0000ff);
            border: 1px solid #d8d8d8;
            opacity: 1;
            letter-spacing: 0px;
            color: #ffffff;
            opacity: 1;
            &:hover {
                background-color: #7c7c7c;
            }
        } */
  }
  .right_box {
    width: calc(100% - 388px);
    height: 100%;
    border: 1px solid #c5c9cf;
    /* padding: 18px; */
    margin-left: 20px;
    background-color: #ffffff;
    .right-header {
      width: 100%;
      height: 58px;
      /* background-color: antiquewhite; */
      padding: 18px 17px 18px 17px;
    }
    .right-body {
      width: 100%;
      height: ${(props) => (props.rightHeader ? 'calc(100% - 58px)' : '100%')};
      /* padding-top: 22px; */
      padding-top: ${(props) => (props.rightHeader ? '10px' : '22px')};
      padding-left: 17px;
      padding-right: 17px;
      padding-bottom: 18px;
      .table-title {
        width: 100%;
        height: 24px;
        font-family: NotoSansCJKkr-Medium;
        color: #7c7c7c;
        font-size: 16px;
        letter-spacing: 0.8px;
        @media screen and (min-height: 970px) {
          margin-bottom: 25px;
        }
      }
      .table-contents {
        width: 100%;
        height: calc(100% - 24px);
        padding-top: 5px;
      }
    }
  }
`;

type OneByTwoLayoutType = {
  inputTitle: string; // Input Box Title
  tableTitle: string; // Table Box Title
  firstRender: React.ReactNode; // Input Box Component
  secondRender: React.ReactNode; // Table Box Component
  rightHeader: boolean; // search Box Component
  searchRender?: React.ReactNode; // Table Box Component
};

const OneByTwoLayout = ({
  inputTitle = '', // Input Box Title
  tableTitle = '', // Table Box Title
  firstRender = <div>Left_Box</div>, // Input Box Component
  secondRender = <div>Right_Box</div>, // Table Box Component
  rightHeader = true, // search Box Component
  searchRender = <div>Search_Box</div>, // Table Box Component
}: OneByTwoLayoutType) => {
  return (
    <OneByTwoCmpt rightHeader={rightHeader}>
      <div className="left_box">
        <div className="left-header title-header">{inputTitle}</div>
        <div className="left-body form-body">{firstRender}</div>
      </div>
      <div className="right_box">
        {rightHeader && (
          <div className="right-header search-header">{searchRender}</div>
        )}
        <div className="right-body table-body">
          <div className="table-title">{tableTitle}</div>
          <div className="table-contents">{secondRender}</div>
        </div>
      </div>
    </OneByTwoCmpt>
  );
};

export default React.memo(OneByTwoLayout);
