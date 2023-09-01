import { AnnounceType } from 'modules/announces';
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

const AnnounceTableCmpt = styled.div`
  width: 100%;
  height: 100%;
  table {
    height: 100%;
  }
`;

type AnnounceTableType = {
  initForm: () => void;
  data: AnnounceType[] | null;
  selectedRow: SelectedRowType;
  pageInfo: PageInfoType;
  onRowClick?: OnRowClickType;
  onDelete: OnDeleteType;
  setPageInfoHandler: ({ activePage, itemsPerPage }: PageInfoType) => void;
};

const AnnounceTable = ({
  initForm,
  data,
  selectedRow,
  pageInfo,
  onRowClick,
  onDelete,
  setPageInfoHandler,
}: AnnounceTableType) => {
  const [tableData, setTableData] = useState<TableDataType<AnnounceType>>({
    header: [
      {
        id: 'no',
        name: 'NO',
        field: 'no',
        textAlign: 'center',
        width: 1,
        // modified_date 키를 대신하는 key 값 modified_date 키 속성이 없으면 '새등록' 텍스트 생성 된다.
        key: 'update_date',
      },
      {
        id: 'title',
        name: '제목',
        field: 'ann_title',
        width: 4,
        sorting: 'true',
        // textAlign: 'center',
      },
      {
        id: 'contents',
        name: '내용',
        field: 'ann_contents',
        width: 4,
      },
      {
        id: 'preview',
        name: '게시 여부',
        field: 'ann_preview',
        textAlign: 'center',
        width: 1,
        callback: (item: AnnounceType) => {
          return item.ann_preview === 1 ? '사용' : '미사용';
        },
      },
      {
        id: 'recordDate',
        name: '작성일',
        field: 'record_date',
        textAlign: 'center',
        width: 2,
        callback: (item: AnnounceType) => {
          return moment(item.record_date).format('YYYY-MM-DD');
        },
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
    <AnnounceTableCmpt>
      <TableElement
        tableData={tableData}
        tableOption={tableOption}
        pageInfo={pageInfo}
        onPageChange={onPageChange}
        onRowClick={onRowClick}
        activeDelete={{
          keys: 'ann_id', // delete ActionKey
          callback: onDelete, // delete ActionHandler
        }}
        activeRow={{
          keys: 'ann_id',
          index: selectedRow.selectedId,
        }}
      />
    </AnnounceTableCmpt>
  );
};

export default AnnounceTable;
