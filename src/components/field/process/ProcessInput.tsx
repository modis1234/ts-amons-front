import { processColor } from 'containers/field/ProcessContainer';
import { LocalsOptionType } from 'modules/locals';
import { ProcessErrorType, ProcessType } from 'modules/processes';
import { SelectedRowType } from 'opwsUI/table/types';
import React from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import FormArea from '../../../opwsUI/form/FormArea';
import FormElement, {
  ModalDataType,
  SetOpenModalType,
} from '../../../opwsUI/form/FormElement';

const ProcessInputCmpt = styled.div`
  width: 100%;
  height: 100%;
  #process-form {
    .preview-box {
      width: 100%;
      height: 80px;
      /* border: 1px solid #c5c9cf; */
      display: flex;
      position: relative;
      margin-bottom: 30px;
      .content-box {
        display: flex;
        justify-content: center;
        align-items: center;
        &.left-box {
          width: 50%;
          height: 100%;
          background-color: #ffffff;
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          border: 1px solid #d8d8d8;
        }
        &::after {
          width: 20px;
          height: 20px;
          content: '';
          transform: translateX(-50%) translateY(-50%) rotate(45deg);
          position: absolute;
          top: 50%;
          left: 50%;
          background-color: #ffffff;
          border-top: 1px solid #d8d8d8;
          border-right: 1px solid #d8d8d8;
        }
        &.right-box {
          width: 50%;
          height: 100%;
          background-color: #f2f2f2;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          border-top: 1px solid #d8d8d8;
          border-right: 1px solid #d8d8d8;
          border-bottom: 1px solid #d8d8d8;
        }
        .process-box {
          height: 58.21px;
          width: 70px;
          /* background-color: antiquewhite; */
          font-family: NotoSansCJKkr-Regular;
          font-size: 13px;
          .title {
            width: 100%;
            height: calc(100% - 30px);
            color: #2e2e2e;
            text-align: center;
          }
          .process {
            width: 100%;
            height: 30px;
            color: #ffffff;
            background-color: #375795;
            border-radius: 3px;
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
          }
        }
      }
    }
    .fields.form-group-box {
      margin-bottom: 5px !important;
      .radio-box {
        width: 33.3%;
        padding-left: 10px;
      }
    }
  }
`;

type ProcessInputType = {
  formData: ProcessType;
  onChange: ({
    e,
    option,
  }: {
    e: React.ChangeEvent<HTMLInputElement>;
    option?: any;
  }) => void;
  onSubmit: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  localsOptions: LocalsOptionType[];
  selectedRow?: SelectedRowType;
  // modalData?: ModalDataType;
  // setOpen?: SetOpenModalType;
  // error?: ProcessErrorType;
};

