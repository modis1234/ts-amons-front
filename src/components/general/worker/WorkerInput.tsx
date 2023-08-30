import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import getYear from "date-fns/getYear";
import _ from "lodash";
import FormElement, {
  ModalDataType,
  SetOpenModalType,
} from "../../../opwsUI/form/FormElement";
import FormArea from "../../../opwsUI/form/FormArea";
import { SelectedRowType } from "opwsUI/table/types";
import { WorkerErrorType, WorkerType } from "modules/workers";
import {
  BeaconOptionsType,
  ImageFileType,
  OptionsType,
} from "containers/general/WorkerContainer";

const WorkerCmpt = styled.div`
  width: 100%;
  height: 100%;

  #worker-form {
    .resizable-area {
      height: 89%;
    }
    .radio-box {
      display: flex;
      margin-bottom: 22px;
      padding-left: 5px;
      justify-content: space-between;
    }
    .float-div {
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 62px;
      margin-bottom: 22px;
      .number-box {
        width: 185px;
      }
      .sms-box {
        /* width: 137px; */
        padding-right: 15px;
      }
      div[name="wk_blood_type"] {
        min-width: 12em;
      }
      div[name="wk_blood_group"] {
        min-width: 9em;
      }
    }
  }
`;

type WorkerInputType = {
  formData: WorkerType;
  selectedRow: SelectedRowType;
  error: WorkerErrorType;
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
  onChangeDate: (
    e: React.ChangeEvent<HTMLInputElement>,
    date: Date | string
  ) => void;
  smsDisabled: boolean;
  companyOptions: OptionsType[];
  beaconOptions: BeaconOptionsType[];
  imageFile: ImageFileType;
  onPreview: () => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove: () => void;
  onUpload: () => void;
};

const WorkerInput = ({
  formData,
  selectedRow,
  error,
  modalData,
  onChange,
  onSubmit,
  setOpen,
  onChangeDate,
  smsDisabled,
  ...rest
}: WorkerInputType) => {
  const _bloodTypeOptions = [
    { key: 0, text: "미지정", value: 0 },
    { key: 1, text: "A", value: 1 },
    { key: 2, text: "B", value: 2 },
    { key: 3, text: "O", value: 3 },
    { key: 4, text: "AB", value: 4 },
  ];
  const _bloodGroupOptions = [
    { key: 0, text: "미지정", value: 0 },
    { key: 1, text: "Rh+", value: 1 },
    { key: 2, text: "Rh-", value: 2 },
  ];

  // 노선의 굴진 데이터 최초 입력일 판단 state
  const [startDate, setStartDate] = useState(new Date());

  return (
    <WorkerCmpt className="worker-input-component">
      <FormArea
        id="worker-form"
        className="worker-form"
        submitButton={
          <FormElement
            kind="button"
            type="submit"
            onClick={onSubmit}
            disabled={!formData.co_id || !formData.wk_name}
            content={selectedRow?.selectedId ? "수정" : "등록"}
          />
        }
      >
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
          label="이름"
          id="wk_name"
          name="wk_name"
          value={formData.wk_name ?? ""}
          onChange={(e) => onChange({ e })}
          error={
            error?.wk_name && {
              content: error.wk_name,
            }
          }
          placeholder="이름을 입력해 주세요."
          required
        />
        <FormElement
          kind="text"
          label="직위"
          id="wk_position"
          name="wk_position"
          value={formData.wk_position ?? ""}
          onChange={(e) => onChange({ e })}
          placeholder="직위를 입력해 주세요."
        />
        <div className="float-div">
          <div className="number-box">
            <FormElement
              kind="number"
              label="핸드폰"
              id="wk_phone"
              name="wk_phone"
              value={formData.wk_phone ?? ""}
              onChange={(e) => onChange({ e })}
              placeholder="번호를 입력해 주세요."
              maxLength={13}
            />
          </div>
          <div className="sms-box">
            <FormElement
              kind="checkbox"
              label="비상알람 SMS"
              id="wk_sms_yn"
              name="wk_sms_yn"
              value={formData.wk_sms_yn ?? false}
              checked={formData.wk_sms_yn ? true : false}
              onChange={(e) => onChange({ e })}
              disabled={smsDisabled}
            />
          </div>
        </div>
        <FormElement
          kind="calendar"
          label="생년월일"
          id="wk_birth"
          name="wk_birth"
          value={formData.wk_birth}
          placeholder="생년월일을 입력해 주세요."
          startDate={new Date("1990-01-01")}
          startYears={1945}
          endYears={getYear(new Date()) + 1}
          minDate={new Date("1945-01-01")}
          onChange={(e, date) => onChangeDate(e, date)}
          required
        />
        <div className="float-div">
          <FormElement
            kind="select"
            label="혈액형"
            id="wk_blood_type"
            name="wk_blood_type"
            options={_bloodTypeOptions ?? []}
            value={formData.wk_blood_type ?? 0}
            onChange={(e, option) => onChange({ e, option })}
            required
          />
          <FormElement
            kind="select"
            label="혈액형"
            id="wk_blood_group"
            name="wk_blood_group"
            options={_bloodGroupOptions ?? []}
            value={formData.wk_blood_group ?? 0}
            onChange={(e, option) => onChange({ e, option })}
            required
          />
        </div>
        <FormElement
          kind="text"
          label="국적"
          id="wk_nation"
          name="wk_nation"
          value={formData.wk_nation ?? ""}
          onChange={(e) => onChange({ e })}
          placeholder="국적을 입력해 주세요."
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
          label="작업자 사진"
          name="wk_image"
          value={
            !formData.wk_image || formData.wk_image !== rest?.imageFile.fileName
              ? rest?.imageFile.fileName
              : formData.wk_image
          }
          uploadAction={
            !formData.wk_image || formData.wk_image !== rest?.imageFile.fileName
              ? true
              : false
          }
          src={rest?.imageFile.src}
          type={"worker"}
          fileName={rest?.imageFile.fileName}
          file={rest?.imageFile.file}
          preview={rest?.imageFile.preview}
          onPreview={rest?.onPreview}
          onChange={rest?.handleFileInputChange}
          onImageRemove={rest?.onImageRemove}
          onUpload={rest?.onUpload}
        />
      </FormArea>

      <FormElement kind="modal" modalData={modalData} setOpen={setOpen} />
    </WorkerCmpt>
  );
};

export default WorkerInput;
