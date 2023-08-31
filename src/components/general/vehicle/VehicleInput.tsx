import {
  BeaconOptionsType,
  ImageFileType,
  OptionsType,
} from "containers/general/VehicleContainer";
import { VehicleErrorType, VehicleType } from "modules/vehicles";
import { SelectedRowType } from "opwsUI/table/types";
import React from "react";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import FormArea from "../../../opwsUI/form/FormArea";
import FormElement, {
  ModalDataType,
  SetOpenModalType,
} from "../../../opwsUI/form/FormElement";

const VehicleCmpt = styled.div`
  width: 100%;
  height: 100%;
  #vhicle-form {
    .resizable-area {
      height: 89%;
    }
  }
`;

type VehicleInputType = {
  formData: VehicleType;
  selectedRow: SelectedRowType;
  error: VehicleErrorType;
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
  companyOptions: OptionsType[];
  beaconOptions: BeaconOptionsType[];
  imageFile: ImageFileType;
  onPreview: () => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  onUpload: () => void;
};

const VehicleInput = ({
  formData,
  selectedRow,
  error,
  modalData,
  onChange,
  onSubmit,
  setOpen,
  ...rest
}: VehicleInputType) => {
  return (
    <VehicleCmpt className="vehicle-input-component">
      <FormArea
        id="vhicle-form"
        className="vhicle-form"
        submitButton={
          <FormElement
            kind="button"
            type="submit"
            // disabled={!formData.vh_name}
            onClick={onSubmit}
            content={selectedRow?.selectedId ? "수정" : "등록"}
          />
        }
      >
        {" "}
        <FormElement
          kind="select"
          label="소속사"
          id="co_id"
          name="co_id"
          options={rest?.companyOptions ?? []}
          value={formData.co_id ?? 0}
          onChange={(e, option) => onChange({ e, option })}
          error={
            error?.co_id && {
              content: error.co_id,
            }
          }
          placeholder="소속사를 선택해 주세요."
          required
        />
        <FormElement
          kind="text"
          label="차량 종류"
          id="vh_name"
          name="vh_name"
          value={formData.vh_name ?? ""}
          onChange={(e) => onChange({ e })}
          error={
            error?.vh_name && {
              content: error.vh_name,
            }
          }
          placeholder="차량 종류를 입력해 주세요."
          required
        />
        <FormElement
          kind="text"
          label="차량 번호"
          id="vh_number"
          name="vh_number"
          value={formData.vh_number ?? ""}
          onChange={(e) => onChange({ e })}
          error={
            error?.vh_number && {
              content: error.vh_number,
            }
          }
          placeholder="차량 번호를 입력해 주세요."
          required
        />
        <FormElement
          kind="select"
          label="비콘 사용 정보"
          id="bc_index"
          name="bc_index"
          options={rest?.beaconOptions ?? []}
          value={formData.bc_index ?? null}
          onChange={(e, option) => onChange({ e, option })}
          placeholder="할당할 비콘을 선택해 주세요."
          search
        />
        <FormElement
          kind="image"
          label="차량사진"
          name="vh_image"
          value={
            !formData.vh_image || formData.vh_image !== rest?.imageFile.fileName
              ? rest?.imageFile.fileName
              : formData.vh_image
          }
          uploadAction={
            !formData.vh_image || formData.vh_image !== rest?.imageFile.fileName
              ? true
              : false
          }
          src={rest?.imageFile.src}
          type={"vehicle"}
          fileName={rest?.imageFile.fileName}
          file={rest?.imageFile.file}
          preview={rest?.imageFile.preview}
          onPreview={rest?.onPreview}
          onChange={rest?.handleFileInputChange}
          onImageRemove={rest?.onImageRemove}
          onUpload={rest?.onUpload}
        />
        <FormElement
          kind="textarea"
          label="비고"
          id="vh_description"
          name="vh_description"
          value={formData.vh_description ?? ""}
          onChange={(e) => onChange({ e })}
          placeholder="비고 입력란"
        />
      </FormArea>
      <FormElement kind="modal" modalData={modalData} setOpen={setOpen} />
    </VehicleCmpt>
  );
};

export default VehicleInput;
