import _ from 'lodash';
import { DigType } from 'modules/digs';
import { SiteType } from 'modules/sites';
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
import {
  addComma,
  getLocalType,
  getTunnelName,
  percentBind,
} from '../../../opwsUI/util';

const DaysDigTableCmpt = styled.div`
  width: 100%;
  height: 100%;
  .color-text {
    color: #cf3f3f;
  }
`;

type DaysDigTableType = {
  initForm: () => void;
  data: DigType[] | null;
  selectedRow: SelectedRowType;
  pageInfo: PageInfoType;
  onRowClick?: OnRowClickType;
  onDelete: OnDeleteType;
  setPageInfoHandler: ({ activePage, itemsPerPage }: PageInfoType) => void;
  siteItem: SiteType;
};

const DaysDigTable = ({
  initForm,
  data,
  selectedRow,
  pageInfo,
  onRowClick,
  onDelete,
  setPageInfoHandler,
  siteItem,
}: DaysDigTableType) => {
  const [tableData, setTableData] = useState<TableDataType<DigType>>({
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
        name: '터널',
        field: 'local_area',
        textAlign: 'center',
        width: 1,
        sorting: true,
        callback: (item: DigType) => {
          const { local_area } = item;
          return getTunnelName(local_area);
        },
      },
      {
        id: 'name',
        name: '노선',
        field: 'local_name',
        width: 2,
        sorting: true,
        callback: (item: DigType) => {
          const { local_type, local_name } = item;
          return `${local_name} ${getLocalType(local_type)}`;
        },
      },

      {
        id: 'localPlanLength',
        name: '계획연장',
        field: 'local_plan_length',
        textAlign: 'center',
        width: 1,
        callback: (item) => {
          return item?.local_plan_length
            ? `${addComma(item.local_plan_length)}m`
            : '0m';
        },
      },
      {
        id: 'recordDate',
        name: '입력일',
        field: 'record_date',
        textAlign: 'center',
        width: 2,
        callback: (item: DigType) => {
          return item?.record_date
            ? moment(item?.record_date).format('YYYY-MM-DD')
            : null;
        },
      },
      {
        id: 'dig_length',
        name: '일일 굴진량',
        field: 'local_plan_length',
        textAlign: 'center',
        width: 1,
        callback: (item) => {
          return (
            <span className="color-text">
              {item?.dig_length ? `${addComma(item.dig_length)}m` : '0m'}
            </span>
          );
        },
      },
      {
        id: 'accLength',
        name: '누적 굴진량',
        field: 'acc_length',
        textAlign: 'center',
        width: 1,
        callback: (item) => {
          return (
            <span className="color-text">
              {item?.acc_length ? `${addComma(item.acc_length)}m` : '0m'}
            </span>
          );
        },
      },
      // {
      //   id: 'digRate',
      //   name: '누적 굴진량',
      //   field: 'local_plan_length',
      //   textAlign: 'center',
      //   width: 1,
      //   callback: (item) => {
      //     return (
      //       <span className="color-text">
      //         {item?.dig_length && item?.dig_length !== 0
      //           ? `${percentBind(item.dig_length, item.local_plan_length)}%`
      //           : '0%'}
      //       </span>
      //     );
      //     //   return '0m';
      //   },
      // },
      {
        id: 'description',
        name: '비고',
        field: 'dig_description',
        textAlign: 'center',
        width: 4,
      },
    ],
    body: null,
  });

  const [tableOption, setTableOption] = useState<TableOptionType>({
    deleteAction: true, // delete Icon 표출 및 delete 액션 실행 field 생성
    pageNation: true, // pagination 기능 여부
    rowSelect: true, // row 선택 액션 여부
    newSorting: false, // 새등록 된 아이템 재정렬 막기
  });

  useEffect(() => {
    if (data) {
      /**@description 구간 사용 여부 반영 */

      const _sortData = _.sortBy(data, 'record_date').reverse();

      /**@description 구간 사용 여부 반영 */
      const filterItems = tableData?.header?.filter(
        (item) => item?.id !== 'localArea',
      );

      setTableData({
        ...tableData,
        header: siteItem?.area_action === 0 ? filterItems : tableData?.header,
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
    <DaysDigTableCmpt>
      {tableData.body && (
        <TableElement
          tableData={tableData}
          tableOption={tableOption}
          pageInfo={pageInfo}
          onPageChange={onPageChange}
          onRowClick={onRowClick}
          activeDelete={{
            keys: 'dig_seq', // delete ActionKey
            callback: onDelete, // delete ActionHandler
          }}
          activeRow={{
            keys: 'dig_seq',
            index: selectedRow.selectedId,
          }}
        />
      )}
    </DaysDigTableCmpt>
  );
};

export default DaysDigTable;
