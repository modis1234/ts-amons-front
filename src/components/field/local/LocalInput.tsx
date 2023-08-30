import { EntranceOptionType } from "containers/field/LocalContainer";
import { LocalErrorType, LocalType } from "modules/locals";
import { SelectedRowType } from "opwsUI/table/types";
import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import styled from "styled-components";
import FormArea from "../../../opwsUI/form/FormArea";
import FormElement, {
  ModalDataType,
  SetOpenModalType,
} from "../../../opwsUI/form/FormElement";
import { addComma } from "../../../opwsUI/util";

const LocalInputCmpt = styled.div`
  width: 100%;
  height: 100%;
`;

// type EntranceOptionType = {
//   key: number;
//   text: string | null;
//   // name: string;
//   value: string | number | null;
// };

type LocalInputType = {
  formData: LocalType;
  selectedRow: SelectedRowType;
  error?: LocalErrorType;
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
  entranceOptions?: EntranceOptionType[];
};

const LocalInput = ({
  formData,
  selectedRow,
  error,
  modalData,
  onChange,
  onSubmit,
  setOpen,
  entranceOptions = [],
}: LocalInputType) => {
  const [tunnelOptions, setTunnelOptions] = useState([
    // { key: 0, text: '수직구', value: 0 },
    { key: 1, text: "제1터널", value: 1 },
    { key: 2, text: "제2터널", value: 2 },
    { key: 3, text: "제3터널", value: 3 },
    { key: 4, text: "제4터널", value: 4 },
  ]);

  const [localTypeOptions, setLocalTypeOptions] = useState([
    { key: 0, text: "굴진 방향을 선택해주세요.", value: 0 },
    { key: 1, text: "왕십리방향", value: 1, description: "시점방향" },
    { key: 2, text: "종암동방향", value: 2, description: "종점방향" },
    { key: 3, text: "환기구", value: 3 },
    { key: 4, text: "정거장", value: 4 },
    { key: 5, text: "환승통로", value: 5 },
  ]);

  const [localNumberOption, setLocalNumberOptions] = useState({
    type_1: [
      { key: 0, text: "지정안함", value: 0 },
      { key: 1, text: "상단 좌측", value: 1, description: "광명방향" },
      { key: 2, text: "상단 우측", value: 2, description: "시흥방향" },
      { key: 3, text: "하단 좌측", value: 3, description: "광명방향" },
      { key: 4, text: "하단 우측", value: 4, description: "시흥방향" },
    ],
    type_2: [
      { key: 0, text: "지정안함", value: 0 },
      { key: 1, text: "패널-1", value: 1, description: "광명방향" },
      { key: 2, text: "패널-2", value: 2, description: "시흥방향" },
      { key: 3, text: "패널-3", value: 3, description: "광명방향" },
      { key: 4, text: "패널-4", value: 4, description: "시흥방향" },
    ],
  });

  const [monitorNumberOption, setMonitorNumberOptions] = useState([
    { key: 0, text: "지정안함", value: 0 },
    { key: 1, text: "상단 좌측 패널", value: 1 },
    { key: 2, text: "상단 우측 패널", value: 2 },
    { key: 3, text: "하단 좌측 패널", value: 3 },
    { key: 4, text: "하단 우측 패널", value: 4 },
  ]);

  return (
    <LocalInputCmpt className="local-input-component">
      <FormArea
        id="local-form"
        submitButton={
          <FormElement
            kind="button"
            type="submit"
            disabled={
              !formData?.local_area ||
              !formData?.local_plan_length ||
              !formData?.local_name ||
              !formData?.local_type
            }
            onClick={onSubmit}
            content={selectedRow?.selectedId ? "수정" : "등록"}
          />
        }
      >
        <FormElement
          kind="select"
          label="터널"
          id="local_area"
          name="local_area"
          options={tunnelOptions}
          value={formData.local_area}
          onChange={(e, option) => onChange({ e, option })}
          placeholder="터널을 선택해 주세요."
        />
        <FormElement
          kind="select"
          label="굴진 방향"
          id="local_type"
          name="local_type"
          options={localTypeOptions}
          value={formData.local_type}
          onChange={(e, option) => onChange({ e, option })}
          placeholder="굴진방향을 선택해 주세요."
          error={
            error?.local_type
              ? {
                  content: error.local_type,
                }
              : undefined
          }
        />
        {/* <FormElement
          kind="text"
          label="노선"
          id="local_name"
          name="local_name"
          value={formData.local_name}
          onChange={(e) => onChange({ e })}
          placeholder="노선명을 입력해 주세요."
          error={
            error?.local_name && {
              content: error.local_name,
            }
          }
          required
        /> */}
        {formData.local_type === null ||
          (formData.local_type !== 3 && (
            <FormElement
              kind="select"
              label="진입 환기구"
              id="local_entrance"
              name="local_entrance"
              options={entranceOptions}
              value={formData.local_entrance}
              onChange={(e, option) => onChange({ e, option })}
              placeholder="터널을 선택해 주세요."
              disabled={!formData.local_area || !formData.local_type}
            />
          ))}
        <FormElement
          kind="number"
          label="계획 연장"
          // type="number"
          id="local_plan_length"
          name="local_plan_length"
          value={formData?.local_plan_length ?? 0}
          onChange={(e) => onChange({ e })}
          placeholder="굴착 계획 연장 거리를 입력해 주세요."
          unit={{ basic: true, content: "m" }}
          labelPosition="right"
          maxLength="6"
          error={
            error?.local_plan_length && {
              content: error.local_plan_length,
            }
          }
          required
        />
        <FormElement
          kind="select"
          label="진행 현황 배치 순서"
          id="local_number"
          name="local_number"
          options={
            formData.local_area
              ? formData.local_area === 1
                ? localNumberOption.type_1
                : localNumberOption.type_2
              : []
          }
          value={formData.local_number}
          onChange={(e, option) => onChange({ e, option })}
          placeholder="진행 현황 배치 순서를 선택해 주세요."
        />
        <FormElement
          kind="select"
          label="노선 패널 배치 순서"
          id="monitor_number"
          name="monitor_number"
          options={monitorNumberOption}
          value={formData.monitor_number}
          onChange={(e, option) => onChange({ e, option })}
          placeholder="사용 용도를 선택해 주세요."
          required
        />
        <FormElement
          kind="textarea"
          label="비고"
          id="local_description"
          name="local_description"
          value={formData.local_description}
          onChange={(e) => onChange({ e })}
          placeholder="비고 입력란"
        />
      </FormArea>
      <FormElement
        kind="modal"
        modalData={modalData}
        setOpen={setOpen}
        // action={true}
      />
    </LocalInputCmpt>
  );
};

export default LocalInput;

// LocalInput.defaultProps = {
//   formData: {}, //initConfigData.js
//   onChange: () => {
//     console.log("Need onChange Function Props!!");
//   },
//   onSubmit: () => {
//     console.log("Need onSubmit Function Props!!");
//   },
//   selectedRow: {
//     selectedId: null,
//     selectedItem: undefined,
//     clickedIndex: null,
//   },
//   error: {}, //input Area 유효성 체크 에러 메세지  - initConfigData.js
//   modalData: {
//     open: false, // 모달 OPEN 여부
//     type: null, //type: update/delete/warning
//     content: null, // 모달 메세지 내용
//   },
//   setOpen: () => {
//     console.log("Need setOpen Function Props!!");
//   }, // 모달 버튼 액션
// };
