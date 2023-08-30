import { OptionsType } from "containers/general/WorkerContainer";
import { WorkerErrorType, WorkerSearchDataType } from "modules/workers";
import FormElement from "opwsUI/form/FormElement";
import React from "react";
import {
  Button,
  Dropdown,
  DropdownItemProps,
  Icon,
  Input,
  Menu,
} from "semantic-ui-react";
import styled from "styled-components";

const WorkerSearchCmpt = styled.div`
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
          border-right-width: 0.5px;
          margin-right: 0;
          &.search-type {
            margin-right: 5px;
          }
          &.dropdown-company {
            border-radius: 0px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            .divider {
              width: 98px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }

          &:focus {
            border: 1px solid var(--company-identity-color, #0000ff);
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
          min-width: 20em;
          height: 41px;
          &.input-worker-name {
            input {
              border-radius: 0px;
              border-left-width: 0px;
              border-right-width: 0px;
            }
          }
          &.input-beacon-address {
            border-left: 0.5px;
            input {
              border-right-width: 0px;
              border-top-right-radius: 0px;
              border-bottom-right-radius: 0px;
            }
            &.error {
              &::before {
                content: "영문 또는 숫자만 입력하세요.";
                position: absolute;
                top: 40px;
                font-size: 13px;
                color: #ff0000;
              }
            }
          }
          input {
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
          padding: 13px;
          border-radius: 0px 4px 4px 0px;
          &:hover {
            color: var(--company-identity-color, #0000ff) !important;
            background-color: #f2f2f2 !important;
          }
        }
      }
    }
  }
`;

type WorkerSearchType = {
  searchData: WorkerSearchDataType;
  onSearchChange: ({
    e,
    option,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    option?: any;
  }) => void;
  onSearchAction: () => void;
  onSearchRefresh: () => void;
  error: WorkerErrorType;
  companyOptions?: OptionsType[] | DropdownItemProps[] | undefined;
};

const WorkerSearch = ({
  searchData,
  onSearchChange,
  onSearchAction,
  onSearchRefresh,
  error,
  companyOptions,
  ...rest
}: WorkerSearchType) => {
  return (
    <WorkerSearchCmpt>
      <div className="search-panel">
        <div className="table-search-menu">
          <div className="search-dropdown-menu">
            <FormElement
              kind="select"
              // label="소속사"
              id="wk_search"
              name="wk_search"
              className="dropdown-component search-type"
              options={[
                { key: 1, text: "작업자", value: true },
                { key: 2, text: "비콘", value: false },
              ]}
              value={searchData.co_id ?? 0}
              onChange={(e, option) => onSearchChange({ e, option })}
              placeholder="작업자"
              search
            />
          </div>
          {searchData.wk_search ? (
            <>
              <div className="search-dropdown-menu">
                <FormElement
                  kind="select"
                  // label="소속사"
                  id="co_id"
                  name="co_id"
                  className="dropdown-component dropdown-company"
                  options={companyOptions ?? []}
                  value={searchData.co_id ?? 0}
                  onChange={(e, option) => onSearchChange({ e, option })}
                  error={
                    error?.co_id && {
                      content: error.co_id,
                    }
                  }
                  placeholder="소속사를 선택해 주세요."
                  required
                  search
                />
              </div>
              <div className="search-input-menu">
                <Input
                  className="input-component input-worker-name"
                  id="wk_name"
                  name="wk_name"
                  value={searchData?.wk_name ?? ""}
                  icon={{
                    name: "search",
                    link: true,
                    onClick: onSearchAction,
                  }}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === "Enter") onSearchAction();
                  }}
                  placeholder="작업자 이름을 입력해 주세요."
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
            </>
          ) : (
            <div className="search-input-menu">
              <Input
                className="input-component input-beacon-address"
                id="bc_address"
                name="bc_address"
                value={searchData?.bc_address ?? ""}
                icon={{ name: "search", link: true, onClick: onSearchAction }}
                placeholder="비콘정보를 입력해 주세요."
                onChange={(e) => onSearchChange({ e })}
                onKeyPress={(e: React.KeyboardEvent<HTMLImageElement>) => {
                  if (e.key === "Enter") onSearchAction();
                }}
                error={error?.bc_address ? true : false}
                maxLength={12}
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
          )}
        </div>
      </div>
    </WorkerSearchCmpt>
  );
};

export default WorkerSearch;
