import {
  LocalsOptionType,
  PreviewTabelType,
} from 'containers/field/DigContainer';
import { getYear } from 'date-fns';
import { DigErrorType, DigType } from 'modules/digs';
import moment from 'moment';
import FormArea from 'opwsUI/form/FormArea';
import FormElement, {
  ModalDataType,
  SetOpenModalType,
} from 'opwsUI/form/FormElement';
import { SelectedRowType } from 'opwsUI/table/types';
import { addComma, percentBind } from 'opwsUI/util';
import React, { useEffect } from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';

const DigInputCmpt = styled.div`
  width: 100%;
  height: 100%;
  .form-body {
    height: inherit;
    .resizable-area {
      height: 93%;
      overflow: auto;
      padding-bottom: 24px;
      &::-webkit-scrollbar {
        display: none;
      }
      table.table-panel {
        width: 100%;
        height: 116px;
        background-color: #f9fafb;
        margin-bottom: 20px;
        tr.info-row {
          font-family: NotoSansCJKkr-Regular;
          height: 33.3%;
          &:nth-child(1) {
            color: #7c7c7c;
          }
          &:not(:nth-child(1)) {
            color: #2e2e2e;
          }
          td.info-data {
            border: 1px solid #d8d8d8;
            text-align: center;
            font-size: 13px;
            &.empty {
              width: 10px;
            }
            &:nth-child(1) {
              width: 115px;
            }
            &:nth-child(n + 1) {
              width: 95px;
            }
          }
        }
      }
    }
  }
`;

type DigInputType = {
  formData: DigType;
  selectedRow: SelectedRowType;
  error?: DigErrorType;
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
    date: Date | string,
  ) => void;
  previewTabel: PreviewTabelType;
  localsOptions: LocalsOptionType[];
};

const DigInput = ({
  formData,
  selectedRow,
  error,
  modalData,
  onChange,
  onSubmit,
  setOpen,
  onChangeDate,
  previewTabel,
  localsOptions,
  ...rest
}: DigInputType) => {
  return (
    <>
      <DigInputCmpt className="dig-input-component">
        <FormArea
          id="dig-form"
          submitButton={
            <FormElement
              kind="button"
              type="submit"
              onClick={onSubmit}
              disabled={
                !formData.local_index ||
                error?.dig_length ||
                formData.dig_type === 'init' ||
                !formData.dig_length ||
                !formData.record_date
                  ? true
                  : false
              }
              content={
                selectedRow.selectedId ||
                previewTabel.planLength === previewTabel.currentLength
                  ? '수정'
                  : '등록'
              }
            />
          }
        >
          <FormElement
            kind="select"
            label="노선"
            id="local_index"
            name="local_index"
            options={localsOptions ?? []}
            value={formData.local_index}
            placeholder="노선을 선택해 주세요."
            onChange={(e, option) => onChange({ e, option })}
            error={
              error?.local_index && {
                content: error.local_index,
              }
            }
            required
          />
          <table className="table-panel">
            <tr className="info-row row-1">
              <td
                className={`info-data ${formData.local_index ? '' : 'empty'}`}
              >
                계획연장
              </td>
              <td
                className={`info-data ${formData.local_index ? '' : 'empty'}`}
              >
                {formData.local_index
                  ? `${addComma(previewTabel?.planLength ?? 0) ?? 0}m`
                  : ''}
              </td>
              <td
                className={`info-data ${formData.local_index ? '' : 'empty'}`}
              >
                {formData.local_index
                  ? `${
                      percentBind(
                        previewTabel?.planLength ?? 0,
                        previewTabel?.planLength ?? 0,
                      ) ?? 0
                    }%`
                  : ''}
              </td>
            </tr>
            <tr className="info-row row-2">
              <td
                className={`info-data ${formData.local_index ? '' : 'empty'}`}
              >
                누적굴진
              </td>
              <td
                className={`info-data ${formData.local_index ? '' : 'empty'}`}
              >
                {formData.local_index
                  ? `${addComma(previewTabel?.currentLength ?? 0) ?? 0}m`
                  : ''}
              </td>
              <td
                className={`info-data ${formData.local_index ? '' : 'empty'}`}
              >
                {formData.local_index
                  ? `${
                      percentBind(
                        previewTabel?.currentLength ?? 0,
                        previewTabel?.planLength ?? 0,
                      ) ?? 0
                    }%`
                  : ''}
              </td>
            </tr>
            <tr className="info-row row-3">
              <td
                className={`info-data ${formData.local_index ? '' : 'empty'}`}
              >
                최종 입력일
              </td>
              <td
                className={`info-data ${formData.local_index ? '' : 'empty'}`}
                colSpan={2}
              >
                {`${previewTabel?.recordDate ?? ''}`}
              </td>
            </tr>
          </table>

          <FormElement
            kind="calendar"
            label="입력일"
            id="record_date"
            name="record_date"
            value={formData.record_date}
            placeholder="입력일을 입력해 주세요."
            startYears={2023}
            startDate={new Date()}
            // minDate={new Date('2022-03-22')}
            minDate={
              previewTabel.initDate
                ? moment(previewTabel.initDate).add(1, 'day')
                : new Date()
            }
            maxDate={new Date()}
            endYears={getYear(new Date()) + 5}
            onChange={(e, date) => onChangeDate(e, date)}
            required
            disabled={!formData.local_index}
          />
          <FormElement
            kind="number"
            label="누적 굴진량"
            id="dig_length"
            name="dig_length"
            value={
              formData.dig_length
                ? formData.dig_length
                : formData.dig_length === 0
                ? ''
                : undefined
            }
            placeholder="누적 굴진량를 입력해 주세요."
            unit={{ basic: true, content: 'm' }}
            labelPosition="right"
            onChange={(e) => onChange({ e })}
            // maxLength="4"
            error={
              error?.dig_length && {
                content: error.dig_length,
              }
            }
            disabled={
              previewTabel.planLength === previewTabel.currentLength &&
              !formData.dig_seq
            }
            // maxLength="6"
            required
          />

          <FormElement
            kind="textarea"
            label="비고"
            id="dig_description"
            name="dig_description"
            value={formData?.dig_description ?? ''}
            onChange={(e) => onChange({ e })}
            placeholder="비고 입력란"
          />
        </FormArea>
      </DigInputCmpt>
      <FormElement
        kind="modal"
        modalData={modalData}
        setOpen={setOpen}
        // action={true}
      />
    </>
  );
};

export default DigInput;
