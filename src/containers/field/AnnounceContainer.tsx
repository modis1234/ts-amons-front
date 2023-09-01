import AnnounceInput from 'components/field/announce/AnnounceInput';
import AnnounceTable from 'components/field/announce/AnnounceTable';
import { useAppDispatch, useAppSelector } from 'modules/hooks';
import { ModalDataType } from 'opwsUI/form/FormElement';
import { PageInfoType, SelectedRowType } from 'opwsUI/table/types';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import storage from '../../lib/storage';
import {
  AnnounceErrorType,
  AnnounceType,
  deleteAnnounce,
  getAnnounces,
  postAnnounce,
  putAnnounce,
} from '../../modules/announces';
import initConfigData from '../../opwsUI/initConfigData';
import OneByTwoLayout from '../../opwsUI/layout/OneByTwoLayout';

const AnnounceCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

// 초기화 데이터 '../../config/initConfigData'
const {
  announce: {
    formData: initFormData,
    error: initError,
    searchData: initSearchData,
  },
} = initConfigData;

const AnnounceContainer = () => {
  const { announcesData } = useAppSelector((state) => ({
    announcesData: state.announces.data,
  }));

  const dispatch = useAppDispatch();

  const [announceItems, setAnnounceItems] = useState<AnnounceType[] | null>(
    null,
  );

  const [formData, setFormData] = useState<AnnounceType>(initFormData);
  const [error, setError] = useState<AnnounceErrorType>(initError);

  // const [searchData, setSearchData] = useState<AnnSea>(initSearchData);

  const [selectedRow, setSelectedRow] = useState<SelectedRowType<AnnounceType>>(
    {
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    },
  );
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
  }, []);

  useLayoutEffect(() => {
    if (announcesData) setAnnounceItems(announcesData);
  }, [announcesData]);

  const getDispatch = () => {
    dispatch(getAnnounces());
  };

  /**@descrition formData 초기화 */
  const initForm = useCallback(() => {
    setFormData(initFormData);
  }, []);

  const initActiveRow = () => {
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
  };

  const initPage = () => {
    setPageInfo({
      activePage: 1,
      itemsPerPage: 14,
    });
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

      if (name === 'ann_preview') {
        _value = Number(value);
      }

      if (error?.[name])
        setError({
          ...error,
          [name]: null,
        });

      setFormData({
        ...formData,
        [name]: _value,
      });
    },
    [formData],
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
    },
    [pageInfo],
  );

  /**@descrition form 컴포넌트 onSubmit 핸들러 */
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const { ann_id } = formData;

    /**@description 유효성 체크 */

    if (!ann_id && !selectedRow.selectedId) {
      // 등록
      const insertData = {
        ...formData,
        ann_writer: formData?.ann_writer ?? storage.get('user').acc_name,
      };
      dispatch(postAnnounce(insertData));
      setFormData(initFormData);
    } else {
      //수정
      setModalData({
        ...modalData,
        open: true,
        type: 'update',
      });
    }
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

  /**@descrition update dispatch action 함수 */
  const updateDispatch = () => {
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
    dispatch(putAnnounce(updateItem));
  };

  /**@description  table 컴포넌트 Row 클릭 이벤트 핸들러*/
  const onRowClick = useCallback(
    (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      item: AnnounceType,
    ) => {
      const { ann_id: itemIndex = null } = item;
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
    [selectedRow.selectedId],
  );

  /**@descrition delete 버튼 클릭 이벤트 핸들러 */
  const onDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number,
  ): void => {
    const _items: AnnounceType[] | null = announcesData;

    if (!_items) return;

    const findItem = _items.find((item) => item.ann_id === id && item);
    if (findItem) {
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
    dispatch(deleteAnnounce(_item));
    initForm();
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
  };

  return (
    <AnnounceCmpt className="announce-container">
      <OneByTwoLayout
        inputTitle="공지사항 등록"
        tableTitle="공지사항 목록"
        firstRender={
          <AnnounceInput
            formData={formData}
            selectedRow={selectedRow}
            modalData={modalData}
            error={error}
            onChange={onChange}
            onSubmit={onSubmit}
            setOpen={setOpen}
          />
        }
        secondRender={
          <AnnounceTable
            data={announceItems}
            selectedRow={selectedRow}
            onRowClick={onRowClick}
            onDelete={onDelete}
            initForm={initForm}
            pageInfo={pageInfo}
            setPageInfoHandler={setPageInfoHandler}
          />
        }
        rightHeader={false}
      />
    </AnnounceCmpt>
  );
};

export default AnnounceContainer;
