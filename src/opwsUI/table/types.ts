import { PaginationProps } from "semantic-ui-react";

export type GroupType = {
  id?: string;
  name?: string;
  field: string;
  textAlign?: "center" | "left" | "right";
  sorting?: string | boolean;
  width?: number;
  rowSpan?: number | string;
  colSpan?: number | string;
  key: string;
  callback?: (param?: string | number) => string;
};

export type HeaderType = {
  key?: string | number | undefined;
  id?: string;
  name?: string;
  field: string;
  textAlign?: "center" | "left" | "right";
  width?: number;
  sorting?: string | boolean;
  callback?: (param?: string | number) => string | null;
};

export type TableOptionType = {
  deleteAction: boolean; // delete Icon 표출 및 delete 액션 실행 field 생성
  pageNation?: boolean; // pagination 기능 여부
  rowSelect?: boolean; // row 선택 액션 여부
  newSorting?: boolean; // 새등록 된 아이템 재정렬 막기
  kickoutAction?: boolean; // kickout Button 표출 및 kickout 액션 실행 field 생성
};

export type TableDataType<T = any> = {
  group?: Array<GroupType>;
  header: Array<HeaderType>;
  body: Array<T> | [] | null;
};

export type PageInfoType = {
  activePage: number; // 현재 페이지
  itemsPerPage: number; // 페이지 당 item 수
};

export type OnRowClickType = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  item?: any
) => void;

export type OnDeleteType = (
  e: React.MouseEvent<SVGSVGElement, MouseEvent>,
  item?: any
) => void;

export type TableElementType = {
  tableData: TableDataType;
  tableOption?: TableOptionType;
  onRowClick?: OnRowClickType;
  activeDelete: {
    keys: string;
    callback: OnDeleteType;
  };
  activeKickout?: {
    keys: string;
    callback: (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>,
      item?: any
    ) => void;
  };
  activeRow?: {
    keys: string;
    index: string | number | null;
  };
  pageInfo: PageInfoType;
  onPageChange?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    data: PaginationProps
  ) => void;
};

export type SelectedRowType<T = any> = {
  selectedId: string | number | null;
  selectedItem: T | null;
  clickedIndex: string | number | null;
};
