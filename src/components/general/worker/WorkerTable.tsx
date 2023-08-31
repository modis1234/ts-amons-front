import _ from "lodash";
import { WorkerType } from "modules/workers";
import {
  OnDeleteType,
  OnRowClickType,
  PageInfoType,
  SelectedRowType,
  TableDataType,
  TableOptionType,
} from "opwsUI/table/types";
import React, { useCallback, useEffect, useState } from "react";
import { Checkbox, PaginationProps } from "semantic-ui-react";
import styled from "styled-components";
import TableElement from "../../../opwsUI/table/TableElement";
import {
  splitByColonInput,
  TransBloodGroup,
  TransBloodType,
  zeroFill,
} from "../../../opwsUI/util";

const WorkerTableCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

type WorkerTableType = {
  initForm: () => void;
  data: WorkerType[] | null;
  selectedRow: SelectedRowType;
  pageInfo: PageInfoType;
  onRowClick?: OnRowClickType;
  onDelete: OnDeleteType;
  setPageInfoHandler: ({ activePage, itemsPerPage }: PageInfoType) => void;
};

const WorkerTable = ({
  initForm,
  data,
  selectedRow,
  pageInfo,
  onRowClick,
  onDelete,
  setPageInfoHandler,
}: WorkerTableType) => {
  const [tableData, setTableData] = useState<TableDataType<WorkerType>>({
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
        width: 2,
        sorting: "true",
      },
      {
        id: "name",
        name: "이름",
        field: "wk_name",
        width: 2,
      },
      {
        id: "position",
        name: "직위",
        field: "wk_position",
        width: 2,
        textAlign: "center",
        sorting: "true",
      },
      {
        id: "sms",
        name: "SMS",
        field: "wk_sms_yn",
        width: 1,
        textAlign: "center",
        callback: (item: WorkerType) => {
          const _smsYN = item.wk_sms_yn;

          return (
            <Checkbox
              className="sms-check"
              checked={_smsYN === 1 ? true : false}
              disabled={false}
            />
          );
        },
      },
      {
        id: "age",
        name: "나이",
        field: "wk_birth",
        width: 1,
        textAlign: "center",
        callback: (item: WorkerType) => {
          const birth = item?.wk_birth ?? null;
          if (!birth) return null;
          const today = new Date();
          const currentYear = today.getFullYear();
          const diffBirth = String(birth).substring(0, 4);
          const age = currentYear - Number(diffBirth) + 1;
          return age;
        },
      },
      {
        id: "blood",
        name: "혈액형",
        field: "wk_blood_type",
        width: 3,
        textAlign: "center",
        callback: (item: WorkerType) => {
          const { wk_blood_type, wk_blood_group } = item;

          return `${TransBloodType(wk_blood_type)} ${TransBloodGroup(
            wk_blood_group
          )}`;
        },
      },
      {
        id: "nation",
        name: "국적",
        field: "wk_nation",
        width: 2,
      },
      {
        id: "beacon",
        name: "비콘 사용 정보",
        field: "bc_address",
        width: 2,
        textAlign: "center",
        sorting: "true",
        callback: (item: WorkerType) => {
          if (item.bc_index) {
            return `${
              item.bc_management ? zeroFill(item.bc_management, 3) : "000"
            } - ${item?.bc_address ? splitByColonInput(item.bc_address) : ""}`;
          } else {
            return "미할당";
          }
        },
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
    newSorting: false,
  });

  useEffect(() => {
    const sortData = _.sortBy(data, "wk_id").reverse();

    setTableData({
      ...tableData,
      body: sortData,
    });
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
    <WorkerTableCmpt>
      {tableData.body && (
        <TableElement
          tableData={tableData}
          tableOption={tableOption}
          pageInfo={pageInfo}
          onPageChange={onPageChange}
          onRowClick={onRowClick}
          activeDelete={{
            keys: "wk_id", // delete ActionKey
            callback: onDelete, // delete ActionHandler
          }}
          activeRow={{
            keys: "wk_index",
            index: selectedRow.selectedId,
          }}
        />
      )}
    </WorkerTableCmpt>
  );
};

export default WorkerTable;
