import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  CompanyErrorType,
  CompanyType,
  deleteCompany,
  getCompanies,
  postCompany,
  putCompany,
} from "../../modules/companies";
import initConfigData from "../../opwsUI/initConfigData";
import OneByTwoLayout from "../../opwsUI/layout/OneByTwoLayout";
import { useAppDispatch, useAppSelector } from "modules/hooks";
import { PageInfoType, SelectedRowType } from "opwsUI/table/types";
import { ModalDataType } from "opwsUI/form/FormElement";
import CompanyInput from "components/general/company/CompanyInput";
import CompanyTable from "components/general/company/CompanyTable";
// import CompanyTable from "../../components/general/company/CompanyTable";
// import CompanyInput from "../../components/general/company/CompanyInput";

const CompanyCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

// 초기화 데이터 '../../config/initConfigData'
const {
  company: {
    formData: initFormData,
    error: initError,
    searchData: initSearchData,
  },
} = initConfigData;

function CompanyContainer() {
  const { companiesData } = useAppSelector((state) => {
    return { companiesData: state.companies.data };
  });

  const dispatch = useAppDispatch();

  const [selectedRow, setSelectedRow] = useState<SelectedRowType<CompanyType>>({
    selectedId: null,
    selectedItem: null,
    clickedIndex: null,
  });

  const [companyItems, setCompanyItems] = useState<CompanyType[] | null>(null);

  const [formData, setFormData] = useState<CompanyType>(initFormData);
  const [error, setError] = useState<CompanyErrorType>(initError);

  const [searchData, setSearchData] = useState(initSearchData);

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
    dispatch(getCompanies());
  }, [dispatch]);

  useEffect(() => {
    if (companiesData) {
      setCompanyItems(companiesData);
    }
  }, [companiesData]);

  /**@descrition formData 초기화 */
  const initForm = useCallback(() => {
    setFormData({ ...initFormData });
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
    [formData, error]
  );
  /**@description  table 컴포넌트 Row 클릭 이벤트 핸들러*/
  const onRowClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, item: CompanyType) => {
      const { co_id: itemIndex = null } = item;
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
          co_sectors: item?.co_sectors ?? null,
        });
        setError(initError);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedRow.selectedId]
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
    [pageInfo]
  );

  /**@descrition form 컴포넌트 onSubmit 핸들러 */
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    const { co_id } = formData;

    /**@description 유효성 체크 */
    if (!formData.co_name || formData.co_name.length < 1) {
      setError({
        ...error,
        co_name: "소속사를 입력해 주세요.",
      });
      return false;
    } else if (!formData.co_sectors || formData.co_sectors.length < 1) {
      setError({
        ...error,
        co_sectors: "업종을 입력해 주세요.",
      });

      return false;
    }

    if (!co_id && !selectedRow.selectedId) {
      // 등록
      const insertData = {
        ...formData,
      };
      dispatch(postCompany(insertData));
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

  /**@descrition update dispatch action 함수 */
  const updateDispatch = () => {
    //수정
    let updateItem = { ...formData };

    dispatch(putCompany(updateItem));
  };

  /**@descrition delete dispatch 액션 실행 함수 */
  const deleteDispatch = () => {
    const _item = selectedRow?.selectedItem ?? null;
    if (_item === null) return;
    dispatch(deleteCompany(_item));
    initForm();
    setSelectedRow({
      selectedId: null,
      selectedItem: null,
      clickedIndex: null,
    });
  };

  /**@descrition delete 버튼 클릭 이벤트 핸들러 */
  const onDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: number
  ): void => {
    const _items: CompanyType[] | null = companiesData;
    if (!_items) return;
    const findItem = _items.find((item) => item.co_id === id && item);
    if (findItem) {
      setModalData({
        ...modalData,
        open: true,
        type: "delete",
      });
    }
  };

  return (
    <CompanyCmpt>
      <OneByTwoLayout
        inputTitle={"소속사 등록"}
        tableTitle={"소속사 목록"}
        firstRender={
          <CompanyInput
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
          <CompanyTable
            data={companyItems}
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
    </CompanyCmpt>
  );
}

export default CompanyContainer;
