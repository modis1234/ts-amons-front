import { BeaconSearchDataType } from 'modules/beacons';
import FormElement from 'opwsUI/form/FormElement';
import React from 'react';
import { Button, Dropdown, Icon, Input } from 'semantic-ui-react';
import styled from 'styled-components';

const BeaconSearchCmpt = styled.div`
  width: 100%;
  height: 100%;
  .search-panel {
    width: 100%;
    height: 100%;
    .table-search-menu {
      border: 0px;
      display: flex;
      .search-dropdown-menu {
        width: 196px;
        .dropdown-component {
          width: inherit;
          background-color: #f2f2f2 !important;
          border-top-right-radius: 0px;
          border-bottom-right-radius: 0px;
          border-right-width: 0.5px;
          margin-right: 0;
          &:focus {
            border: 1px solid var(--company-identity-color, #0000ff);
          }
          /* &:focus {
            border: 1px solid var(--company-identity-color, #0000ff);
          } */
          .dropdown.selection {
            width: 100%;
            background-color: #f2f2f2;
          }
          .divider.divider.text {
            font-size: 13px;
            font-family: NotoSansCJKkr-Regular;
            line-height: 1.2;
          }
          .icon {
            font-size: 20px;
            padding-top: 7px;
            right: 8%;
          }
          .menu.transition {
            font-family: NotoSansCJKkr-Regular;
            border: 1px solid var(--company-identity-color, #0000ff);
          }
        }
      }
      .search-input-menu {
        .input-component {
          border: 0px;
          font-family: NotoSansCJKkr-Regular;
          min-width: 24em;
          height: 40px;
          #input {
            border-radius: 0px;
            border-left-width: 0px;
            border-right-width: 0px;
            &:focus {
              border: 1px solid var(--company-identity-color, #0000ff);
            }
          }
          i.link.icon {
            &:hover {
              color: var(--company-identity-color, #0000ff) !important;
            }
          }
        }
        .refresh-button-component {
          margin: 0;
          /* box-shadow: 0 0 0 0 rgba(34, 36, 38, 0.15) inset; */
          color: #212121 !important;
          font-size: 15px;
          padding: 12.5px;
          border-radius: 0px 4px 4px 0px;
          transition: all 0.3s;
          &:hover {
            color: var(--company-identity-color, #0000ff) !important;
            background-color: #f5f5f5 !important;
          }
        }
      }
    }
  }
`;

type BeaconSearchType = {
  searchData: BeaconSearchDataType;
  onSearchChange: ({
    e,
    option,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    option?: any;
  }) => void;
  onSearchAction: () => void;
  onSearchRefresh: () => void;
};

const usedTypeOptions = [
  { key: '0', text: '사용정보', value: null },
  { key: '1', text: '인원', value: 1 },
  { key: '2', text: '차량', value: 2 },
  { key: '3', text: '비콘', value: 3 },
];

const BeaconSearch = ({
  searchData,
  onSearchChange,
  onSearchAction,
  onSearchRefresh,
}: BeaconSearchType) => {
  return (
    <BeaconSearchCmpt className="beacon-search-component">
      <div className="search-panel">
        <div className="table-search-menu">
          <div className="search-dropdown-menu">
            <FormElement
              kind="select"
              id="bc_used_type"
              name="bc_used_type"
              className="dropdown-component search-type"
              options={usedTypeOptions}
              value={searchData?.bc_used_type ?? null}
              placeholder="사용정보"
              onChange={(e, option) => onSearchChange({ e, option })}
              search
            />
          </div>
          <div className="search-input-menu">
            <Input
              id="input"
              className="input-component"
              name="name"
              value={searchData?.name ?? ''}
              icon={{ name: 'search', link: true, onClick: onSearchAction }}
              placeholder={
                searchData?.bc_used_type !== 3
                  ? '작업자 이름 또는 차량 종류를 입력해 주세요.'
                  : 'MAC 주소를 입력해 주세요.'
              }
              onChange={(e) => onSearchChange({ e })}
            />
            <Button
              className="refresh-button-component"
              basic
              icon
              onClick={onSearchRefresh}
            >
              <Icon name="redo" />
            </Button>
          </div>
        </div>
      </div>
    </BeaconSearchCmpt>
  );
};

export default BeaconSearch;
