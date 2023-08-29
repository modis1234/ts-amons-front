// @ts-nocheck
import { faTrash } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Icon, Pagination, Table } from "semantic-ui-react";
import styled from "styled-components";
import moment from "moment";
import _ from "lodash";
import { TableElementType } from "./types";

const TableCmpt = styled.div`
  width: 100%;
  height: 100%;
  /* padding-top: 15px; */
  table.table-box {
    thead,
    tbody tr {
      /* display: table;
            width: 100%;
            table-layout: fixed; */
      /* even columns width , fix width of table too*/
    }
    .header-row {
      .table-header-cell {
        font-family: NotoSansCJKkr-Medium;
        height: 39px;
        background-color: #f2f2f2;
        @media screen and (min-height: 970px) {
          height: 47px;
        }
      }

      .no {
        /* width: 47px; */
      }
    }
    .table-body {
      .body-row {
        &.albled-row {
          &:hover {
            cursor: pointer;
          }
        }
        .table-body-cell {
          font-family: NotoSansCJKkr-Regular;
          color: #7c7c7c;
          height: 47px;
          max-width: 150px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 14px;
          &.update_cell {
            color: var(--company-identity-color, #0000ff);
          }
          .delete-icon {
            &:hover {
              cursor: pointer;
              color: #f00;
            }
          }
          .kickout-button {
            width: 80px;
            padding: 4px;
            margin: 0 auto;
            border-radius: 4px;
            background-color: var(--company-identity-color);
            color: #ffffff;
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
              background-color: #d5181f;
              /* opacity: 0.8; */
            }
          }
          @media screen and (max-height: 970px) {
            height: 39px;
            padding-top: 0px;
            padding-bottom: 0px;
          }
        }
      }
    }
    .table-footer {
      text-align: end;
      height: 60px;
    }
  }
`;

