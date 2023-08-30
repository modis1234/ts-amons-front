import React, {
  useState,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import OneByTwoLayout from "../../opwsUI/layout/OneByTwoLayout";
import { styled } from "styled-components";
import LocalInput from "components/field/local/LocalInput";
import initConfigData from "opwsUI/initConfigData";
import {
  deleteLocal,
  getLocals,
  LocalErrorType,
  LocalType,
  putLocal,
} from "modules/locals";
import { useAppDispatch, useAppSelector } from "modules/hooks";
import { addComma } from "opwsUI/util";
import LocalTable from "components/field/local/LocalTable";
import { getSites } from "modules/sites";
import { PageInfoType, SelectedRowType } from "opwsUI/table/types";
import { ModalDataType } from "opwsUI/form/FormElement";

const LocalCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

export type EntranceOptionType = {
  key: number;
  text: string | null;
  value: string | null;
};

// export type SelectedRowType = {
//   selectedId: string | number | null;
//   selectedItem: LocalType | null;
//   clickedIndex: string | number | null;
// };

// 초기화 데이터 '../../config/initConfigData'
const {
  local: {
    formData: initFormData,
    error: initError,
    // searchData: initSearchData,
  },
} = initConfigData;

function LocalContainer() {
  const { localsData, sitesData } = useAppSelector((state) => {
    return { localsData: state.locals.data, sitesData: state.sites.data };
  });
  const dispatch = useAppDispatch();

  const [selectedRow, setSelectedRow] = useState<SelectedRowType<LocalType>>({
    selectedId: null,
    selectedItem: null,
    clickedIndex: null,
  });

  const [localItems, setLocalItems] = useState<LocalType[] | null>(null);
  const [entranceOptions, setEntranceOptions] = useState<
    EntranceOptionType[] | []
  >([]);

  const [formData, setFormData] = useState<LocalType>(initFormData);
  const [error, setError] = useState<LocalErrorType>(initError);

  const [modalData, setModalData] = useState<ModalDataType>({
    open: false,
    type: null, //type: update/delete/warning
    content: null,
  });

  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    activePage: 1, // 현재 페이지
    itemsPerPage: 15, // 페이지 당 item 수
  });

  useLayoutEffect(() => {
    dispatch(getLocals());
    dispatch(getSites());
  }, [dispatch]);

  useEffect(() => {
    if (localsData) {
      setLocalItems(localsData);

      const reduceEntranceOption = localsData.reduce(
        (acc: EntranceOptionType[], curr: LocalType) => {
          const { local_id, local_type, local_index, local_area, local_name } =
            curr;
          if (local_type === 3) {
            const tempObj: EntranceOptionType = {
              key: local_id ?? 0,
              text: local_name,
              value: local_index,
            };
            acc.push(tempObj);
          }
          return acc;
        },
        [{ key: 0, text: "지정안함", value: null }]
      );
      setEntranceOptions(reduceEntranceOption);
    }
  }, [localsData]);

  /**@descrition formData 초기화 */
  const initForm = useCallback((): void => {
    setFormData(initFormData);
  }, []);

  /**@descrition input 입력란 onChange 핸들러 */
  const onChange = useCallback(
    ({
      e,
      ...rest
    }: {
      e: React.ChangeEvent<HTMLInputElement>;
      option?: {
        name: string;
        value: string | number | null;
      };
    }) => {
      const { name, value } = rest?.option ? rest.option : e.target;

      let _value = value;
      let _tempValue;
      if (name === "local_plan_length") {
        //eslint-disable-next-line no-restricted-globals
        _value = String(_value).replaceAll(",", "");
        const _isNaN = isNaN(Number(_value));
        if (_isNaN) {
          setError({
            ...error,
            local_plan_length: "계획 연장은 숫자만 입력 가능합니다.",
          });
          return;
        } else if (!_isNaN) {
          setError({
            ...error,
            local_plan_length: null,
          });
        }

        _value = addComma(Number(_value));
      } else if (name === "local_name" && _value && error.local_name) {
        setError({
          ...error,
          local_name: null,
        });
      } else if (name === "local_type") {
        if (value) {
          let _monitorNumber = 0; // monitor_number 자동 할당
          let _localNumber = 0;
          if (value === 1) {
            // 왕십리방향
            _monitorNumber = 2;
            _localNumber = 1;
          } else if (value === 2) {
            //종암동방향
            _monitorNumber = 2;
            _localNumber = 2;
          } else if (value === 4) {
            // 정거장
            _monitorNumber = 1;
          } else if (value === 5) {
            // 환승통로
            _monitorNumber = 1;
          }
          _tempValue = {
            monitor_number: _monitorNumber,
            local_number: _localNumber,
          };
        }
        if (_value && error.local_type) {
          setError({
            ...error,
            local_type: null,
          });
        }
      }

      setFormData({
        ...formData,
        [name]: _value,
        ..._tempValue,
      });
    },
    [formData, error]
  );

  /**@descrition form 컴포넌트 onSubmit 핸들러 */
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // e.preventDefault();

    const { local_index: activeIndex } = formData;

    /**@description 유효성 체크 */
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    // 설치위치

    if (!activeIndex && !selectedRow.selectedId) {
      // 등록

      const postData = formData;

      // 유효성 체크
      // const validate = onValidate();
      // if (!validate) return;

      // dispatch(postLocal(formData));
      setFormData(initFormData);
    } else {
      //수정
      setModalData({
        ...modalData,
        open: true,
        type: "update",
      });
    }
  };

  /**@description  table 컴포넌트 Row 클릭 이벤트 핸들러*/
  const onRowClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: LocalType) => {
      const { local_id: itemIndex = null } = item;
      if (itemIndex === selectedRow.selectedId) {
        setSelectedRow({
          selectedId: null,
          selectedItem: null,
          clickedIndex: null,
        });
        initForm();
      } else {
        setSelectedRow({
          selectedId: itemIndex,
          selectedItem: item,
          clickedIndex: itemIndex,
        });
        setFormData({
          ...item,
        });
        setError(initError);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRow.selectedId]
  );

  /**@descrition delete 버튼 클릭 이벤트 핸들러 */
  const onDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number
  ): void => {
    const _items: LocalType[] | null = localsData;
    if (!_items) return;
    const findItem = _items.find((item) => item.local_id === id && item);
    if (findItem) {
      setModalData({
        ...modalData,
        open: true,
        type: "delete",
      });
    }
  };

  const setPageInfoHandler = useCallback(
    ({
      activePage,
      itemsPerPage,
    }: {
      activePage: number;
      itemsPerPage: number;
    }) => {
      setPageInfo({
        ...pageInfo,
        activePage,
        itemsPerPage,
      });
      setSelectedRow({
        selectedId: null,
        selectedItem: null,
        clickedIndex: null,
      });
    },
    [pageInfo]
  );

  /**@descrition modal button Action */
  const setOpen = ({ action, open }: { action: boolean; open: boolean }) => {
    setModalData((prev) => {
      if (prev.type === "update" && action) updateDispatch();
      else if (prev.type === "delete" && action) deleteDispatch();

      return {
        open: open,
        type: null,
        content: null,
        header: null,
      };
    });
  };

  const onValidate = () => {
    if (!formData.local_name) {
      setError({
        ...error,
        local_name: "노선명을 입력해 주세요.",
      });
      return false;
    }
    if (!formData.local_type) {
      setError({
        ...error,
        local_type: "굴진방향을 선택해 주세요.",
      });
      return false;
    }

    return true;
  };

  /**@descrition update dispatch action 함수 */
  const updateDispatch = () => {
    //수정
    let updateItem = { ...formData };

    // 유효성 체크
    const validate = onValidate();
    if (!validate) return;

    const updatedKeys = {};

    // eslint-disable-next-line no-restricted-syntax
    // for (let key in updateItem) {
    //   if (updateItem[key] !== selectedRow.selectedItem[key]) {
    //     updatedKeys[`u_${key}`] = true;
    //   }
    // }

    // updateItem = {
    //   ...updateItem,
    //   ...updatedKeys,
    // };

    const { local_id: _id } = updateItem;

    dispatch(putLocal(updateItem));
  };

  /**@descrition delete dispatch 액션 실행 함수 */
  const deleteDispatch = () => {
    const _item = selectedRow?.selectedItem ?? null;
    if (_item === null) return;
    dispatch(deleteLocal(_item));
    initForm();
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
  };

  return (
    <LocalCmpt className="local-container">
      <OneByTwoLayout
        inputTitle={"노선 등록"}
        tableTitle={"노선 목록"}
        firstRender={
          <LocalInput
            formData={formData}
            error={error}
            onChange={onChange}
            onSubmit={onSubmit}
            setOpen={setOpen}
            selectedRow={selectedRow}
            modalData={modalData}
            entranceOptions={entranceOptions}
          />
        }
        secondRender={
          sitesData &&
          localItems && (
            <LocalTable
              data={localItems}
              selectedRow={selectedRow}
              onRowClick={onRowClick}
              onDelete={onDelete}
              initForm={initForm}
              pageInfo={pageInfo}
              setPageInfoHandler={setPageInfoHandler}
              siteItem={sitesData[0]}
            />
          )
        }
        rightHeader={false}
      />
    </LocalCmpt>
  );
}

export default LocalContainer;
