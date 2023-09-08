import _ from 'lodash';
import { BeaconType } from 'modules/beacons';
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
import { zeroFill } from '../../../opwsUI/util';

const BeaconTableCmpt = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: aqua; */
`;

type BeaconTableType = {
  initForm: () => void;
  data: BeaconType[] | null;
  selectedRow: SelectedRowType;
  pageInfo: PageInfoType;
  onRowClick?: OnRowClickType;
  onDelete: OnDeleteType;
  setPageInfoHandler: ({ activePage, itemsPerPage }: PageInfoType) => void;
};

const BeaconTable = ({
  initForm,
  data,
  selectedRow,
  pageInfo,
  onRowClick,
  onDelete,
  setPageInfoHandler,
}: BeaconTableType) => {
  const splitByColon = (item: BeaconType) => {
    const str = item?.bc_address ?? null;
    if (!str) return null;
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

  const dateBinding = (item: BeaconType) => {
    const { bc_battery_time } = item;

    const date = moment(bc_battery_time).format('YYYY-MM-DD HH:mm:ss');

    return date;
  };

  const usedNameBinding = (item: BeaconType) => {
    const { bc_used_type } = item;
    const _name = bc_used_type
      ? bc_used_type === 1
        ? item.wk_name
        : item.vh_name
      : '';
    return _name;
  };

  const [tableData, setTableData] = useState<TableDataType<BeaconType>>({
    header: [
      {
        id: 'no',
        name: 'NO',
        field: 'no',
        textAlign: 'center',
        width: 1,
      },
      {
        id: 'id',
        name: '관리번호',
        field: 'bc_management',
        textAlign: 'center',
        width: 1,
        callback: (item: BeaconType) => {
          const { bc_management } = item;
          return bc_management !== 0 && bc_management
            ? zeroFill(bc_management, 3)
            : '미지정';
        },
      },
      {
        id: 'address',
        name: 'MAC 주소',
        field: 'bc_address',
        width: 2,
        callback: splitByColon,
      },
      {
        id: 'used_type',
        name: '사용정보',
        field: 'bc_used_type',
        textAlign: 'center',
        width: 2,
        callback: usedNameBinding,
      },
      {
        id: 'battery_remain',
        name: '배터리사용량',
        field: 'bc_battery_remain',
        textAlign: 'center',
        width: 1,
      },
      {
        id: 'battery_time',
        name: '잔량 측정 시간',
        field: 'bc_battery_time',
        textAlign: 'center',
        width: 2,
        callback: dateBinding,
      },
      {
        id: 'description',
        name: '비고',
        field: 'bc_description',
        textAlign: 'center',
        width: 4,
      },
    ],
    body: [],
  });

  const [tableOption, setTableOption] = useState<TableOptionType>({
    deleteAction: true, // delete Icon 표출 및 delete 액션 실행 field 생성
    // deleteKeys: 'te_id', // delete ActionKey
    // deleteHandler: onDelete, // delete ActionHandler
    pageNation: true, // pagination 기능 여부
    rowSelect: true, // row 선택 액션 여부
    // pageInfo: {
    //   activePage: 1, // 현재 페이지
    //   itemsPerPage: 14, // 페이지 당 item 수
    // },
  });

  useEffect(() => {
    const _sortData = _.sortBy(data, 'bc_id').reverse();
    setTableData({
      ...tableData,
      body: _sortData,
    });

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
    <BeaconTableCmpt>
      {tableData.body && (
        <TableElement
          tableData={tableData}
          tableOption={tableOption}
          pageInfo={pageInfo}
          onPageChange={onPageChange}
          onRowClick={onRowClick}
          activeDelete={{
            keys: 'bc_id', // delete ActionKey
            callback: onDelete, // delete ActionHandler
          }}
          activeRow={{
            keys: 'bc_index',
            index: selectedRow.selectedId,
          }}
        />
      )}
    </BeaconTableCmpt>
  );
};

export default BeaconTable;