function TableElement({
  tableData,
  tableOption = {
    deleteAction: false, // delete Icon 표출 및 delete 액션 실행 field 생성
    pageNation: false, // pagination 기능 여부
    rowSelect: false, // row 선택 액션 여부
    newSorting: true, // 새등록 된 아이템 재정렬 막기
    kickoutAction: false, // kickout Button 표출 및 kickout 액션 실행 field 생성
  },
  onRowClick = (e) => {},
  activeDelete,
  activeKickout,
  activeRow,
  pageInfo,
  onPageChange,
}: TableElementType) {
  const [fields, setFields] = useState<HeaderType[] | null>(null);

  // const [items, setItems] = useState([...tableData.body]);

  // const onRowClick = (e: React.MouseEvent, item?: any) => {};

  const items = tableData?.body ?? [];

  useLayoutEffect(() => {
    const groupArr = tableData?.group
      ? tableData.group.filter((item) => item?.field && item)
      : [];
    setFieldsHandler(
      tableOption.deleteAction
        ? [
            ...groupArr,
            ...tableData.header,
            {
              id: "delete",
              name: "delete",
              field: "delete",
              textAlign: "center",
              width: 1,
            },
          ]
        : tableOption?.kickoutAction
        ? [
            ...groupArr,
            ...tableData.header,
            {
              id: "kickout",
              name: "강제퇴출",
              field: "kickout",
              textAlign: "center",
              width: 1,
            },
          ]
        : [...groupArr, ...tableData.header]
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [currentData, setCurrentData] = useState<{
    column: string | null;
    data: Array<any>;
    direction: "ascending" | "descending" | null;
  }>({
    column: null,
    data: [],
    direction: null,
  });

  // 새로 등록했는지 판단하기 위해 현재 페이지 진입점의 기준이 되는 시간
  const [enteredTime, setEnteredTime] = useState(moment(new Date().getTime()));

  useEffect(() => {
    items && sortingCurrentData();
    const _sortedEl = document.getElementsByClassName("sorted")[0];
    if (_sortedEl) _sortedEl.classList.remove("sorted");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableData]);

  const { activePage, itemsPerPage } = pageInfo;
  if (!activePage) return;

  const totalPages = Math.ceil(currentData.data.length / itemsPerPage);
  const viewItems = currentData.data.slice(
    (activePage - 1) * itemsPerPage,
    (activePage - 1) * itemsPerPage + itemsPerPage
  );

  const sortingCurrentData = () => {
    if (!tableOption?.newSorting) {
      setCurrentData({
        ...currentData,
        data: items,
      });
    } else {
      if (tableData.body ? tableData?.body.length === 0 : []) {
        // return setCurrentData([]);
        return setCurrentData({
          ...currentData,
          data: [],
        });
      }
      const tempArr = items.sort((a, b) => {
        return a.te_name < b.te_name ? -1 : 1;
      });

      const newItems: Array<any> = [];
      const oldItems: Array<any> = [];

      tempArr.forEach((item, index) => {
        if (
          item.modified_date &&
          moment(enteredTime).format("YYYY-MM-DD HH:mm:ss") <
            moment(item.modified_date).format("YYYY-MM-DD HH:mm:ss")
        ) {
          newItems.push(item);
        } else if (
          moment(enteredTime).format("YYYY-MM-DD HH:mm:ss") <
          moment(item.created_date).format("YYYY-MM-DD HH:mm:ss")
        ) {
          newItems.push(item);
        } else {
          oldItems.push(item);
        }
      });

      const result = [...newItems, ...oldItems];
      // setCurrentData(result);
      setCurrentData({
        ...currentData,
        data: result,
      });
    }
  };

  const setFieldsHandler = (items: any): void => {
    const reduceItems: Array<HeaderType> = items.reduce(
      (acc: Array<any>, curr: HeaderType) => {
        const { id, name, ...rest } = curr;
        acc.push(rest);
        return acc;
      },
      []
    );
    setFields(reduceItems);
  };

  const headerRender = (items: any[] = []) => {
    return items.map((item, index) => {
      const { sorting = false, callback = undefined, width, ...rest } = item;
      return (
        <Table.HeaderCell
          key={index}
          className={`table-header-cell ${item?.id ?? ""} ${
            item?.sorting &&
            item.sorting.toString() &&
            currentData.column === item?.field
              ? `${currentData?.direction ?? ""} sorted`
              : ""
          }`}
          {...rest}
          onClick={item?.sorting && (() => onChangeSort(item?.field))}
        >
          {item?.name ? (
            item?.field !== "delete" ? (
              item.name
            ) : (
              <FontAwesomeIcon icon={faTrash} />
            )
          ) : null}
        </Table.HeaderCell>
      );
    });
  };

  const bodyRender = (items: Array<any> = []) => {
    const tempItems = [
      ...items,
      ...Array(pageInfo.itemsPerPage - items.length),
    ];

    return tempItems.map((item, index) => {
      const tableNo = index + 1 + (activePage - 1) * itemsPerPage;
      const tempItem = item ?? {};
      const { ...rest } = tempItem;
      return (
        <Table.Row
          className={`body-row ${
            tableOption?.rowSelect && item ? "albled-row" : ""
          }`}
          key={`tableRowKey${Math.random() * 100000}`}
          id={`scroll${index}`}
          onClick={
            tableOption?.rowSelect && item
              ? (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  onRowClick(e, item)
              : undefined
          }
          // active={index && index === clickedIndex}
          // selectable={item ? true : false}
          // active={item?.[activeRow.keys] === activeRow?.index ? true : false}
          active={
            activeRow && item?.[activeRow.keys] === activeRow?.index
              ? true
              : false
          }
        >
          {fields?.map((fieldsItem) => {
            const { field } = fieldsItem;
            return (
              <Table.Cell
                key={Math.random()}
                className={`table-body-cell ${field ?? ""} ${
                  item?.[`u_${field}`] ? "update_cell" : ""
                }`}
                textAlign={fieldsItem?.textAlign ?? "left"}
                verticalAlign="middle"
              >
                {item?.[field] ||
                item?.[field] === null ||
                item?.[field] === 0 ? (
                  fieldsItem?.callback ? (
                    fieldsItem.callback(item)
                  ) : (
                    item[field]
                  )
                ) : field === "no" && item ? (
                  (fieldsItem.key ? item?.[fieldsItem.key] : null) ||
                  item?.modified_date !== undefined ||
                  item?.record_time ? (
                    tableNo
                  ) : (
                    "새등록"
                  )
                ) : field === "delete" &&
                  item &&
                  item?.[activeRow?.keys ?? 1] ===
                    (activeRow?.index ?? null) ? (
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="delete-icon"
                    onClick={
                      field === "delete"
                        ? (e) => {
                            // 상위 테이블 로우에 걸어줬던 버튼 떄문에 이벤트 버블링 생긴다.
                            // 버블링 막고 독립적인 버튼으로 만들어 주기.
                            e.stopPropagation();
                            const delKeys = activeDelete.keys;
                            activeDelete.callback(e, item[delKeys]);
                          }
                        : undefined
                    }
                  />
                ) : field === "kickout" && item ? (
                  <div
                    className="kickout-button"
                    onClick={
                      field === "kickout"
                        ? (e) => {
                            e.stopPropagation();
                            if (!activeKickout) return undefined;
                            const kickKeys = activeKickout.keys;
                            activeKickout?.callback(e, item[kickKeys]);
                          }
                        : undefined
                    }
                  >
                    강제퇴출
                  </div>
                ) : null}
              </Table.Cell>
            );
          }) ?? null}
        </Table.Row>
      );
    });
  };

  const onChangeSort = (col: string) => {
    const { column, data, direction } = currentData;
    if (column === col) {
      setCurrentData({
        ...currentData,
        data: data.slice().reverse(),
        direction: direction === "ascending" ? "descending" : "ascending",
      });
    } else {
      setCurrentData({
        column: col,
        data: _.sortBy(data, [col]),
        direction: "ascending",
      });
    }
  };

  return (
    <TableCmpt className="table-component">
      <Table
        className="table-box"
        sortable
        singleLine
        celled
        selectable={tableOption?.rowSelect ?? false}
        unstackable
      >
        <Table.Header className="table-header">
          {tableData?.group && (
            <Table.Row className="header-row group-row">
              {headerRender(tableData.group)}
            </Table.Row>
          )}
          <Table.Row className="header-row">
            {headerRender(
              tableOption?.deleteAction
                ? [
                    ...tableData.header,
                    {
                      id: "delete",
                      name: "delete",
                      field: "delete",
                      textAlign: "center",
                      width: 1,
                    },
                  ]
                : tableOption?.kickoutAction
                ? [
                    ...tableData.header,
                    {
                      id: "kickout",
                      name: "강제퇴출",
                      field: "kickout",
                      textAlign: "center",
                      width: 1,
                    },
                  ]
                : tableData.header
            )}
          </Table.Row>
        </Table.Header>

        <Table.Body className="table-body resizable-table-body">
          {fields && bodyRender(viewItems)}
        </Table.Body>
        {/* =============================테이블 푸터(페이지네이션)============================== */}
        {tableOption?.pageNation && (
          <Table.Footer className="table-footer">
            <Table.Row className="table-pagination-row">
              <Table.HeaderCell
                colSpan={fields ? fields.length : "5"}
                className="table-pagination-row"
              >
                {totalPages > 1 && (
                  <Pagination
                    activePage={activePage ?? 0}
                    totalPages={totalPages}
                    siblingRange={1}
                    onPageChange={onPageChange}
                    firstItem={
                      // 페이지 수가 5개 이상일 때 >> << 맨 앞 맨 뒤 페이지 호출
                      totalPages <= 5 || {
                        "aria-label": "First item",
                        content: <Icon name="angle double left" />,
                        icon: true,
                      }
                    }
                    lastItem={
                      totalPages <= 5 || {
                        "aria-label": "Last item",
                        content: <Icon name="angle double right" />,
                        icon: true,
                      }
                    }
                    prevItem={{
                      content: <Icon name="angle left" />,
                      icon: true,
                    }}
                    nextItem={{
                      content: <Icon name="angle right" />,
                      icon: true,
                    }}
                    // active={activePage === 1}
                    className="pagination-component"
                  />
                )}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        )}
      </Table>
    </TableCmpt>
  );
}

export default React.memo(TableElement);