const ProcessInput = ({
  formData,
  onChange,
  onSubmit,
  selectedRow,
  // error,
  // modalData,
  // setOpen,
  ...rest
}: ProcessInputType) => {
  return (
    <ProcessInputCmpt className="process-input-component">
      <FormArea
        id="process-form"
        submitButton={
          <FormElement
            kind="button"
            // type="submit"
            onClick={onSubmit}
            content={selectedRow?.selectedId ? '수정' : '등록'}
            disabled={!formData.local_index || !formData.pcs_next_state}
          />
        }
      >
        <FormElement
          kind="select"
          label="노선"
          id="local_index"
          name="local_index"
          options={rest.localsOptions}
          value={formData.local_index}
          placeholder="노선을 선택해 주세요."
          onChange={(e, option) => onChange({ e, option })}
          required
          search
        />
        <FormElement kind="label" label="미리보기" id="process-preview" />
        <div className="preview-box">
          <div className="left-box content-box">
            {formData.local_index && (
              <div className="process-box">
                <div className="title">현재상태</div>
                <div
                  className="process"
                  style={{
                    background:
                      processColor[formData.pcs_curr_state ?? 1].color,
                  }}
                >
                  {processColor[formData.pcs_curr_state ?? 1].text}
                </div>
              </div>
            )}
          </div>
          <div className="right-box content-box">
            {formData.local_index && formData.pcs_next_state && (
              <div className="process-box">
                <div className="title">변경상태</div>
                <div
                  className="process"
                  style={{
                    background:
                      processColor[formData.pcs_next_state ?? 1].color,
                  }}
                >
                  {processColor[formData.pcs_next_state ?? 1].text}
                </div>
              </div>
            )}
          </div>
        </div>
        <FormElement kind="label" label="공정상태 선택" id="pcs-state-label" />
        <Form.Group className="form-group-box">
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="굴진중"
              id="process_15"
              name="pcs_next_state"
              value={15}
              checked={formData.pcs_next_state === 15}
              disabled={!formData.local_index || formData.pcs_curr_state === 15}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="미착공"
              id="process_01"
              name="pcs_next_state"
              value={1}
              checked={formData.pcs_next_state === 1}
              disabled={!formData.local_index || formData.pcs_curr_state === 1}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="천공"
              id="process_02"
              name="pcs_next_state"
              value={2}
              checked={formData.pcs_next_state === 2}
              disabled={!formData.local_index || formData.pcs_curr_state === 2}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group-box">
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="장약"
              id="process_03"
              name="pcs_next_state"
              value={3}
              checked={formData.pcs_next_state === 3}
              disabled={!formData.local_index || formData.pcs_curr_state === 3}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="발파"
              id="process_04"
              name="pcs_next_state"
              value={4}
              checked={formData.pcs_next_state === 4}
              disabled={!formData.local_index || formData.pcs_curr_state === 4}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="버력처리"
              id="process_05"
              name="pcs_next_state"
              value={5}
              checked={formData.pcs_next_state === 5}
              disabled={!formData.local_index || formData.pcs_curr_state === 5}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group-box">
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="숏크리트"
              id="process_06"
              name="pcs_next_state"
              value={6}
              checked={formData.pcs_next_state === 6}
              disabled={!formData.local_index || formData.pcs_curr_state === 6}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="강지보"
              id="process_07"
              name="pcs_next_state"
              value={7}
              checked={formData.pcs_next_state === 7}
              disabled={!formData.local_index || formData.pcs_curr_state === 7}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="격자지보"
              id="process_08"
              name="pcs_next_state"
              value={8}
              checked={formData.pcs_next_state === 8}
              disabled={!formData.local_index || formData.pcs_curr_state === 8}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group-box">
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="록볼트"
              id="process_09"
              name="pcs_next_state"
              value={9}
              checked={formData.pcs_next_state === 9}
              disabled={!formData.local_index || formData.pcs_curr_state === 9}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="방수시트"
              id="process_10"
              name="pcs_next_state"
              value={10}
              checked={formData.pcs_next_state === 10}
              disabled={!formData.local_index || formData.pcs_curr_state === 10}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="라이닝"
              id="process_11"
              name="pcs_next_state"
              value={11}
              checked={formData.pcs_next_state === 11}
              disabled={!formData.local_index || formData.pcs_curr_state === 11}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
        </Form.Group>
        <Form.Group className="form-group-box">
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="근무교대"
              id="process_12"
              name="pcs_next_state"
              value={12}
              checked={formData.pcs_next_state === 12}
              disabled={!formData.local_index || formData.pcs_curr_state === 12}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="장비점검"
              id="process_13"
              name="pcs_next_state"
              value={13}
              checked={formData.pcs_next_state === 13}
              disabled={!formData.local_index || formData.pcs_curr_state === 13}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
          <div className="radio-box">
            <FormElement
              kind="radio"
              label="기타"
              id="process_14"
              name="pcs_next_state"
              value={14}
              checked={formData.pcs_next_state === 14}
              disabled={!formData.local_index || formData.pcs_curr_state === 14}
              onChange={(e, option) => onChange({ e, option })}
            />
          </div>
        </Form.Group>
        <FormElement
          kind="textarea"
          label="비고"
          id="pcs_description"
          name="pcs_description"
          value={formData.pcs_description ?? ''}
          onChange={(e) => onChange({ e })}
          placeholder="비고 입력란"
          style={{ height: '105px' }}
        />
      </FormArea>
    </ProcessInputCmpt>
  );
};

export default ProcessInput;
