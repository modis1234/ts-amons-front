import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import moment from 'moment';

import { getLocals, LocalsOptionType, LocalType } from '../../modules/locals';
import {
  deleteDig,
  DigErrorType,
  DigSearchDataType,
  DigType,
  getDigs,
  postDig,
  putDig,
} from '../../modules/digs';
import {
  getDecimalPoint,
  getLocalsOptions,
  mathRound,
  sortFn,
} from '../../opwsUI/util';
import OneByTwoLayout from '../../opwsUI/layout/OneByTwoLayout';
import initConfigData from '../../opwsUI/initConfigData';
import { useAppDispatch, useAppSelector } from 'modules/hooks';
import { PageInfoType, SelectedRowType } from 'opwsUI/table/types';
import { ModalDataType } from 'opwsUI/form/FormElement';
import DaysDigInput from 'components/field/daysDig/DaysDigInput';
import DaysDigTable from 'components/field/daysDig/DaysDigTable';
import DaysDigSearch from 'components/field/daysDig/DaysDigSearch';

const DaysDigCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

export interface PreviewTabelType {
  initDate?: string | Date | null;
  createdDate?: string | Date | null;
  recordDate: string | Date | null;
  planLength: number | null;
  currentLength: number | null;
}

// 초기화 데이터 '../../config/initConfigData'
const {
  daysdig: {
    formData: initFormData,
    error: initError,
    searchData: initSearchData,
  },
} = initConfigData;

