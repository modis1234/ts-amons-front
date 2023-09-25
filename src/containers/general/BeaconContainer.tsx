import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import {
  BeaconErrorType,
  BeaconSearchDataType,
  BeaconType,
  deleteBeacon,
  getBeacons,
  postBeacon,
  putBeacon,
} from '../../modules/beacons';
import initConfigData from '../../opwsUI/initConfigData';
import { addZero, splitByColonInput } from '../../opwsUI/util';
import OneByTwoLayout from '../../opwsUI/layout/OneByTwoLayout';
import { useAppDispatch, useAppSelector } from 'modules/hooks';
import { PageInfoType, SelectedRowType } from 'opwsUI/table/types';
import { ModalDataType } from 'opwsUI/form/FormElement';
import BeaconInput from 'components/general/beacon/BeaconInput';
import BeaconTable from 'components/general/beacon/BeaconTable';
import BeaconSearch from 'components/general/beacon/BeaconSearch';

const BeaconCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

// 초기화 데이터 '../../config/initConfigData'
const {
  beacon: {
    formData: initFormData,
    error: initError,
    searchData: initSearchData,
  },
} = initConfigData;

const BeaconContainer = () => {
  const { beaconsData } = useAppSelector((state) => {
    return { beaconsData: state.beacons.data };
  });

  const dispatch = useAppDispatch();

  const [selectedRow, setSelectedRow] = useState<SelectedRowType<BeaconType>>({
    selectedId: null,
    selectedItem: null,
    clickedIndex: null,
  });
  const [beaconItems, setBeaconItems] = useState<BeaconType[] | null>(null);

  const [formData, setFormData] = useState<BeaconType>(initFormData);
  const [error, setError] = useState<BeaconErrorType>(initError);

  const [searchData, setSearchData] =
    useState<BeaconSearchDataType>(initSearchData);

  const [modalData, setModalData] = useState<ModalDataType>({
    open: false,
    type: null, //type: update/delete/warning
    content: null,
  });

  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });

  const beaconLastID = useRef<number>(0);

  useLayoutEffect(() => {
    dispatch(getBeacons());
  }, [dispatch]);

  useEffect(() => {
    if (beaconsData) {
      setBeaconItems(beaconsData);
      if (beaconsData.length !== 0)
        beaconLastID.current =
          beaconsData?.[beaconsData.length - 1]?.bc_management ?? 1;
    }
  }, [beaconsData]);

  /**@descrition formData 초기화 */
  const initForm = useCallback(() => {
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
        value: string | number | boolean | null;
      };
    }) => {
      const { name, value } = rest?.option ? rest.option : e.target;
      let _value = value;

      let _tempObj = {};

      // if (name === 'bc_address') {
      //   _value = splitByColonInput(value)
      //     .toUpperCase()
      //     .replace(/[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ]*$/g, '');
      // }
      if (name === 'bc_address') {
        /**@description 유효성 체크 */
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        _value = String(_value);
        if (korean.test(_value)) {
          setError({
            ...error,
            bc_address: '비콘 MAC 주소에 한글을 입력할 수 없습니다.',
          });
          return;
        } else if (!korean.test(_value) && error[name]) {
          setError({
            ...error,
            scn_address: null,
          });
        }

        _value = splitByColonInput(String(value))
          .toUpperCase()
          .replace(/[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ]*$/g, '');
      } else if (
        name === 'management_disabled' &&
        typeof _value === 'boolean'
      ) {
        _value = e.target.checked;
        if (_value) {
          _tempObj = {
            bc_management: null,
          };
        } else {
          _tempObj = {
            bc_management: beaconLastID.current,
          };
        }
      } else if (name === 'bc_management') {
        if (isNaN(Number(_value))) {
          setError({
            ...error,
            bc_management: '숫자만 입력 가능합니다.',
          });
          return;
        }
      }

      if (error?.[name])
        setError({
          ...error,
          [name]: null,
        });

      setFormData({
        ...formData,
        [name]: _value,
        ..._tempObj,
      });
    },
    [formData, error],
  );

  /**@description  table 컴포넌트 Row 클릭 이벤트 핸들러*/
  const onRowClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: BeaconType) => {
      const { bc_index: itemIndex = null } = item;
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
          bc_address: item?.bc_address
            ? splitByColonInput(item.bc_address)
                .toUpperCase()
                .replace(/[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ]*$/g, '')
            : null,
        });
        setError(initError);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRow.selectedId],
  );

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
    [pageInfo],
  );

  /**@descrition form 컴포넌트 onSubmit 핸들러 */
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const { bc_index, bc_address, bc_management } = formData;
    const _bcAddress = bc_address?.replace(/:/g, '');

    /**@description 유효성 체크 */
    const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;

    let _errorContents = null;
    if (!_bcAddress) _errorContents = 'MAC 주소를 입력해 주세요.';
    //1_비콘 MAC 주소 12자리를 모두 입력
    else if (_bcAddress.length !== 12)
      _errorContents = '비콘 MAC 주소 12 자리를 모두 입력해 주세요.';
    //2_비콘 MAC 주소 한글 입력할 수 없음
    else if (korean.test(_bcAddress))
      _errorContents = '비콘 MAC 주소에 한글을 입력할 수 없습니다.';
    //3_이미 동일한 주소의 비콘이 있음.
    else if (
      beaconsData?.find((item) => item.bc_address === _bcAddress && item) &&
      !bc_index &&
      !selectedRow.selectedId
    )
      _errorContents = '이미 사용 중인 비콘 MAC 주소입니다.';
    else _errorContents = null;
    setError({
      ...error,
      bc_address: _errorContents,
    });

    if (bc_management) {
      const findItem = beaconsData?.find(
        (item: BeaconType) => item.bc_management === Number(bc_management),
      );

      if (findItem && !selectedRow.selectedId) {
        _errorContents = '이미 사용 중인 관리번호입니다.';

        setError({
          ...error,
          bc_management: _errorContents,
        });
      }
    }

    if (_errorContents !== null) return;

    if (!bc_index && !selectedRow.selectedId) {
      // 등록
      const insertData = {
        ...formData,
        bc_address: _bcAddress ?? null,
        bc_management: !formData.management_disabled
          ? formData.bc_management
            ? Number(formData.bc_management)
            : Number(beaconLastID.current)
          : null,
      };
      dispatch(postBeacon(insertData));
      setFormData(initFormData);
      beaconLastID.current = !formData.bc_management
        ? Number(beaconLastID.current) + 1
        : beaconLastID.current;
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
    const { bc_address } = formData;
    const _bcAddress = bc_address?.replace(/:/g, '');

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
      bc_address: _bcAddress ?? null,
      bc_management: !formData.management_disabled
        ? formData.bc_management
          ? formData.bc_management
          : beaconLastID.current
        : null,
    };
    dispatch(putBeacon(updateItem));
  };

  /**@descrition delete 버튼 클릭 이벤트 핸들러 */
  const onDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number,
  ): void => {
    const findItem = beaconsData?.find(
      (item: BeaconType) => item.bc_id === id && item,
    );

    if (findItem?.wk_id || findItem?.vh_id) {
      setModalData({
        ...modalData,
        open: true,
        type: 'warning',
        header: '삭제할 수 없습니다.',
        content: (
          <div className="modal-message-box">
            <div className="modal-number">
              {`관리번호 : ${addZero(String(findItem.bc_id), 3)}`}
            </div>
            <div className="modal-address">
              {`MAC 주소 : ${splitByColonInput(findItem?.bc_address ?? '')}`}
            </div>
            <div className="modal-text">
              {`해당비콘은 ${
                findItem?.wk_id
                  ? `${findItem?.wk_name} 작업자에게`
                  : `${findItem?.vh_name} 차량에`
              } 할당되어 있어 삭제 할 수 없습니다.`}
            </div>
            <div className="modal-text">
              {`삭제하려면 먼저 ${
                findItem?.wk_id
                  ? `${findItem?.wk_name} 작업자`
                  : `${findItem?.vh_name} 차량`
              } 비콘 할당을 해제해 주십시오.`}
            </div>
          </div>
        ),
      });
    } else {
      setModalData({
        ...modalData,
        open: true,
        type: 'delete',
      });
    }
  };

  /**@descrition delete dispatch 액션 실행 함수 */
  const deleteDispatch = () => {
    const _item = selectedRow?.selectedItem ?? null;
    if (_item === null) return;
    dispatch(deleteBeacon(_item));
    initForm();
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
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
    },
    [searchData],
  );

  const onSearchAction = () => {
    /* case1)사용정보 검색 조건 O, 이름 검색 조건 O
     * case2)사용정보 검색 조건 O, 이름 검색 조건 X
     * case3)사용정보 검색 조건 X, 이름 검색 조건 O
     * case4)사용정보 검색 조건 X, 이름 검색 조건 X
     */
    const { bc_used_type: bcUsedType, name } = searchData;

    if (bcUsedType === 3) {
      const filterItems = beaconsData?.filter(
        (item) =>
          name !== null && item?.bc_address?.includes(name.toUpperCase()),
      );
      setBeaconItems(filterItems ?? []);
    } else {
      const _nameKey = bcUsedType
        ? bcUsedType === 1
          ? 'wk_name'
          : 'vh_name'
        : null;
      const filterItems = beaconsData?.filter((item: BeaconType) => {
        if (bcUsedType && name) {
          if (
            _nameKey &&
            item.bc_used_type === bcUsedType &&
            item?.[_nameKey]?.includes(name)
          )
            return item;
        } else if (bcUsedType && !name) {
          if (bcUsedType === item.bc_used_type) return item;
        } else if (!bcUsedType && name) {
          if (
            (item.wk_name &&
              item?.bc_used_type === 1 &&
              item.wk_name.includes(name)) ||
            (item.vh_name &&
              item?.bc_used_type === 2 &&
              item.vh_name.includes(name))
          )
            return item;
        } else {
          return item;
        }
      });
      if (!bcUsedType && !name) onSearchRefresh();
      else setBeaconItems(filterItems ?? []);
    }
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
    setPageInfo({
      ...pageInfo,
      activePage: 1,
    });
  };

  const onSearchRefresh = () => {
    setSearchData(initSearchData);
    setBeaconItems(beaconsData);
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
    initForm();
    setPageInfo({
      ...pageInfo,
      activePage: 1,
    });
  };

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
    <BeaconCmpt>
      <OneByTwoLayout
        inputTitle={'비콘 등록'}
        tableTitle={'비콘 목록'}
        firstRender={
          <BeaconInput
            formData={formData}
            selectedRow={selectedRow}
            modalData={modalData}
            error={error}
            onChange={onChange}
            onSubmit={onSubmit}
            setOpen={setOpen}
            beaconMgtID={Number(beaconLastID.current) + 1}
          />
        }
        secondRender={
          <BeaconTable
            data={beaconItems}
            selectedRow={selectedRow}
            onRowClick={onRowClick}
            onDelete={onDelete}
            initForm={initForm}
            pageInfo={pageInfo}
            setPageInfoHandler={setPageInfoHandler}
          />
        }
        searchRender={
          <BeaconSearch
            searchData={searchData}
            onSearchChange={onSearchChange}
            onSearchAction={onSearchAction}
            onSearchRefresh={onSearchRefresh}
          />
        }
        rightHeader
      />
    </BeaconCmpt>
  );
};

export default BeaconContainer;
