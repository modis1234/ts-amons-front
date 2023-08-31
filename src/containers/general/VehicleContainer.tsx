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

import initConfigData from '../../opwsUI/initConfigData';
import OneByTwoLayout from '../../opwsUI/layout/OneByTwoLayout';
import {
  deleteVehicle,
  getVehicles,
  postVehicle,
  putVehicle,
  VehicleErrorType,
  VehicleSearchDataType,
  VehicleType,
} from 'modules/vehicles';
import { BeaconType, getUnUsedBeacons } from '../../modules/beacons';
import { getCompanies } from '../../modules/companies';
import {
  isKorean,
  sortFn,
  splitByColonInput,
  zeroFill,
} from '../../opwsUI/util';
import VehicleInput from 'components/general/vehicle/VehicleInput';
import VehicleTable from 'components/general/vehicle/VehicleTable';
import VehicleSearch from 'components/general/vehicle/VehicleSearch';

const VehicleCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

export interface OptionsType {
  key: number;
  text: string | null;
  value: string | number | null;
}

export interface BeaconOptionsType extends OptionsType {
  address?: string;
  mgtNumber?: number;
  used?: boolean;
}

export interface ImageFileType {
  preview: boolean;
  fileName: string | null;
  file: string | Blob;
  src: string | ArrayBuffer | null;
}

// 초기화 데이터 '../../config/initConfigData'
const {
  vehicle: {
    formData: initFormData,
    error: initError,
    searchData: initSearchData,
  },
} = initConfigData;

