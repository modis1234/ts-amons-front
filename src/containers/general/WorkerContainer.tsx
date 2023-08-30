import WorkerInput from "components/general/worker/WorkerInput";
import WorkerSearch from "components/general/worker/WorkerSearch";
import WorkerTable from "components/general/worker/WorkerTable";
import { useAppDispatch, useAppSelector } from "modules/hooks";
import moment from "moment";
import { ModalDataType } from "opwsUI/form/FormElement";
import { PageInfoType, SelectedRowType } from "opwsUI/table/types";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
// import WorkerInput from '../../components/general/worker/WorkerInput';
// import WorkerSearch from '../../components/general/worker/WorkerSearch';
// import WorkerTable from '../../components/general/worker/WorkerTable';
import { BeaconType, getUnUsedBeacons } from "../../modules/beacons";
import { getCompanies } from "../../modules/companies";
import {
  deleteWorker,
  getWorkers,
  postWorker,
  putWorker,
  WorkerErrorType,
  WorkerSearchDataType,
  WorkerType,
} from "../../modules/workers";
import initConfigData from "../../opwsUI/initConfigData";
import OneByTwoLayout from "../../opwsUI/layout/OneByTwoLayout";
import {
  autoHypenPhone,
  isKorean,
  sortFn,
  splitByColonInput,
  zeroFill,
} from "../../opwsUI/util";

