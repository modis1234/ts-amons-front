import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { getLocals, LocalsOptionType, LocalType } from '../../modules/locals';
import {
  deleteScanner,
  getScanners,
  postScanner,
  putScanner,
  ScannerErrorType,
  ScannerSearchDataType,
  ScannerType,
} from '../../modules/scanners';
import initConfigData from '../../opwsUI/initConfigData';
import {
  getLocalsOptions,
  getLocalType,
  getTunnelName,
  sortFn,
  splitByColonInput,
  getGroupKindOptions,
  getGroupKind,
} from '../../opwsUI/util';
import OneByTwoLayout from '../../opwsUI/layout/OneByTwoLayout';
import { getGroups, GroupOptionsType, GroupType } from '../../modules/groups';
import { useAppDispatch, useAppSelector } from 'modules/hooks';
import { PageInfoType, SelectedRowType } from 'opwsUI/table/types';
import { ModalDataType } from 'opwsUI/form/FormElement';

const ScannerCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

export interface ImageFileType {
  preview: boolean;
  fileName: string | null;
  file: string | Blob;
  src: string | ArrayBuffer | null;
}

// 초기화 데이터 '../../config/initConfigData'
const {
  scanner: {
    formData: initFormData,
    error: initError,
    searchData: initSearchData,
  },
} = initConfigData;
const scnGroupPrefix = 'LSA';

