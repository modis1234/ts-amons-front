import { CompanyErrorType, CompanyType } from "modules/companies";
import { SelectedRowType } from "opwsUI/table/types";
import React, { useEffect } from "react";
import { Button, Form } from "semantic-ui-react";
import styled from "styled-components";
import FormArea from "../../../opwsUI/form/FormArea";
import FormElement, {
  ModalDataType,
  SetOpenModalType,
} from "../../../opwsUI/form/FormElement";

const CompanyInputCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

type CompanyInputType = {
  formData: CompanyType;
  selectedRow: SelectedRowType;
  error?: CompanyErrorType;
  modalData: ModalDataType;
  onChange: ({
    e,
    option,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    option?: any;
  }) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setOpen?: SetOpenModalType;
};

const CompanyInput = ({
  formData,
  selectedRow,
  error,
  modalData,
  onChange,
  onSubmit,
  setOpen,
}: CompanyInputType) => {
  const { selectedId = null } = selectedRow;
  useEffect(() => {}, []);

  return (
    <CompanyInputCmpt className="company-input-cmpt">
      <FormArea
        id="company-form"
        submitButton={
          <FormElement
            kind="button"
            type="submit"
            onClick={onSubmit}
            disabled={!formData.co_name || !formData.co_sectors}
            content={selectedId ? "수정" : "등록"}
          />
        }
      >
        <FormElement
          kind="text"
          label="소속사"
          id="co_name"
          name="co_name"
          placeholder="소속사를 입력해 주세요."
          value={formData.co_name}
          onChange={(e) => onChange({ e })}
          error={
            error?.co_name && {
              content: error.co_name,
            }
          }
          required
        />
        <FormElement
          kind="text"
          label="업종"
          id="co_sectors"
          name="co_sectors"
          placeholder="업종을 입력해 주세요."
          value={formData.co_sectors}
          onChange={(e) => onChange({ e })}
          error={
            error?.co_sectors && {
              content: error.co_sectors,
            }
          }
          required
        />
        <FormElement
          kind="textarea"
          label="비고"
          id="co_description"
          name="co_description"
          placeholder="비고 입력란"
          value={formData.co_description}
          onChange={(e) => onChange({ e })}
        />
      </FormArea>
      <FormElement
        kind="modal"
        modalData={modalData}
        setOpen={setOpen}
        // action={true}
      />
    </CompanyInputCmpt>
  );
};

export default CompanyInput;