const WorkerCmpt = styled.div`
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
  worker: {
    formData: initFormData,
    error: initError,
    searchData: initSearchData,
  },
} = initConfigData;

const WorkerContainer = () => {
  const { workersData, companiesData, beaconsData } = useAppSelector(
    (state) => {
      return {
        workersData: state.workers.data,
        companiesData: state.companies.data,
        beaconsData: state.beacons.data,
      };
    }
  );

  const dispatch = useAppDispatch();

  const [selectedRow, setSelectedRow] = useState<SelectedRowType<WorkerType>>({
    selectedId: null,
    selectedItem: null,
    clickedIndex: null,
  });

  const [workerItems, setWorkerItems] = useState<WorkerType[] | null>(null);

  const [formData, setFormData] = useState<WorkerType>(initFormData);
  const [error, setError] = useState<WorkerErrorType>(initError);
  const [searchData, setSearchData] =
    useState<WorkerSearchDataType>(initSearchData);

  const [imageFile, setImageFile] = useState<ImageFileType>({
    preview: false,
    fileName: null,
    file: "",
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

  const [smsDisabled, setSmsDisabled] = useState<boolean>(false);

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
        []
      );
      setCompanyOptions(_companiesOption);
    }

    if (beaconsData) {
      const sortBeaconsData = sortFn(beaconsData, "bc_address");
      const _beaconsOption = sortBeaconsData.reduce(
        (acc, curr, index) => {
          const { bc_id, bc_index, bc_address, bc_management } = curr;
          const tempObj = {
            key: bc_id,
            text: `${
              bc_management ? zeroFill(bc_management, 3) : "000"
            } - ${splitByColonInput(bc_address)}`,
            address: splitByColonInput(bc_address),
            mgtNumber: bc_management,
            value: bc_index,
            used: false,
          };
          acc.push(tempObj);
          return acc;
        },
        [{ key: 0, text: "할당 없음", value: 0 }]
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
    if (workersData) {
      if (searchData.bc_address || searchData.co_id || searchData.wk_name) {
        filterWorkerItems(workersData);
      } else {
        setWorkerItems(workersData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workersData]);

  /**@descrition pageInfo setting Handler */
  useEffect(() => {
    const filterItems = workersData?.filter((item) => item?.wk_sms_yn === 1);
    const itemLength: number = filterItems?.length ?? 0;
    if (
      itemLength >= 10 ||
      (itemLength >= 10 && selectedRow?.selectedItem?.wk_sms_yn === 0)
    ) {
      setSmsDisabled(true);
    }
    if (itemLength >= 10 && selectedRow?.selectedItem?.wk_sms_yn === 1) {
      setSmsDisabled(false);
    }

    // setSmsDisabled();
  }, [workersData, selectedRow.selectedId]);

  const getDispatch = () => {
    dispatch(getWorkers());
    dispatch(getCompanies());
    dispatch(getUnUsedBeacons());
  };

  /**@descrition formData 초기화 */
  const initForm = useCallback(() => {
    setFormData(initFormData);
    setImageFile({
      preview: false,
      fileName: null,
      file: "",
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
      setSelectedRow({
        selectedId: null,
        selectedItem: null,
        clickedIndex: null,
      });
    },
    [pageInfo]
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
      if (name === "bc_index") {
        const _findObj = beaconOptions?.find(
          (option) => option.value === value && option
        );

        _tempValue = {
          bc_address: _findObj ? _findObj?.address?.replace(/:/g, "") : null,
          bc_management: _findObj ? _findObj?.mgtNumber : null,
        };
      } else if (name === "co_id") {
        const _findObj = companyOptions?.find(
          (option) => option.value === value && option
        );
        _tempValue = {
          co_name: _findObj ? _findObj?.text : null,
        };
      } else if (name === "wk_phone") {
        _value = autoHypenPhone(String(_value));
      } else if (name === "wk_sms_yn") {
        _value = e.target.checked ? 1 : 0;
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
    [formData, beaconOptions, companyOptions, error]
  );

  const onChangeDate = (
    e: React.ChangeEvent<HTMLInputElement>,
    date: Date | string
  ) => {
    setFormData({
      ...formData,
      wk_birth: moment(date).format("YYYY-MM-DD"),
    });
  };

  /**@description  table 컴포넌트 Row 클릭 이벤트 핸들러*/
  const onRowClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: WorkerType) => {
      const { wk_index: itemIndex = null, wk_image = null } = item;
      if (itemIndex === selectedRow.selectedId) {
        setSelectedRow({
          selectedId: null,
          selectedItem: null,
          clickedIndex: null,
        });
        initForm();
        const _tempBeaconOptions =
          beaconOptions?.filter((item) => !item.used && item) ?? [];
        setBeaconOptions(_tempBeaconOptions);
      } else {
        setSelectedRow({
          selectedId: itemIndex,
          selectedItem: item,
          clickedIndex: itemIndex,
        });
        setImageFile({
          ...imageFile,
          fileName: wk_image,
          // src: wk_image,
        });
        setFormData({
          ...item,
        });
        setError(initError);
        setBeaconOptionHandler(item, beaconOptions);
      }
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRow.selectedId, beaconOptions]
  );

  /**@descrition form 컴포넌트 onSubmit 핸들러 */
  const onSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const { wk_index: index } = formData;

    /**@description 유효성 체크 */
    if (!formData.co_id) {
      setError({
        ...error,
        co_id: "소속사를 입력해 주세요.",
      });
      return false;
    } else if (!formData.wk_name || formData.wk_name.length < 1) {
      setError({
        ...error,
        wk_name: "이름을 입력해 주세요.",
      });
      return false;
    }

    if (!index && !selectedRow.selectedId) {
      // 등록

      const createData = new FormData();
      let postData = {
        ...formData,
        wk_index: imageFile.src ? imageFile.fileName : formData.wk_index,
        bc_index: formData.bc_index ? formData.bc_index : null,
      };
      const updatedKeys = {};

      // eslint-disable-next-line no-restricted-syntax
      // for (let key in postData) {
      //   if (key !== undefined || key !== null) {
      //     updatedKeys[`u_${key}`] = true;
      //   }
      // }

      postData = {
        ...postData,
        ...updatedKeys,
      };
      createData.append("file", imageFile.file);
      createData.append("reqBody", JSON.stringify(postData));

      try {
        await dispatch(postWorker(createData));
        setFormData(initFormData);
        if (postData.bc_index) {
          dispatch(getUnUsedBeacons());
        }
        initForm();
      } catch (error) {
        console.log("POST ERROR!!");
      }
    } else {
      //수정
      setModalData({
        ...modalData,
        open: true,
        type: "update",
      });
    }
  };

  /**@descrition modal button Action */
  const setOpen = ({ action, open }: { action: boolean; open: boolean }) => {
    setModalData((prev) => {
      if (prev.type === "update" && action) updateDispatch();
      else if (prev.type === "delete" && action) deleteDispatch();

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
      // bc_index: formData.bc_index ? formData.bc_index : null,
      wk_image: imageFile.src ? imageFile.fileName : null,
    };
    const updateData = new FormData();

    updateData.append("file", imageFile?.file ?? null);
    updateData.append("reqBody", JSON.stringify(putData));
    try {
      await dispatch(putWorker(updateData));
      dispatch(getUnUsedBeacons());
      setFormData({
        ...putData,
        wk_image: imageFile.fileName,
      });
      setImageFile({
        preview: false,
        fileName: imageFile.fileName,
        file: "",
        src: null,
      });
    } catch (error) {
      console.log("UPDATE ERROR!!");
    }
  };

  /**@descrition delete 버튼 클릭 이벤트 핸들러 */
  const onDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number
  ) => {
    const findItem =
      workersData?.find((item) => item.wk_id === id && item) ?? null;
    if (findItem) {
      setModalData({
        ...modalData,
        open: true,
        type: "delete",
      });
    }
  };

  /**@descrition delete dispatch 액션 실행 함수 */
  const deleteDispatch = async () => {
    const _item = selectedRow?.selectedItem ?? null;

    try {
      if (_item === null) return;
      await dispatch(deleteWorker(_item));
      dispatch(getUnUsedBeacons());
      initForm();
      setSelectedRow({
        selectedId: null,
        selectedItem: null,
        clickedIndex: null,
      });
    } catch (error) {
      console.log("DELETE FAIL");
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
      console.log("theFile->", theFile);
      if (theFile) {
        const reader = new FileReader();
        reader.readAsDataURL(theFile);
        reader.onloadend = (finishedEvent) => {
          // const {
          //   currentTarget: { result },
          // } = finishedEvent;
          console.log("reader->", reader.result);
          console.log("finishedEvent->", finishedEvent);
          console.log("currentTarget->", finishedEvent.currentTarget);

          // const result = finishedEvent.currentTarget?.result
          //   ? finishedEvent.currentTarget?.result
          //   : null;

          setImageFile({
            ...imageFile,
            fileName: theFile.name,
            file: theFile,
            src: reader?.result ?? null,
          });
        };
      }
    },
    [imageFile]
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
      file: "",
      src: null,
    });
  };

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
      if (name === "bc_address") {
        const _isKorean = typeof value === "string" ? isKorean(value) : false;
        if (_isKorean) {
          setError({
            ...error,
            bc_address: "영어 또는 숫자만 입력 가능합니다.",
          });
          return;
        } else if (!_isKorean && error?.bc_address) {
          setError({
            ...error,
            bc_address: null,
          });
        }
        _value =
          typeof value === "string"
            ? value
                .toUpperCase()
                .replace(/[^a-z|^A-Z|^0-9|^ㄱ-ㅎ|^ㅏ-ㅣ]*$/g, "")
            : value;
      } else if (name === "wk_search") {
        if (value) {
          _tempObj = {
            bc_address: undefined,
          };
        } else {
          _tempObj = {
            co_id: undefined,
            wk_name: undefined,
          };
        }
        _value = value;
        setWorkerItems(workersData);
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
    [searchData, workersData]
  );

  const onSearchAction = () => {
    filterWorkerItems(workersData ?? []);

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
    setSearchData({ ...initSearchData, wk_search: searchData.wk_search });
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
    initForm();
    setWorkerItems(workersData);
  };

  const filterWorkerItems = (items: WorkerType[]) => {
    const { co_id: coId, wk_name, wk_search, bc_address } = searchData;

    if (wk_search) {
      /* case1)소속사 검색 조건 O, 이름 검색 조건 O
       * case2)소속사 검색 조건 O, 이름 검색 조건 X
       * case3)소속사 검색 조건 X, 이름 검색 조건 X
       * case2)소속사 검색 조건 X, 이름 검색 조건 X
       */
      const _replaceStr = wk_name ? wk_name.replace(/ /gi, "") : null;
      const wkName =
        _replaceStr && _replaceStr.length !== 0 ? _replaceStr : null;

      const filterItems = items.filter((item) => {
        if (coId && wkName) {
          // case1
          if (
            coId === item.co_id &&
            item?.wk_name &&
            item?.wk_name.includes(wkName)
          )
            return item;
        } else if (coId && !wkName) {
          // case2
          if (coId === item.co_id) return item;
        } else if (!coId && wkName) {
          // case3
          if (item?.wk_name && item.wk_name.includes(wkName)) return item;
        } else {
          // case4
          return item;
        }
      });
      setWorkerItems(filterItems);
    } else {
      // eslint-disable-next-line no-lonely-if
      if (bc_address) {
        const filterItems = items.filter(
          (item) =>
            item?.bc_address && item.bc_address.includes(bc_address) && item
        );

        setWorkerItems(filterItems);
      } else {
        setWorkerItems(workersData);
      }
    }
  };

  const setBeaconOptionHandler = (
    item: WorkerType,
    options: BeaconOptionsType[]
  ) => {
    // if (item.bc_index) {
    //   if (
    //     !options.find(
    //       (option) => option.used && option.key !== item.bc_id && option
    //     )
    //   ) {
    //     const _tempBeaconOption:BeaconOptionsType =
    //       {
    //         key: item.bc_id,
    //         text: `${zeroFill(
    //           String(item.bc_management),
    //           3
    //         )} - ${splitByColonInput(String(item.bc_address))}`,
    //         value: item.bc_index,
    //         used: true,
    //       },
    //     setBeaconOptions([...options, ...[_tempBeaconOption]]);
    //   } else {
    //     const _tempBeaconOptions = options.map((option) =>
    //       option.used && option.bc_index !== item.bc_address
    //         ? {
    //             ...option,
    //             key: item.bc_id,
    //             text: `${zeroFill(item.bc_management, 3)} - ${splitByColonInput(
    //               item.bc_address
    //             )}`,
    //             value: item.bc_index,
    //           }
    //         : option
    //     );
    //     setBeaconOptions(_tempBeaconOptions);
    //   }
    // } else {
    //   const _tempBeaconOptions = options.filter(
    //     (option) => !option.used && option
    //   );
    //   setBeaconOptions(_tempBeaconOptions);
    // }
  };

  return (
    <WorkerCmpt>
      <OneByTwoLayout
        inputTitle="작업자 등록"
        tableTitle="작업자 목록"
        firstRender={
          <WorkerInput
            formData={formData}
            error={error}
            selectedRow={selectedRow}
            modalData={modalData}
            onChange={onChange}
            onSubmit={onSubmit}
            setOpen={setOpen}
            onChangeDate={onChangeDate}
            // ...rest
            companyOptions={companyOptions}
            beaconOptions={beaconOptions}
            imageFile={imageFile}
            handleFileInputChange={handleFileInputChange}
            onPreview={onPreview}
            onImageRemove={onImageRemove}
            onUpload={onUpload}
            smsDisabled={smsDisabled}
          />
        }
        secondRender={
          <WorkerTable
            data={workerItems}
            selectedRow={selectedRow}
            onRowClick={onRowClick}
            onDelete={onDelete}
            initForm={initForm}
            pageInfo={pageInfo}
            setPageInfoHandler={setPageInfoHandler}
          />
        }
        searchRender={
          <WorkerSearch
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
    </WorkerCmpt>
  );
};

export default WorkerContainer;
