import { processColor } from 'containers/field/ProcessContainer';
import _ from 'lodash';
import { ProcessType } from 'modules/processes';
import moment from 'moment';
import {
  OnDeleteType,
  OnRowClickType,
  PageInfoType,
  SelectedRowType,
  TableDataType,
  TableOptionType,
} from 'opwsUI/table/types';
import React, { useCallback, useEffect, useState } from 'react';
import { PaginationProps } from 'semantic-ui-react';
import styled from 'styled-components';
import TableElement from '../../../opwsUI/table/TableElement';
import { getLocalType, getTunnelName } from '../../../opwsUI/util';

const ProcessTableCmpt = styled.div`
  width: 100%;
  height: 100%;
  .body-row {
    position: relative;
    td.table-body-cell.pcs_curr_state {
      /* background-color: #f00; */
      /* position: relative; */
      &::after {
        width: 20px;
        height: 20px;
        content: '';
        transform: translateX(-50%) translateY(-50%) rotate(45deg);
        position: absolute;
        top: 52%;
        left: 60.45%;
        background-color: #fff;
        border-top: 1px solid #d8d8d8;
        border-right: 1px solid #d8d8d8;
      }
    }
  }
`;

type ProcessTableType = {
  initForm: () => void;
  data: ProcessType[] | null;
  selectedRow: SelectedRowType;
  pageInfo: PageInfoType;
  setPageInfoHandler: ({ activePage, itemsPerPage }: PageInfoType) => void;
  // onRowClick?: OnRowClickType;
  // onDelete: OnDeleteType;
};

const ProcessTable = ({
  initForm,
  data,
  selectedRow,
  pageInfo,
  setPageInfoHandler,
  // onRowClick,
  // onDelete,
  ...rest
}: ProcessTableType) => {
  const processBinding = (code: number | null): string | null => {
    return code ? processColor[code].text : null;
  };

  const [tableData, setTableData] = useState<TableDataType<ProcessType>>({
    header: [
      {
        id: 'no',
        name: 'NO',
        field: 'no',
        textAlign: 'center',
        width: 1,
      },
      {
        id: 'localArea',
        name: '구간',
        field: 'local_area',
        textAlign: 'center',
        width: 1,
        sorting: true,
        callback: (item: ProcessType) => {
          const { local_area } = item;
          return getTunnelName(local_area);
        },
      },
      {
        id: 'location',
        name: '노선',
        field: 'local_name',
        textAlign: 'left',
        width: 3,
        sorting: true,
        callback: (item: ProcessType) => {
          const { local_type, local_area, local_name } = item;
          return `${local_name} ${getLocalType(local_type)}`;
        },
      },
      {
        id: 'prevent',
        name: '이전 공정상태',
        field: 'pcs_prev_state',
        textAlign: 'center',
        width: 1,
        callback: (item: ProcessType) => {
          const { pcs_prev_state } = item;
          return processBinding(pcs_prev_state);
        },
      },
      {
        id: 'current',
        name: '현재 공정상태',
        field: 'pcs_curr_state',
        textAlign: 'center',
        width: 1,
        callback: (item: ProcessType) => {
          const { pcs_curr_state } = item;
          return processBinding(pcs_curr_state);
        },
      },
      {
        id: 'createdDate',
        name: '등록일시',
        field: 'created_date',
        textAlign: 'center',
        width: 2,
        callback: (item: ProcessType) => {
          return item?.created_date
            ? moment(item?.created_date).format('YYYY-MM-DD')
            : null;
        },
        sorting: true,
      },
      {
        id: 'description',
        name: '비고',
        field: 'pcs_description',
        textAlign: 'center',
        width: 3,
      },
    ],
    body: [],
  });

  const [tableOption, setTableOption] = useState<TableOptionType>({
    deleteAction: false, // delete Icon 표출 및 delete 액션 실행 field 생성
    pageNation: true, // pagination 기능 여부
    rowSelect: false, // row 선택 액션 여부
    newSorting: false, // 새등록 된 아이템 재정렬 막기
  });

  useEffect(() => {
    if (data) {
      const _sortData = _.sortBy(data, 'pcs_seq').reverse();

      setTableData({
        ...tableData,
        body: _sortData,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onPageChange = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      data: PaginationProps,
    ): void => {
      e.preventDefault();
      const activePage: string | number | undefined = data.activePage;
      if (typeof activePage === 'number') {
        const _activePage = Math.ceil(activePage);
        const PreState = pageInfo;
        setPageInfoHandler({
          ...PreState,
          activePage: _activePage,
        });
      }
      // 활성화된 로우 초기화
      // initActiveRow();
      initForm();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pageInfo],
  );

  return (
    <ProcessTableCmpt>
      {tableData.body && (
        <TableElement
          tableData={tableData}
          tableOption={tableOption}
          pageInfo={pageInfo}
          onPageChange={onPageChange}
          // onRowClick={onRowClick}
          // activeDelete={{
          //   keys: 'pcs_seq', // delete ActionKey
          //   callback: onDelete, // delete ActionHandler
          // }}
          // activeRow={{
          //   keys: 'pcs_seq',
          //   index: selectedRow.selectedId,
          // }}
        />
      )}
    </ProcessTableCmpt>
  );
};

export default ProcessTable;
