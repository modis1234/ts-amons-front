import React from "react";
import styled from "styled-components";

const OneByOneCmpt = styled.div<{ rightHeader?: boolean | undefined }>`
  width: 100%;
  height: 100%;
  .search-header {
    width: 100%;
    height: 58px;
    /* background-color: antiquewhite; */
    padding: 18px 17px 18px 17px;
  }
  .table-body {
    width: 100%;
    height: ${(props) => (props.rightHeader ? "calc(100% - 58px)" : "100%")};
    /* padding-top: 22px; */
    padding-top: ${(props) => (props.rightHeader ? "10px" : "22px")};
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
`;

type OneByOneLayoutType = {
  tableRender: React.ReactElement;
  tableTitle: string;
  search: React.ReactElement; // search Box Component
  searchRender: React.ReactElement;
};

const OneByOneLayout = ({
  tableRender = <div>tableRender</div>,
  tableTitle,
  search, // search Box Component
  searchRender = <div>searchRender</div>,
}: OneByOneLayoutType) => {
  return (
    <OneByOneCmpt className="onebyone-component">
      {search && <div className="search-header">{searchRender}</div>}
      {/* {searchRender && <div className="search-header">{searchRender}</div>} */}
      <div className="table-body">
        <div className="table-title">{tableTitle}</div>
        <div className="table-contents">{tableRender}</div>
      </div>
    </OneByOneCmpt>
  );
};

export default OneByOneLayout;
