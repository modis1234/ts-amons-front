import ProcessInput from 'components/field/process/ProcessInput';
import ProcessSearch from 'components/field/process/ProcessSearch';
import ProcessTable from 'components/field/process/ProcessTable';
import _ from 'lodash';
import { useAppDispatch, useAppSelector } from 'modules/hooks';
import { ModalDataType } from 'opwsUI/form/FormElement';
import { PageInfoType, SelectedRowType } from 'opwsUI/table/types';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { getLocals, LocalsOptionType, LocalType } from '../../modules/locals';
import {
  deleteProcess,
  getProcesses,
  postProcess,
  ProcessErrorType,
  ProcessSearchDataType,
  ProcessType,
} from '../../modules/processes';
import initConfigData from '../../opwsUI/initConfigData';
import OneByTwoLayout from '../../opwsUI/layout/OneByTwoLayout';
import { getLocalsOptions, sortFn } from '../../opwsUI/util';

const ProcessCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

export const processColor: {
  [code: number]: { text: string; color: string };
} = {
  1: { text: '미착공', color: '#286e41' },
  2: { text: '천공', color: '#7c3795' },
  3: { text: '장약', color: '#636363' },
  4: { text: '발파', color: '#971717' },
  5: { text: '버력처리', color: '#375795' },
  6: { text: '숏크리트', color: '#7c4c17' },
  7: { text: '강지보', color: '#707017' },
  8: { text: '격자지보', color: '#a1922b' },
  9: { text: '록볼트', color: '#175c59' },
  10: { text: '방수시트', color: '#1b2f54' },
  11: { text: '라이닝', color: '#3c3a3a' },
  12: { text: '근무교대', color: '#407d23' },
  13: { text: '장비점검', color: '#4c7e7c' },
  14: { text: '기타', color: '#351c3e' },
  15: { text: '굴진중', color: '#ce3f3f' },
};