const ScannerContainer = () => {
  const { localsData, scannersData, groupsData, sitesData } = useAppSelector(
    (state) => {
      return {
        localsData: state.locals.data,
        scannersData: state.scanners.data,
        groupsData: state.groups.data,
        sitesData: state.sites.data,
      };
    },
  );
  const dispatch = useAppDispatch();

  const [selectedRow, setSelectedRow] = useState<SelectedRowType<ScannerType>>({
    selectedId: null,
    selectedItem: null,
    clickedIndex: null,
  });

  const [scannerItems, setScannerItems] = useState<ScannerType[] | null>(null);
  const [localItems, setLocalItems] = useState<LocalType[] | null>(null);

  const [formData, setFormData] = useState<ScannerType>(initFormData);
  const [error, setError] = useState<ScannerErrorType>(initError);

  const [searchData, setSearchData] =
    useState<ScannerSearchDataType>(initSearchData);

  const [modalData, setModalData] = useState<ModalDataType>({
    open: false,
    type: null, //type: update/delete/warning
    content: null,
  });

  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });

  const [localsOptions, setLocalsOptions] = useState<LocalsOptionType[]>([]);
  const [groupOptions, setGroupOptions] = useState<GroupOptionsType[]>([]);

  const [imageFile, setImageFile] = useState<ImageFileType>({
    preview: false,
    fileName: null,
    file: '',
    src: null,
  });

  useLayoutEffect(() => {
    dispatch(getLocals());
    dispatch(getScanners());
    dispatch(getGroups());
  }, [dispatch]);

  useEffect(() => {
    if (localsData) {
      setLocalItems(localsData);

      const _localsOption = getLocalsOptions(localsData, false);
      setLocalsOptions(_localsOption);
    }
  }, [localsData]);

  useEffect(() => {
    setScannerItems(scannersData);
  }, [scannersData]);

  useEffect(() => {
    if (groupsData) {
      const _groupOptions = getGroupKindOptions(groupsData);
      setGroupOptions(_groupOptions);
    }
  }, [groupsData]);

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
        value: string | number | null;
      };
    }) => {
      const { name, value } = rest?.option ? rest.option : e.target;
      let _value = value;
      let _tempValue = {};
      if (name === 'scn_address') {
        /**@description 유효성 체크 */
        const korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
        if (typeof _value === 'string' && korean.test(_value)) {
          setError({
            ...error,
            scn_address: '비콘 MAC 주소에 한글을 입력할 수 없습니다.',
          });
          return;
        } else if (
          typeof _value === 'string' &&
          !korean.test(_value) &&
          error[name]
        ) {
          setError({
            ...error,
            scn_address: null,
          });
        }
        _value =
          typeof value === 'string'
            ? splitByColonInput(value)
                .toUpperCase()
                .replace(/[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ]*$/g, '')
            : _value;
      } else if (name === 'scn_group') {
        const _findGroupItem = groupsData?.find(
          (item: GroupType) => item.group_name === value,
        );

        _tempValue = {
          group_id: _findGroupItem?.group_id ?? null,
          group_name: _findGroupItem?.group_name ?? null,
          group_kind: _findGroupItem?.group_kind ?? null,
          group_pos_x: _findGroupItem?.group_pos_x ?? null,
          group_count: _findGroupItem?.group_count ?? null,
          group_description: _findGroupItem?.group_description ?? null,
        };
      } else if (name === 'scn_port') {
        // eslint-disable-next-line no-restricted-globals
        const _isNaN = isNaN(Number(_value));
        if (_isNaN) {
          setError({
            ...error,
            [name]: 'PORT는 숫자만 입력 가능합니다.',
          });
          return;
        } else {
          setError({
            ...error,
            [name]: null,
          });
        }
      } else if (name === 'scn_pos_x') {
        // eslint-disable-next-line no-restricted-globals
        const _isNaN = isNaN(Number(_value));
        if (_isNaN) {
          _value = Number(_value);
        }
      } else if (name === 'local_index') {
        const findLocal = localsData?.find(
          (item) => item.local_index === value && item,
        );
        _tempValue = {
          local_name: findLocal?.local_name ?? null,
          local_type: findLocal?.local_type ?? null,
          local_area: findLocal?.local_area ?? null,
          scn_pos_x: undefined,
        };

        const _filterGroupOptions = groupsData?.filter(
          (item) => item.local_index === value && item,
        );
        const _groupOptions = getGroupKindOptions(_filterGroupOptions ?? []);
        setGroupOptions(_groupOptions ?? []);

        setError(initError);
      } else if (name === 'local_area') {
        const _filterLocal = value
          ? localsData?.filter((item) => item.local_area === value)
          : localsData;
        const _localsOption = getLocalsOptions(_filterLocal ?? []);
        setLocalsOptions(_localsOption);
        _tempValue = {
          local_index: undefined,
        };
      } else _value = value;

      if (error?.[name])
        setError({
          ...error,
          [name]: null,
        });

      setFormData({
        ...formData,
        [name]: _value,
        ..._tempValue,
      });
    },
    [formData, error, localsData, groupsData],
  );

  /**@description  table 컴포넌트 Row 클릭 이벤트 핸들러*/
  const onRowClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: ScannerType) => {
      const { scn_id: itemId = null, scn_image } = item;
      if (itemId === selectedRow.selectedId) {
        setSelectedRow({
          selectedId: null,
          selectedItem: null,
          clickedIndex: null,
        });

        setFormData(initFormData);
        setImageFile({
          preview: false,
          fileName: null,
          file: '',
          src: null,
        });

        const _groupOptions = getGroupKindOptions(groupsData ?? []);
        setGroupOptions(_groupOptions);
      } else {
        setSelectedRow({
          selectedId: itemId,
          selectedItem: item,
          clickedIndex: itemId,
        });

        setImageFile({
          ...imageFile,
          fileName: scn_image,
          preview: scn_image ? true : false,
          // src: null,
        });

        setFormData({
          ...item,
          scn_address: item?.scn_address
            ? splitByColonInput(item.scn_address)
                .toUpperCase()
                .replace(/[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ]*$/g, '')
            : null,
        });
        setError(initError);
        const _filterGroupOptions = groupsData?.filter(
          (group: GroupType) => group.local_index === item.local_index && item,
        );
        const _groupOptions = getGroupKindOptions(_filterGroupOptions ?? []);
        setGroupOptions(_groupOptions);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRow.selectedId, groupsData],
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
  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const { scn_id, scn_index, scn_address } = formData;
    const _scnAddress = scn_address?.replace(/:/g, '');

    if (!scn_id && !selectedRow.selectedId) {
      // 등록
      const createData = new FormData();
      let postData = {
        ...formData,
        scn_image: imageFile.src ? imageFile.fileName : formData.scn_image,
        scn_address: scn_address?.replaceAll(':', '') ?? null,
      };

      const updatedKeys = {};
      // eslint-disable-next-line no-restricted-syntax

      postData = {
        ...postData,
        ...updatedKeys,
      };

      createData.append('file', imageFile.file ?? null);
      createData.append('reqBody', JSON.stringify(postData));
      try {
        await dispatch(postScanner(createData));
        setFormData(initFormData);
        setImageFile({
          preview: false,
          fileName: null,
          file: '',
          src: null,
        });
      } catch (error) {
        console.log('POST ERROR!!');
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

  /**@descrition update dispatch action 함수 */
  const updateDispatch = async () => {
    //수정

    const { scn_address, scn_group } = formData;

    let putData = {
      ...formData,
      scn_image: imageFile.src ? imageFile.fileName : formData.scn_image,
      scn_address: scn_address?.replaceAll(':', '') ?? null,
    };

    const updatedKeys = {};

    // eslint-disable-next-line no-restricted-syntax
    // for (let key in putData) {
    //   if (putData[key] !== selectedRow.selectedItem[key]) {
    //     updatedKeys[`u_${key}`] = true;
    //   }
    // }
    putData = {
      ...putData,
      ...updatedKeys,
    };
    const updateData = new FormData();

    updateData.append('file', imageFile.file ?? null);
    updateData.append('reqBody', JSON.stringify(putData));
    try {
      await dispatch(putScanner(updateData));
    } catch (error) {
      console.log('UPDATE ERROR!!');
    }
  };

  /**@descrition delete 버튼 클릭 이벤트 핸들러 */
  const onDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number,
  ) => {
    const findItem = scannersData?.find((item) => item.scn_id === id && item);
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

    try {
      if (_item === null) return;
      await dispatch(deleteScanner(_item));
      initForm();
      setSelectedRow({
        selectedId: null,
        selectedItem: null,
        clickedIndex: null,
      });
    } catch (error) {
      console.log('DELETE FAIL');
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
  /**@description Search Action Area*/

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
      let _value;

      if (name === 'scn_address')
        _value =
          typeof value === 'string'
            ? splitByColonInput(value)
                .toUpperCase()
                .replace(/[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ]*$/g, '')
            : value;
      else _value = value;

      setSearchData({
        ...searchData,
        [name]: _value,
      });
    },
    [searchData],
  );

  const onSearchAction = () => {
    /* case1)노선 검색 조건 O, MAC주소 검색 조건 O
     * case2)노선 검색 조건 O, MAC주소 검색 조건 X
     * case3)노선 검색 조건 X, MAC주소 검색 조건 O
     * case4)노선 검색 조건 X, MAC주소 검색 조건 X
     */
    const { local_index: localIndex, scn_address: scnAddress } = searchData;
    const filterItems = scannersData?.filter((item) => {
      const _scnAddress = scnAddress
        ? scnAddress.replace(/:/g, '').toUpperCase().substring(0, 12)
        : null;
      if (localIndex && scnAddress) {
        // case1
        if (
          typeof _scnAddress === 'string' &&
          item?.scn_address &&
          localIndex === item.local_index &&
          item.scn_address.includes(_scnAddress)
        )
          return item;
      } else if (localIndex && !scnAddress) {
        // case2
        if (localIndex === item.local_index) return item;
      } else if (!localIndex && scnAddress) {
        // case3
        if (
          typeof _scnAddress === 'string' &&
          item?.scn_address &&
          item?.scn_address.includes(_scnAddress)
        )
          return item;
      } else {
        // case4
        return item;
      }
      setPageInfo({ ...pageInfo, activePage: 1 });
    });

    if (!localIndex && !scnAddress) onSearchRefresh();
    else setScannerItems(filterItems ?? []);
  };

  const onSearchRefresh = () => {
    setSearchData(initSearchData);
    setScannerItems(scannersData);
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
    setFormData(initFormData);

    setPageInfo({
      ...pageInfo,
      activePage: 1,
    });
  };

  // imageUpload
  /**@description image input onchange핸들러 */
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      const theFile = target?.files ? target?.files[0] : null;
      if (!theFile) return;

      if (theFile) {
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (finishedEvent) => {
          if (theFile.name.includes('#')) {
            setError({
              ...error,
              scn_image: '파일명에 # 특수문자를 제거 해주세요.',
            });
            setImageFile({
              preview: false,
              fileName: null,
              file: '',
              src: null,
            });
            return;
          } else if (error?.scn_image) {
            setError({
              ...error,
              scn_image: null,
            });
          }

          setImageFile({
            ...imageFile,
            fileName: theFile.name,
            file: theFile,
            src: reader?.result ?? null,
          });
        };
      }
    },
    [imageFile],
  );

  const onPreview = () => {
    setImageFile({
      ...imageFile,
      preview: !imageFile.preview,
    });
  };

  /**@description image input 이미지 지우기 */
  const onImageRemove = () => {
    setImageFile({
      preview: false,
      fileName: null,
      file: '',
      src: null,
    });
  };

  /**@description image input upload 버튼 이벤트(장비 등록시 필요) */
  const onUpload = () => {};

  return (
    <ScannerCmpt>
      <OneByTwoLayout
        inputTitle="스캐너 등록"
        tableTitle="스캐너 목록"
        firstRender={
          sitesData &&
          localsOptions && (
            // <ScannerInput
            //   formData={formData}
            //   error={error}
            //   selectedRow={selectedRow}
            //   modalData={modalData}
            //   onChange={onChange}
            //   onSubmit={onSubmit}
            //   setOpen={setOpen}
            //   // ...rest
            //   localsOptions={localsOptions}
            //   scnGroupPrefix={scnGroupPrefix}
            //   groupOptions={groupOptions}
            //   imageFile={imageFile}
            //   handleFileInputChange={handleFileInputChange}
            //   onPreview={onPreview}
            //   onImageRemove={onImageRemove}
            //   onUpload={onUpload}
            //   siteItem={sitesData[0]}
            // />
            <div></div>
          )
        }
        secondRender={
          sitesData && (
            // <ScannerTable
            //   data={scannerItems}
            //   selectedRow={selectedRow}
            //   onRowClick={onRowClick}
            //   onDelete={onDelete}
            //   initForm={initForm}
            //   pageInfo={pageInfo}
            //   setPageInfoHandler={setPageInfoHandler}
            //   siteItem={sitesData[0]}
            // />
            <div></div>
          )
        }
        searchRender={
          localsOptions && (
            // <ScannerSearch
            //   localsOptions={localsOptions}
            //   searchData={searchData}
            //   onSearchChange={onSearchChange}
            //   onSearchAction={onSearchAction}
            //   onSearchRefresh={onSearchRefresh}
            // />
            <div></div>
          )
        }
        rightHeader
      />
    </ScannerCmpt>
  );
};

export default ScannerContainer;