const VehicleContainer = () => {
  const { vehiclesData, companiesData, beaconsData } = useAppSelector(
    (state) => {
      return {
        vehiclesData: state.vehicles.data,
        companiesData: state.companies.data,
        beaconsData: state.beacons.data,
      };
    },
  );

  const dispatch = useAppDispatch();

  const [selectedRow, setSelectedRow] = useState<SelectedRowType<VehicleType>>({
    selectedId: null,
    selectedItem: null,
    clickedIndex: null,
  });

  const [vehicleItems, setVehicleItems] = useState<VehicleType[] | null>(null);

  const [formData, setFormData] = useState<VehicleType>(initFormData);
  const [error, setError] = useState<VehicleErrorType>(initError);
  const [searchData, setSearchData] =
    useState<VehicleSearchDataType>(initSearchData);

  const [imageFile, setImageFile] = useState<ImageFileType>({
    preview: false,
    fileName: null,
    file: '',
    src: null,
  });

  const [modalData, setModalData] = useState<ModalDataType>({
    open: false,
    type: null, //type: update/delete/warning
    content: null,
  });

  const [pageInfo, setPageInfo] = useState<PageInfoType>({
    activePage: 1, // 현재 페이지
    itemsPerPage: 14, // 페이지 당 item 수
  });

  const [companyOptions, setCompanyOptions] = useState<OptionsType[]>([]);
  const [beaconOptions, setBeaconOptions] = useState<BeaconOptionsType[]>([]);

  useLayoutEffect(() => {
    getDispatch();
  }, [dispatch]);

  useEffect(() => {
    if (companiesData) {
      const _companiesOption = companiesData.reduce(
        (acc: Array<OptionsType>, curr, index) => {
          const { co_id, co_name } = curr;
          const tempObj = {
            key: index,
            text: co_name,
            value: co_id,
          };
          acc.push(tempObj);
          return acc;
        },
        [],
      );
      setCompanyOptions(_companiesOption);
    }

    if (beaconsData) {
      const sortBeaconsData = sortFn(beaconsData, 'bc_address');
      const _beaconsOption = sortBeaconsData.reduce(
        (acc, curr, index) => {
          const { bc_id, bc_index, bc_address, bc_management } = curr;
          const tempObj = {
            key: bc_id,
            text: `${
              bc_management ? zeroFill(bc_management, 3) : '000'
            } - ${splitByColonInput(bc_address)}`,
            address: splitByColonInput(bc_address),
            mgtNumber: bc_management,
            value: bc_index,
            used: false,
          };
          acc.push(tempObj);
          return acc;
        },
        [{ key: 0, text: '할당 없음', value: 0 }],
      );
      if (!formData.bc_id) {
        setBeaconOptions(_beaconsOption);
      } else {
        // eslint-disable-next-line no-debugger
        setBeaconOptionHandler(formData, _beaconsOption);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companiesData, beaconsData]);

  useEffect(() => {
    if (vehiclesData) {
      // setVehicleItems(vehiclesData);
      if (searchData.bc_address || searchData.co_id || searchData.vh_name) {
        filterVehicleItems(vehiclesData);
      } else {
        setVehicleItems(vehiclesData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehiclesData]);

  const getDispatch = () => {
    dispatch(getVehicles());
    dispatch(getCompanies());
    dispatch(getUnUsedBeacons());
  };

  /**@descrition formData 초기화 */
  const initForm = useCallback(() => {
    setFormData(initFormData);
    setImageFile({
      preview: false,
      fileName: null,
      file: '',
      src: null,
    });
  }, []);

  /**@descrition pageInfo setting Handler */
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
      if (name === 'bc_index') {
        const _findObj = beaconOptions.find(
          (option) => option.value === value && option,
        );
        _tempValue = {
          bc_address: _findObj ? _findObj?.address?.replace(/:/g, '') : null,
          bc_management: _findObj ? _findObj?.mgtNumber : null,
        };
      } else if (name === 'co_id') {
        const _findObj = companyOptions.find(
          (option) => option.value === value && option,
        );
        _tempValue = {
          co_name: _findObj ? _findObj?.text : null,
        };
      }

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
    [formData, beaconOptions, companyOptions, error],
  );

  /**@description  table 컴포넌트 Row 클릭 이벤트 핸들러*/
  const onRowClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: VehicleType) => {
      const { vh_index: itemIndex = null, vh_image } = item;
      if (itemIndex === selectedRow.selectedId) {
        setSelectedRow({
          selectedId: null,
          selectedItem: null,
          clickedIndex: null,
        });
        initForm();
        const _tempBeaconOptions = beaconOptions.filter(
          (item) => !item.used && item,
        );
        setBeaconOptions(_tempBeaconOptions);
      } else {
        setSelectedRow({
          selectedId: itemIndex,
          selectedItem: item,
          clickedIndex: itemIndex,
        });
        setImageFile({
          ...imageFile,
          fileName: vh_image,
        });
        setFormData({
          ...item,
        });
        setError(initError);
        setBeaconOptionHandler(item, beaconOptions);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRow.selectedId, beaconOptions],
  );

  /**@descrition form 컴포넌트 onSubmit 핸들러 */
  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const { vh_index: index } = formData;

    /**@description 유효성 체크 */
    if (!formData.co_id) {
      setError({
        ...error,
        co_id: '소속사를 입력해 주세요.',
      });
      return false;
    } else if (!formData.vh_name || formData.vh_name.length < 1) {
      setError({
        ...error,
        vh_name: '차량 종류를 입력해 주세요.',
      });
      return false;
    } else if (!formData.vh_number || formData.vh_number.length < 1) {
      setError({
        ...error,
        vh_number: '차량 번호를 입력해 주세요.',
      });
      return false;
    }

    if (!index && !selectedRow.selectedId) {
      // 등록

      const createData = new FormData();
      let postData = {
        ...formData,
        vh_image: imageFile.src ? imageFile.fileName : formData.vh_image,
        bc_index: formData.bc_index ? formData.bc_index : null,
      };
      const updatedKeys = {};

      // // eslint-disable-next-line no-restricted-syntax
      // for (let key in postData) {
      //   if (key !== undefined || key !== null) {
      //     updatedKeys[`u_${key}`] = true;
      //   }
      // }

      postData = {
        ...postData,
        ...updatedKeys,
      };
      createData.append('file', imageFile.file ?? null);
      createData.append('reqBody', JSON.stringify(postData));

      try {
        await dispatch(postVehicle(createData));
        setFormData(initFormData);
        if (postData.bc_index) {
          dispatch(getUnUsedBeacons());
        }
        initForm();
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
    let putData = { ...formData };

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
      bc_index: formData.bc_index ? formData.bc_index : null,
      vh_image: imageFile.src ? imageFile.fileName : formData.vh_image,
    };
    const updateData = new FormData();

    updateData.append('file', imageFile.file ?? null);
    updateData.append('reqBody', JSON.stringify(putData));
    try {
      await dispatch(putVehicle(updateData));
      dispatch(getUnUsedBeacons());
      dispatch(getUnUsedBeacons());
      setFormData({
        ...putData,
        vh_image: imageFile.fileName,
      });
      setImageFile({
        preview: false,
        fileName: imageFile.fileName,
        file: '',
        src: null,
      });
    } catch (error) {
      console.log('UPDATE ERROR!!');
    }
  };

  /**@descrition delete 버튼 클릭 이벤트 핸들러 */
  const onDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number,
  ) => {
    const findItem =
      vehiclesData?.find((item) => item.vh_id === id && item) ?? null;
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
      await dispatch(deleteVehicle(_item));
      dispatch(getUnUsedBeacons());

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

  // imageUpload
  /**@description image input onchange핸들러 */
  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      // const { target } = e;
      const target = e.target as HTMLInputElement;
      const theFile = target?.files ? target?.files[0] : null;
      if (!theFile) return;
      console.log('theFile->', theFile);
      if (theFile) {
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (finishedEvent) => {
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

  /**@description image input 미리보기 */
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

  // const onImageRemove = () => {
  //   setImageFile({
  //     preview: false,
  //     fileName: formData.vh_image ? formData.vh_image : null,
  //     file: null,
  //     src: formData.vh_image ? formData.vh_image : null,
  //   });
  // };

  /**@description image input upload 버튼 이벤트(장비 등록시 필요) */
  const onUpload = () => {};

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

      let _value;
      let _tempObj = {};
      if (name === 'bc_address') {
        const _isKorean = typeof value === 'string' ? isKorean(value) : false;
        if (_isKorean) {
          setError({
            ...error,
            bc_address: '영어 또는 숫자만 입력 가능합니다.',
          });
          return;
        } else if (!_isKorean && error?.bc_address) {
          setError({
            ...error,
            bc_address: null,
          });
        }
        _value =
          typeof value === 'string'
            ? value
                .toUpperCase()
                .replace(/[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ]*$/g, '')
            : value;
      } else if (name === 'vh_search') {
        if (value) {
          _tempObj = {
            bc_address: null,
          };
        } else {
          _tempObj = {
            co_id: null,
            vh_name: null,
          };
        }
        _value = value;

        setVehicleItems(vehiclesData);
        setSelectedRow({
          selectedId: null,
          selectedItem: null,
          clickedIndex: null,
        });
        setPageInfo({
          ...pageInfo,
          activePage: 1,
        });
        initForm();
      } else _value = value;

      setSearchData({
        ...searchData,
        [name]: _value,
        ..._tempObj,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchData, vehiclesData],
  );

  const onSearchAction = () => {
    filterVehicleItems(vehiclesData ?? []);

    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
    setPageInfo({
      ...pageInfo,
      activePage: 1,
    });
    initForm();
  };

  const onSearchRefresh = () => {
    setSearchData({ ...initSearchData, vh_search: searchData.vh_search });
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
    initForm();
    setVehicleItems(vehiclesData);
  };

  const filterVehicleItems = (items: VehicleType[]) => {
    const { co_id: coId, vh_name, vh_search, bc_address } = searchData;

    if (vh_search) {
      /* case1)소속사 검색 조건 O, 이름 검색 조건 O
       * case2)소속사 검색 조건 O, 이름 검색 조건 X
       * case3)소속사 검색 조건 X, 이름 검색 조건 X
       * case2)소속사 검색 조건 X, 이름 검색 조건 X
       */
      const _replaceStr = vh_name ? vh_name.replace(/ /gi, '') : null;
      const vhName =
        _replaceStr && _replaceStr.length !== 0 ? _replaceStr : null;

      const filterItems =
        vehiclesData?.filter((item) => {
          if (coId && vhName) {
            // case1
            if (
              coId === item.co_id &&
              item?.vh_name &&
              item.vh_name.includes(vhName)
            )
              return item;
          } else if (coId && !vhName) {
            // case2
            if (coId === item.co_id) return item;
          } else if (!coId && vhName) {
            // case3
            if (item?.vh_name && item.vh_name.includes(vhName)) return item;
          } else {
            // case4
            return item;
          }
        }) ?? [];
      setVehicleItems(filterItems);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (bc_address) {
        const filterItems = items.filter(
          (item) =>
            item?.bc_address && item.bc_address.includes(bc_address) && item,
        );
        setVehicleItems(filterItems);
      } else {
        setVehicleItems(vehiclesData);
      }
    }
  };

  const setBeaconOptionHandler = (
    item: VehicleType,
    options: BeaconOptionsType[],
  ) => {
    if (item.bc_index) {
      const optionItem = options.find(
        (option) => option.used && option.key !== item.bc_id && option,
      );
      if (!optionItem) {
        const _tempBeaconOption = {
          key: Number(item.bc_id),
          text: `${zeroFill(item?.bc_management ?? 0, 3)} - ${
            item.bc_address ? splitByColonInput(item.bc_address) : ''
          }`,
          value: item.bc_index,
          used: true,
        };

        setBeaconOptions([...options, ...[_tempBeaconOption]]);
      } else {
        const _tempBeaconOptions = options.map((option) =>
          option.used && option.value !== item.bc_address
            ? {
                ...option,
                key: Number(item.bc_id),
                text: `${zeroFill(item?.bc_management ?? 0, 3)} - ${
                  item.bc_address ? splitByColonInput(item.bc_address) : ''
                }`,
                value: item.bc_index,
              }
            : option,
        );
        setBeaconOptions(_tempBeaconOptions);
      }
    } else {
      const _tempBeaconOptions = options.filter(
        (option) => !option.used && option,
      );
      setBeaconOptions(_tempBeaconOptions);
    }
  };

  return (
    <VehicleCmpt>
      <OneByTwoLayout
        inputTitle="차량 등록"
        tableTitle="차량 목록"
        firstRender={
          <VehicleInput
            formData={formData}
            error={error}
            selectedRow={selectedRow}
            modalData={modalData}
            onChange={onChange}
            onSubmit={onSubmit}
            setOpen={setOpen}
            // ...rest
            companyOptions={companyOptions}
            beaconOptions={beaconOptions}
            imageFile={imageFile}
            handleFileInputChange={handleFileInputChange}
            onPreview={onPreview}
            onImageRemove={onImageRemove}
            onUpload={onUpload}
            // scnGroupPrefix={scnGroupPrefix}
          />
        }
        secondRender={
          <VehicleTable
            data={vehicleItems}
            selectedRow={selectedRow}
            onRowClick={onRowClick}
            onDelete={onDelete}
            initForm={initForm}
            pageInfo={pageInfo}
            setPageInfoHandler={setPageInfoHandler}
          />
        }
        searchRender={
          <VehicleSearch
            searchData={searchData}
            onSearchChange={onSearchChange}
            onSearchAction={onSearchAction}
            onSearchRefresh={onSearchRefresh}
            error={error}
            // ...rest
            companyOptions={companyOptions}
          />
        }
        rightHeader
      />
    </VehicleCmpt>
  );
};

export default VehicleContainer;