// 초기화 데이터 '../../config/initConfigData'
const {
  process: {
    formData: initFormData,
    error: initError,
    searchData: initSearchData,
  },
} = initConfigData;
const ProcessContainer = () => {
  const { localsData, processData } = useAppSelector((state) => {
    return {
      localsData: state.locals.data,
      processData: state.processes.data,
    };
  });

  const dispatch = useAppDispatch();

  const [processItems, setProcessItems] = useState<ProcessType[] | null>(null);
  const [localItems, setLocalItems] = useState<LocalType[] | null>(null);

  const [formData, setFormData] = useState<ProcessType>(initFormData);
  const [error, setError] = useState<ProcessErrorType>(initError);

  const [localsOptions, setLocalsOptions] = useState<LocalsOptionType[]>([]);

  const [selectedRow, setSelectedRow] = useState<SelectedRowType<ProcessType>>({
    selectedId: null,
    selectedItem: null,
    clickedIndex: null,
  });

  const [searchData, setSearchData] =
    useState<ProcessSearchDataType>(initSearchData);

  const [modalData, setModalData] = useState<ModalDataType>({
    open: false,
    type: null, //type: update/delete/warning
    content: null,
  });

  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });

  useLayoutEffect(() => {
    getDispatch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (processData) {
      if (searchData?.local_index) {
        processFilterItems(searchData?.local_index);
      } else {
        const _sortData = _.sortBy(processData, 'pcs_id').reverse();
        setProcessItems(_sortData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processData]);

  useEffect(() => {
    if (localsData) {
      setLocalItems(localsData);
      const _filterLocals = localsData.filter(
        (item) =>
          item.local_area !== 0 &&
          (item.local_type === 1 ||
            item.local_type === 2 ||
            item.local_type === 5) &&
          item,
      );
      const _localsOption = getLocalsOptions(_filterLocals, false);
      setLocalsOptions(_localsOption);
    }
  }, [localsData]);

  const getDispatch = () => {
    dispatch(getLocals());
    dispatch(getProcesses());
  };

  /**@descrition formData 초기화 */
  const initForm = useCallback(() => {
    setFormData(initFormData);
  }, []);

  const initsetPageInfo = useCallback(() => {
    setPageInfo({
      activePage: 1, // 현재 페이지
      itemsPerPage: 14, // 페이지 당 item 수
    });
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
      if (name === 'local_index') {
        if (typeof _value === 'string') {
          processFilterItems(_value);
          locationFindForm(_value);
        }
        initsetPageInfo();
      } else {
        if (!formData?.local_index) return;
        if (name === 'pcs_next_state') {
          _value = Number(value);
        }
        setFormData({
          ...formData,
          [name]: _value,
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formData, localItems],
  );

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
  /**@descrition form 컴포넌트 onSubmit 핸들러 */
  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    const { pcs_seq: activeIndex } = formData;

    /**@description 유효성 체크 */

    if (!activeIndex && !selectedRow.selectedId) {
      // 등록

      const postData = {
        ...formData,
        pcs_prev_state: formData?.pcs_curr_state ?? null,
        pcs_curr_state: formData?.pcs_next_state ?? null,
      };

      try {
        await dispatch(postProcess(postData));
        dispatch(getLocals());
        setFormData({
          ...postData,
          pcs_next_state: null,
          pcs_description: null,
        });
      } catch (error) {
        console.error('POST SUBMIT ERROR!!');
      }

      //   dispatch(postAnnounce(postData));
      //   setFormData(initFormData);
    } else {
      //수정
      setModalData({
        ...modalData,
        open: true,
        type: 'update',
      });
    }
  };

  /**@descrition update dispatch action 함수 */
  const updateDispatch = () => {
    //수정
    let updateItem = { ...formData };

    const updatedKeys = {};

    // eslint-disable-next-line no-restricted-syntax

    updateItem = {
      ...updateItem,
      ...updatedKeys,
    };

    const { pcs_seq: _index } = updateItem;

    // dispatch(putAnnounce(_index, updateItem));
  };

  /**@descrition delete 버튼 클릭 이벤트 핸들러 */
  const onDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number,
  ): void => {
    const _items: ProcessType[] | null = processData;

    if (!_items) return;

    const findItem = _items.find((item) => item.pcs_seq === id && item);
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
      await dispatch(deleteProcess(_item));

      initForm();

      dispatch(getLocals());
    } catch (error) {
      console.error('DELETE FALI');
    }
  };

  const processFilterItems = (index: string | null) => {
    const filterItem = index
      ? processData?.filter((item) => item.local_index === index && item)
      : processData;

    setSearchData({
      local_index: index,
    });
    if (!filterItem) return;
    setProcessItems(filterItem);
  };

  const locationFindForm = (index: string) => {
    const findItem = localItems?.find(
      (item) => item.local_index === index && item,
    );
    setFormData({
      ...formData,
      local_index: findItem?.local_index ?? null,
      local_name: findItem?.local_name ?? null,
      local_area: findItem?.local_area ?? null,
      local_type: findItem?.local_type ?? null,
      pcs_curr_state: findItem?.local_process ?? null,
      pcs_next_state: null,
      pcs_description: null,
    });
  };

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
      setSearchData({
        ...searchData,
        [name]: value,
      });
      if (typeof value === 'string') {
        processFilterItems(value);
        locationFindForm(value);
      }
      initsetPageInfo();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [processItems, searchData],
  );

  const onSearchAction = () => {};

  const onSearchRefresh = () => {
    setSearchData(initSearchData);
    // setBeaconItems(beaconData);
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
    initForm();
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

  return (
    <ProcessCmpt className="process-container">
      <OneByTwoLayout
        inputTitle="공정상태 변경"
        tableTitle="공정상태 변경 이력"
        firstRender={
          <ProcessInput
            formData={formData}
            onChange={onChange}
            onSubmit={onSubmit}
            localsOptions={localsOptions}
            // setOpen={setOpen}
            // error={error}
            // selectedRow={selectedRow}
            // modalData={modalData}
          />
        }
        secondRender={
          <ProcessTable
            data={processItems}
            selectedRow={selectedRow}
            // onRowClick={onRowClick}
            // onDelete={onDelete}
            initForm={initForm}
            pageInfo={pageInfo}
            setPageInfoHandler={setPageInfoHandler}
          />
        }
        searchRender={
          localsOptions && (
            <ProcessSearch
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
    </ProcessCmpt>
  );
};

export default ProcessContainer;