const DaysDigContainer = () => {
  const { localsData, digData, sitesData } = useAppSelector((state) => {
    return {
      localsData: state.locals.data,
      digData: state.digs.data,
      sitesData: state.sites.data,
    };
  });

  const dispatch = useAppDispatch();

  const [digItems, setDigItems] = useState<DigType[] | null>(null);
  const [localItems, setLocalItems] = useState<LocalType[] | null>(null);

  const [formData, setFormData] = useState<DigType>(initFormData);
  const [error, setError] = useState<DigErrorType>(initError);

  const [localsOptions, setLocalsOptions] = useState<LocalsOptionType[]>([]);

  const [selectedRow, setSelectedRow] = useState<SelectedRowType<DigType>>({
    selectedId: null,
    selectedItem: null,
    clickedIndex: null,
  });

  const [searchData, setSearchData] =
    useState<DigSearchDataType>(initSearchData);

  const [modalData, setModalData] = useState<ModalDataType>({
    open: false,
    type: null, //type: update/delete/warning
    content: null,
  });

  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });

  const [previewTabel, setPreviewTabel] = useState<PreviewTabelType>({
    initDate: null,
    createdDate: null,
    recordDate: null,
    planLength: null,
    currentLength: null,
  });

  useLayoutEffect(() => {
    dispatch(getLocals());
    dispatch(getDigs());
  }, [dispatch]);

  useEffect(() => {
    if (digData) {
      // const _sortDigData = ascByDate(digData, 'record_date');
      const _sortDigData = sortFn(digData, 'record_date');
      const _accData = accCalcAction(_sortDigData);
      if (searchData.local_index) {
        const _filterItems = _accData.filter(
          (item: DigType) =>
            item.local_index === searchData.local_index && item,
        );
        setDigItems(_filterItems);
      } else {
        setDigItems(_accData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digData]);

  useEffect(() => {
    if (localsData) {
      setLocalItems(localsData);

      const _localsFilter = localsData.filter(
        (item) => item.local_area !== 0 && item.local_type !== 3,
      );
      const _localsOption = getLocalsOptions(_localsFilter, false);
      setLocalsOptions(_localsOption);
      if (formData.local_index) {
        setPreviewHandler(formData.local_index);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localsData]);

  /**@descrition formData 초기화 */
  const initForm = useCallback(() => {
    if (searchData.local_index) {
      const _findLocalItem = localItems?.find(
        (item) => item.local_index === searchData.local_index && item,
      );
      setFormData({
        ...initFormData,
        local_index: _findLocalItem?.local_index ?? null,
        local_name: _findLocalItem?.local_name ?? null,
        local_area: _findLocalItem?.local_area ?? null,
        local_type: _findLocalItem?.local_type ?? null,
        local_plan_length: _findLocalItem?.local_plan_length ?? null,
        record_date: null,
      });
    } else {
      setFormData(initFormData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchData]);

  const accCalcAction = (items: DigType[]) => {
    const _reduceData = items.reduce((acc: DigType[], curr, index, array) => {
      const { local_index: localIndex, dig_length } = curr;
      const _sumCalc = acc.reduce((_acc, curr) => {
        const { local_index, dig_length } = curr;
        const _tempAcc =
          localIndex === local_index ? Number(_acc) + Number(dig_length) : _acc;
        return Number(_tempAcc);
      }, 0);
      acc.push({
        ...curr,
        acc_length: Number(_sumCalc) + Number(dig_length),
      });
      return acc;
    }, []);

    return _reduceData;
  };

  const initsetPageInfo = useCallback(() => {
    setPageInfo({
      ...pageInfo,
      activePage: 1, // 현재 페이지
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setPreviewHandler = (localIndex: string | null) => {
    // if(localsData)
    const _findLocalItem = localsData?.find(
      (item) => item.local_index === localIndex && item,
    );

    const _initData = digData?.find(
      (item) =>
        item.local_index === localIndex && item.dig_type === 'init' && item,
    );

    setPreviewTabel({
      initDate: _initData
        ? moment(_initData.record_date).format('YYYY-MM-DD')
        : null,
      recordDate: _findLocalItem
        ? moment(_findLocalItem?.record_date).format('YYYY-MM-DD')
        : null,
      planLength: _findLocalItem ? _findLocalItem?.local_plan_length : null,
      currentLength: _findLocalItem ? _findLocalItem?.local_curr_length : null,
    });
  };

  /**@descrition formData 초기화 */
  // const initForm = useCallback(() => {
  //   if (searchData.local_index) {
  //     const findTodayItem = digItems.find((item) => {
  //       const _today = moment().format('YYYY-MM-DD');
  //       const _recordDate = moment(item.record_date).format('YYYY-MM-DD');
  //       const _isTodayData = moment(_today).isSame(_recordDate);
  //       if (item.local_index === searchData.local_index && _isTodayData)
  //         return item;
  //     });

  //     setFormData(
  //       findTodayItem
  //         ? {
  //             ...findTodayItem,
  //             record_date: moment(findTodayItem.record_date).format(
  //               'YYYY-MM-DD',
  //             ),
  //           }
  //         : {
  //             ...initFormData,
  //             local_index: searchData.local_index,
  //           },
  //     );
  //   } else {
  //     setFormData(initFormData);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchData]);

  const digFilterItems = (localIndex: string | number | null) => {
    const filterItem = localIndex
      ? digData?.filter(
          (item) =>
            item.local_index === localIndex &&
            (item.local_type === 1 ||
              item.local_type === 2 ||
              item.local_type === 5) &&
            item,
        )
      : digData?.filter(
          (item) =>
            (item.local_type === 1 ||
              item.local_type === 2 ||
              item.local_type === 5) &&
            item,
        );
    const accItems = filterItem ? accCalcAction(filterItem) : [];
    setDigItems(accItems);
  };

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
      let _tempObj = {};

      if (name === 'local_index') {
        const findItem = digData?.find(
          (item) => item.local_index === value && item,
        );

        if (findItem && findItem?.local_index) {
          setPreviewHandler(findItem?.local_index);
        }
        _tempObj = {
          dig_length: 0,
          record_date: null,
          dig_description: null,
          local_area: findItem?.local_area ?? null,
          local_type: findItem?.local_type ?? null,
          local_name: findItem?.local_name ?? null,
          local_plan_length: findItem?.local_plan_length ?? null,
          local_curr_length: findItem?.local_curr_length ?? null,
          // ...locationFindForm(_value),
        };

        setSelectedRow({
          selectedId: null,
          selectedItem: null,
          clickedIndex: null,
        });
        initsetPageInfo();
        setSearchData({
          ...searchData,
          local_index: String(_value),
        });

        setError({
          ...error,
          dig_length: null,
        });

        digFilterItems(findItem?.local_index ?? null);

        _tempObj = {
          record_date: null,
          dig_length: null,
          dig_seq: null,
          dig_description: null,
          local_index: findItem?.local_index ?? null,
          local_name: findItem?.local_name ?? null,
          local_area: findItem?.local_area ?? null,
          local_type: findItem?.local_type ?? null,
          local_plan_length: findItem?.local_plan_length ?? null,
        };
      } else if (name === 'dig_length') {
        _value = Number(_value);

        if (
          previewTabel.planLength !== null &&
          _value > previewTabel.planLength
        ) {
          setError({
            ...error,
            dig_length: '계획연장 길이보다 작은 값을 입력해 주세요.',
          });
        } else if (!formData.record_date) {
          setError({
            ...error,
            dig_length: '입력일을 등록해주세요.',
          });
          return;
        } else if (
          !selectedRow.selectedId &&
          previewTabel?.currentLength &&
          previewTabel?.planLength &&
          previewTabel.currentLength + Number(_value) > previewTabel.planLength
        ) {
          setError({
            ...error,
            dig_length: `${mathRound(
              previewTabel.planLength - previewTabel.currentLength,
            )}이하의 값을 입력해 주세요.`,
          });
        } else if (
          formData.dig_seq &&
          previewTabel.currentLength &&
          selectedRow?.selectedItem?.dig_length &&
          previewTabel?.planLength &&
          previewTabel.currentLength -
            selectedRow.selectedItem.dig_length +
            Number(_value) >
            previewTabel.planLength
        ) {
          setError({
            ...error,
            dig_length: `${mathRound(
              previewTabel.planLength -
                (previewTabel.currentLength -
                  selectedRow.selectedItem.dig_length),
            )}이하의 값을 입력해 주세요.`,
          });
        } else {
          setError({
            ...error,
            dig_length: null,
          });
        }

        if (_value !== null) {
          _value = String(_value);
          // 정수 0~9999/소수점 1자리
          const regExp = /^([1-9]{1}\d{0,3}|0{1})(\.{1}\d{0,1})?$/g;
          if (!regExp.test(_value)) {
            _value = _value.substr(0, _value.length - 1);
          }
        }
      }

      setFormData({
        ...formData,
        [name]: _value,
        ..._tempObj,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [digItems, formData, localsData],
  );

  const onChangeDate = (
    e: React.ChangeEvent<HTMLInputElement>,
    date: Date | string,
  ) => {
    if (formData.local_index) {
      setError({
        ...error,
        local_index: null,
      });
    } else {
      setError({
        ...error,
        local_index: '노선을 선택해 주세요.',
      });
      return;
    }
    const _date = moment(date).format('YYYY-MM-DD');

    // 선택된 날짜에 데이터 찾기
    const findDigItem = digItems?.find((item) => {
      const _recordDate = moment(item.record_date).format('YYYY-MM-DD');
      const _isSameDate = moment(_date).isSame(_recordDate);
      if (_isSameDate) return item;
    });
    if (findDigItem) {
      setFormData({
        ...formData,
        ...findDigItem,
        record_date: moment(findDigItem.record_date).format('YYYY-MM-DD'),
      });
      setSelectedRow({
        selectedId: findDigItem.dig_seq,
        selectedItem: findDigItem,
        clickedIndex: findDigItem.dig_seq,
      });
    } else {
      setFormData({
        ...initFormData,
        local_index: formData?.local_index ?? null,
        local_name: formData?.local_name ?? null,
        local_area: formData?.local_area ?? null,
        local_type: formData?.local_type ?? null,
        local_plan_length: formData?.local_plan_length ?? null,
        record_date: _date,
        dig_length: null,
        dig_description: null,
      });
      setSelectedRow({
        selectedId: null,
        selectedItem: null,
        clickedIndex: null,
      });
    }
  };

  /**@description  table 컴포넌트 Row 클릭 이벤트 핸들러*/
  const onRowClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: DigType) => {
      const {
        dig_seq: itemIndex = null,
        record_date,
        local_plan_length,
        dig_length,
        local_index,
      } = item;
      if (itemIndex === selectedRow.selectedId) {
        setSelectedRow({
          selectedId: null,
          selectedItem: null,
          clickedIndex: null,
        });
        setFormData({
          ...formData,
          local_index: searchData.local_index ? formData.local_index : null,
          dig_seq: null,
          record_date: null,
          dig_length: null,
          dig_description: null,
        });
      } else {
        if (item.dig_type === 'init') return;
        setSelectedRow({
          selectedId: itemIndex,
          selectedItem: item,
          clickedIndex: itemIndex,
        });
        setFormData({
          ...item,
          record_date: moment(record_date).format('YYYY-MM-DD'),
          dig_length: item?.dig_length,
          dig_description: item.dig_description,
          local_index: item?.local_index ?? null,
          local_name: item?.local_name ?? null,
          local_area: item?.local_area ?? null,
          local_type: item?.local_type ?? null,
          local_plan_length: item?.local_plan_length ?? null,
        });
        setError(initError);

        setPreviewHandler(item.local_index);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRow.selectedId, localsData, digData],
  );

  /**@descrition form 컴포넌트 onSubmit 핸들러 */
  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const { dig_seq: activeIndex } = formData;

    /**@description 유효성 체크 */

    if (!activeIndex && !selectedRow.selectedId) {
      // 등록

      const postData = {
        ...formData,
        dig_length: Number(formData.dig_length),
        dig_type: initFormData.dig_type,
      };

      try {
        await dispatch(postDig(postData));
        dispatch(getLocals());
        // setFormData(initFormData);
        setFormData({
          ...initFormData,
          local_index: postData.local_index,
          local_type: postData.local_type ?? null,
          local_name: postData?.local_name ?? null,
          local_area: postData?.local_area ?? null,
          record_date: null,
          dig_length: null,
          dig_description: null,
        });
      } catch (error) {
        console.error('POST ERROR!!');
      }
    } else {
      //수정
      setModalData({
        ...modalData,
        open: true,
        type: 'update',
      });
    }
  };

  /**@descrition modal button Action */
  const setOpen = ({ action, open }: { action: boolean; open: boolean }) => {
    setModalData((prev) => {
      if (prev.type === 'update' && action) updateDispatch();
      else if (prev.type === 'delete' && action) deleteDispatch();

      return {
        ...prev,
        open: open,
        type: null,
        content: null,
        header: null,
      };
    });
  };

  /**@descrition update dispatch action 함수 */
  const updateDispatch = async () => {
    //수정
    let updateItem = { ...formData };

    const updatedKeys = {};
    // eslint-disable-next-line no-restricted-syntax
    // for (let key in updateItem) {
    //   if (updateItem[key] !== selectedRow.selectedItem[key]) {
    //     updatedKeys[`u_${key}`] = true;
    //   }
    // }

    updateItem = {
      ...updateItem,
      ...updatedKeys,
    };

    const { dig_seq: _index, dig_length } = updateItem;
    const newDig = {
      ...formData,
      // dig_length: minusComma(dig_length),
    };
    try {
      await dispatch(putDig(newDig));
      dispatch(getLocals());
      setFormData({
        ...initFormData,
        local_index: formData.local_index,
        local_type: formData.local_type ?? null,
        local_name: formData?.local_name ?? null,
        local_area: formData?.local_area ?? null,
        record_date: null,
        dig_length: null,
        dig_description: null,
      });
      setSelectedRow({
        selectedId: null,
        selectedItem: null,
        clickedIndex: null,
      });
    } catch (error) {
      console.error('UPDATE FAIL');
    }
  };

  /**@descrition delete 버튼 클릭 이벤트 핸들러 */
  const onDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number,
  ): void => {
    const _items: DigType[] | null = digData;

    if (!_items) return;

    const findItem = _items.find((item) => item.dig_seq === id && item);
    if (findItem) {
      setModalData({
        ...modalData,
        open: true,
        type: 'delete',
      });
    }
  };

  /**@descrition delete dispatch 액션 실행 함수 */
  const deleteDispatch = async () => {
    const _item = selectedRow?.selectedItem ?? null;
    if (_item === null) return;

    try {
      await dispatch(deleteDig(_item));

      initForm();

      dispatch(getLocals());
    } catch (error) {
      console.error('DELETE FALI');
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
      setSelectedRow({
        selectedId: null,
        selectedItem: null,
        clickedIndex: null,
      });
      setPageInfo({
        ...pageInfo,
        activePage,
        itemsPerPage,
      });
    },
    [pageInfo],
  );

  /**@description Search Action Area*/
  /**@descrition delete dispatch 액션 실행 함수 */

  const onSearchChange = useCallback(
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
      // select onChange - rest.option
      // input onChange - e.target
      const { value, name } = rest?.option ? rest.option : e.target;
      if (value) {
        const findItem =
          localItems?.find((item) => item.local_index === value && item) ??
          null;

        if (findItem?.local_index) setPreviewHandler(findItem.local_index);
        setFormData({
          ...formData,
          record_date: null,
          dig_length: null,
          dig_seq: null,
          dig_description: null,
          local_index: findItem?.local_index ?? null,
          local_name: findItem?.local_name ?? null,
          local_area: findItem?.local_area ?? null,
          local_type: findItem?.local_type ?? null,
          local_plan_length: findItem?.local_plan_length ?? null,
        });
      } else {
        setPreviewHandler(null);
        setFormData(initFormData);
      }
      setSelectedRow({
        selectedId: null,
        selectedItem: null,
        clickedIndex: null,
      });

      setSearchData({
        ...searchData,
        [name]: value,
      });

      digFilterItems(value);
      initsetPageInfo();

      setError({
        ...error,
        dig_length: null,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [digItems, searchData, localItems],
  );

  const onSearchAction = () => {};

  const onSearchRefresh = () => {
    setSearchData(initSearchData);
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
    initForm();
  };

  return (
    <DaysDigCmpt className="dig-container">
      <OneByTwoLayout
        inputTitle="일일 굴진량 입력"
        tableTitle="일일 굴진 이력"
        firstRender={
          <DaysDigInput
            formData={formData}
            error={error}
            onChange={onChange}
            onSubmit={onSubmit}
            setOpen={setOpen}
            selectedRow={selectedRow}
            modalData={modalData}
            localsOptions={localsOptions}
            // onRecordDataChange={onRecordDataChange}
            previewTabel={previewTabel}
            onChangeDate={onChangeDate}
          />
        }
        secondRender={
          sitesData && (
            <DaysDigTable
              data={digItems}
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
        searchRender={
          localsOptions && (
            <DaysDigSearch
              searchData={searchData}
              onSearchChange={onSearchChange}
              onSearchAction={onSearchAction}
              onSearchRefresh={onSearchRefresh}
              localsOptions={localsOptions}
            />
          )
        }
        rightHeader
      />
    </DaysDigCmpt>
  );
};

export default DaysDigContainer;
