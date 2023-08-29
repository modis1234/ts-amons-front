// @ts-nocheck

import { SelectedRowType } from "containers/field/LocalContainer";
import _ from "lodash";
import { LocalType } from "modules/locals";
import { SiteType } from "modules/sites";
import moment from "moment";
import "moment/locale/pt-br";
import {
  OnDeleteType,
  OnRowClickType,
  PageInfoType,
  TableDataType,
} from "opwsUI/table/types";
import React, { useCallback, useEffect, useState } from "react";
import { PaginationProps } from "semantic-ui-react";
import styled from "styled-components";
import TableElement, {
  TableOptionType,
} from "../../../opwsUI/table/TableElement";
import { addComma, getLocalType, getTunnelName } from "../../../opwsUI/util";

const LocalTableCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

type LocalTableType = {
  initForm: () => void;
  data: LocalType[] | null;
  selectedRow: SelectedRowType;
  pageInfo: PageInfoType;
  onRowClick?: OnRowClickType;
  onDelete: OnDeleteType;
  setPageInfoHandler: ({ activePage, itemsPerPage }: PageInfoType) => void;
  siteItem: SiteType;
};

function LocalTable({
  initForm,
  data,
  selectedRow,
  pageInfo,
  onRowClick,
  onDelete,
  setPageInfoHandler,
  siteItem,
}: LocalTableType) {
  const [tableData, setTableData] = useState<TableDataType<LocalType>>({
    header: [
      {
        id: "no",
        name: "NO",
        field: "no",
        textAlign: "center",
        width: 1,
      },
      {
        id: "localArea",
        name: "터널",
        field: "local_area",
        textAlign: "center",
        width: 1,
        sorting: "true",
        callback: (item: LocalType): void => {
          return item?.local_area ? getTunnelName(item.local_area) : null;
        },
      },
      {
        id: "name",
        name: "노선",
        field: "local_name",
        textAlign: "center",
        width: 2,
        // callback: localNameBinding,
      },
      {
        id: "type",
        name: "굴진방향",
        field: "local_type",
        textAlign: "center",
        width: 2,
        sorting: "true",
        callback: (item: LocalType): void => {
          return getLocalType(item.local_type);
        },
      },
      {
        id: "plan_length",
        name: "계획연장",
        field: "local_plan_length",
        textAlign: "center",
        width: 1,
        callback: (item: LocalType): void => {
          return item?.local_plan_length
            ? `${addComma(item.local_plan_length)}m`
            : "0m";
        },
      },
      {
        id: "created_date",
        name: "등록일",
        field: "created_date",
        textAlign: "center",
        width: 2,
        callback: (item: LocalType): void => {
          return moment(new Date(item.created_date)).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      {
        id: "modified_date",
        name: "수정일",
        field: "modified_date",
        textAlign: "center",
        width: 2,
        callback: (item: LocalType): void => {
          return moment(new Date(item.modified_date)).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        },
      },
      {
        id: "description",
        name: "비고",
        field: "local_description",
        textAlign: "center",
        width: 4,
      },
    ],
    body: [],
  });

  const [tableOption, setTableOption] = useState<TableOptionType>({
    deleteAction: true, // delete Icon 표출 및 delete 액션 실행 field 생성
    pageNation: true, // pagination 기능 여부
    rowSelect: true, // row 선택 액션 여부
  });

  useEffect(() => {
    const _sortData =
      siteItem?.area_action === 1
        ? _.sortBy(data, "local_area")
        : _.sortBy(data, "local_id").reverse();

    /**@description 구간 사용 여부 반영 */
    const filterItems = tableData?.header?.filter(
      (item) => item?.id !== "localArea"
    );

    setTableData({
      ...tableData,
      header: siteItem?.area_action === 0 ? filterItems : tableData?.header,
      body: _sortData,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onPageChange = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      data: PaginationProps
    ): void => {
      e.preventDefault();
      const activePage: string | number | undefined = data.activePage;
      if (typeof activePage === "number") {
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
    [pageInfo]
  );

  return (
    <LocalTableCmpt>
      {tableData.body && (
        <TableElement
          tableData={tableData}
          tableOption={tableOption}
          pageInfo={pageInfo}
          onPageChange={onPageChange}
          onRowClick={onRowClick}
          activeDelete={{
            keys: "local_id", // delete ActionKey
            callback: onDelete, // delete ActionHandler
          }}
          activeRow={{
            keys: "local_id",
            index: selectedRow.selectedId,
          }}
        />
      )}
    </LocalTableCmpt>
  );
}

export default LocalTable;
