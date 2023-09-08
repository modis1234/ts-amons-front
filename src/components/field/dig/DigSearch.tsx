import { DigSearchDataType } from 'modules/digs';
import { LocalsOptionType } from 'modules/locals';
import FormElement from 'opwsUI/form/FormElement';
import React from 'react';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import styled from 'styled-components';

const DigSearchCmpt = styled.div`
  width: 100%;
  height: 100%;
  .table-search-menu {
    border: 0px;
    .search-dropdown-menu {
      width: 303px;
      .dropdown-component {
        width: inherit;
        &.active {
          border: 1px solid var(--company-identity-color, #0000ff);
        }
        &:focus {
          border: 1px solid var(--company-identity-color, #0000ff);
        }
        .dropdown.selection {
          width: 100%;
          background-color: #f2f2f2;
        }
        .divider.divider.text {
          font-size: 13px;
          font-family: NotoSansCJKkr-Regular;
        }
        .icon {
          font-size: 20px;
          padding-top: 7px;
          right: 5%;
        }
        .menu.transition {
          font-family: NotoSansCJKkr-Regular;
          border: 1px solid var(--company-identity-color, #0000ff);
        }
      }
    }
  }
`;

type DigSearchType = {
  searchData: DigSearchDataType;
  onSearchChange: ({
    e,
    option,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    option?: any;
  }) => void;
  onSearchAction: () => void;
  onSearchRefresh: () => void;
  localsOptions?: LocalsOptionType[] | DropdownItemProps[] | undefined;
};

const DigSearch = ({
  searchData,
  onSearchChange,
  onSearchAction,
  onSearchRefresh,
  ...rest
}: DigSearchType) => {
  return (
    <DigSearchCmpt>
      <div className="search-panel">
        <div className="table-search-menu">
          <div className="search-dropdown-menu">
            <FormElement
              kind="select"
              id="local_index"
              name="local_index"
              className="dropdown-component search-type"
              options={
                [
                  { key: 0, text: '전체', value: null },
                  ...(rest?.localsOptions ?? []),
                ] ?? []
              }
              value={searchData?.local_index ?? null}
              placeholder="노선 전체"
              onChange={(e, option) => onSearchChange({ e, option })}
              search
            />
          </div>
        </div>
      </div>
    </DigSearchCmpt>
  );
};

export default DigSearch;
