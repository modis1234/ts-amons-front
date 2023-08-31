import { VehicleType } from 'modules/vehicles';
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
import { splitByColonInput, zeroFill } from '../../../opwsUI/util';

const VehicleTableCmpt = styled.div`
  width: 100%;
  height: 1005;
`;

type VehicleTableType = {
  initForm: () => void;
  data: VehicleType[] | null;
  selectedRow: SelectedRowType;
  pageInfo: PageInfoType;
  onRowClick?: OnRowClickType;
  onDelete: OnDeleteType;
  setPageInfoHandler: ({ activePage, itemsPerPage }: PageInfoType) => void;
};

const VehicleTable = ({
  initForm,
  data,
  selectedRow,
  pageInfo,
  onRowClick,
  onDelete,
  setPageInfoHandler,
}: VehicleTableType) => {
  const [tableData, setTableData] = useState<TableDataType<VehicleType>>({
    header: [
      {
        id: 'no',
        name: 'NO',
        field: 'no',
        textAlign: 'center',
        width: 1,
      },
      {
        id: 'companyName',
        name: '소속사',
        field: 'co_name',
        width: 2,
        sorting: 'true',
      },
      {
        id: 'vhName',
        name: '차량 종류',
        field: 'vh_name',
        width: 2,
        sorting: 'true',
      },
      {
        id: 'vhNumber',
        name: '차량 번호',
        field: 'vh_number',
        width: 3,
      },
      {
        id: 'beaconAddress',
        name: '비콘 사용 정보',
        field: 'bc_address',
        width: 3,
        textAlign: 'center',
        sorting: 'true',
        callback: (item: VehicleType) => {
          if (item.bc_index) {
            return `${
              item.bc_management ? zeroFill(item.bc_management, 3) : '000'
            } - ${item.bc_address ? splitByColonInput(item.bc_address) : ''}`;
          } else {
            return '미할당';
          }
        },
      },
      {
        id: 'description',
        name: '비고',
        field: 'vh_description',
        textAlign: 'center',
        width: 4,
      },
    ],
    body: null,
  });
  const [tableOption, setTableOption] = useState<TableOptionType>({
    deleteAction: true, // delete Icon 표출 및 delete 액션 실행 field 생성
    // deleteKeys: 'te_id', // delete ActionKey
    // deleteHandler: onDelete, // delete ActionHandler
    pageNation: true, // pagination 기능 여부
    rowSelect: true, // row 선택 액션 여부
    // newSorting: true,
  });

  useEffect(() => {}, []);

  useEffect(() => {
    setTableData({
      ...tableData,
      body: data,
    });
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
    <VehicleTableCmpt>
      {tableData.body && (
        <TableElement
          tableData={tableData}
          tableOption={tableOption}
          pageInfo={pageInfo}
          onPageChange={onPageChange}
          onRowClick={onRowClick}
          activeDelete={{
            keys: 'vh_id', // delete ActionKey
            callback: onDelete, // delete ActionHandler
          }}
          activeRow={{
            keys: 'vh_index',
            index: selectedRow.selectedId,
          }}
        />
      )}
    </VehicleTableCmpt>
  );
};

export default VehicleTable;
