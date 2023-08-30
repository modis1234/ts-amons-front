import _ from "lodash";
import { CompanyType } from "modules/companies";
import moment from "moment";
import {
  OnDeleteType,
  OnRowClickType,
  PageInfoType,
  SelectedRowType,
  TableDataType,
  TableOptionType,
} from "opwsUI/table/types";
import React, { useCallback, useEffect, useState } from "react";
import { PaginationProps } from "semantic-ui-react";
import styled from "styled-components";
import TableElement from "../../../opwsUI/table/TableElement";

const CompanyTableCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

type CompanyTableType = {
  initForm: () => void;
  data: CompanyType[] | null;
  selectedRow: SelectedRowType;
  pageInfo: PageInfoType;
  onRowClick?: OnRowClickType;
  onDelete: OnDeleteType;
  setPageInfoHandler: ({ activePage, itemsPerPage }: PageInfoType) => void;
};

const CompanyTable = ({
  initForm,
  data,
  selectedRow,
  pageInfo,
  onRowClick,
  onDelete,
  setPageInfoHandler,
}: CompanyTableType) => {
  const [tableData, setTableData] = useState<TableDataType<CompanyType>>({
    header: [
      {
        id: "no",
        name: "NO",
        field: "no",
        textAlign: "center",
        width: 1,
      },
      {
        id: "company",
        name: "소속사",
        field: "co_name",
        width: 3,
      },
      {
        id: "sector",
        name: "업종",
        field: "co_sectors",
        textAlign: "center",
        width: 3,
      },
      {
        id: "description",
        name: "비고",
        field: "co_description",
        textAlign: "center",
        width: 8,
      },
    ],
    body: null,
  });

  const [tableOption, setTableOption] = useState<TableOptionType>({
    deleteAction: true, // delete Icon 표출 및 delete 액션 실행 field 생성
    // deleteKeys: 'co_id', // delete ActionKey
    // deleteHandler: onDelete, // delete ActionHandler
    pageNation: true, // pagination 기능 여부
    rowSelect: true, // row 선택 액션 여부
  });

  useEffect(() => {
    if (data) {
      const sortData = _.sortBy(data, "co_id").reverse();

      setTableData({
        ...tableData,
        body: sortData.filter((item) => item.co_main !== 0 && item),
      });
    }
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
    <CompanyTableCmpt>
      {tableData.body && (
        <TableElement
          tableData={tableData}
          tableOption={tableOption}
          pageInfo={pageInfo}
          onPageChange={onPageChange}
          onRowClick={onRowClick}
          activeDelete={{
            keys: "co_id", // delete ActionKey
            callback: onDelete, // delete ActionHandler
          }}
          activeRow={{
            keys: "co_id",
            index: selectedRow.selectedId,
          }}
        />
      )}
    </CompanyTableCmpt>
  );
};

export default CompanyTable;
