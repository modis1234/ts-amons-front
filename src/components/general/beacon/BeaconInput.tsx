import React from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import FormElement, {
  ModalDataType,
  SetOpenModalType,
} from '../../../opwsUI/form/FormElement';
import FormArea from '../../../opwsUI/form/FormArea';
import { BeaconErrorType, BeaconType } from 'modules/beacons';
import { SelectedRowType } from 'opwsUI/table/types';

const BeaconInputCmpt = styled.div`
  width: 100%;
  height: 100%;

  #beacon-form {
    .beacon-management-box {
      position: relative;
      width: 100%;
      height: 85px;
      .mgt-isabled-box {
        position: absolute;
        top: 0px;
        right: 2%;
        label {
          font-family: NotoSansCJKkr-Regular;
          font-size: 13px;
          color: #212121;
          font-weight: 700;
        }
        input[type='checkbox'] {
          display: none;
        }

        input {
          margin: 0.4rem;
        }
        input#management_disabled + label {
          cursor: pointer;
        }
        /*input 바로 다음의 label:before 에 체크하기 전 CSS 설정*/
        input#management_disabled + label:before {
          content: '';
          display: inline-block;
          width: 14px;
          height: 14px;
          line-height: 12px;
          border: 1px solid #2e2e2e;
          vertical-align: middle; /*체크 전과 체크 후 높이 차이 때문에 설정*/
          border-radius: 2px;
          margin-right: 5px;
        }
        input#management_disabled:checked + label:before {
          content: '✔'; /*폰트어썸 유니코드*/
          font-family: NotoSansCJKkr-Medium; /*폰트어썸 아이콘 사용*/
          font-weight: 900; /*폰트어썸 설정*/
          color: #2e2e2e;
          background-color: #fff;
          border: 1px solid #2e2e2e;
          font-size: 13px;
          text-align: center;
        }
      }
    }
  }
`;

type BeaconInputType = {
  formData: BeaconType;
  selectedRow: SelectedRowType;
  error?: BeaconErrorType;
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
  beaconMgtID: number;
};

const BeaconInput = ({
  formData,
  selectedRow,
  error,
  modalData,
  onChange,
  onSubmit,
  setOpen,
  ...rest
}: BeaconInputType) => {
  return (
    <>
      <BeaconInputCmpt className="beacon-input-component">
        <FormArea
          id="beacon-form"
          submitButton={
            <FormElement
              kind="button"
              type="submit"
              disabled={
                !formData?.bc_management ||
                !formData?.bc_address ||
                error?.bc_management ||
                error?.bc_address
                  ? true
                  : false
              }
              onClick={onSubmit}
              content={selectedRow?.selectedId ? '수정' : '등록'}
            />
          }
        >
          <FormElement
            kind="number"
            label="비콘 관리번호"
            id="bc_management"
            name="bc_management"
            value={formData?.bc_management ?? undefined}
            onChange={(e) => onChange({ e })}
            placeholder={
              !formData?.bc_management
                ? rest?.beaconMgtID
                  ? String(rest?.beaconMgtID)
                  : null
                : null
            }
            error={
              error?.bc_management && {
                content: error.bc_management,
              }
            }
            maxLength="3"
            required
          />

          <FormElement
            kind="text"
            label="MAC 주소"
            id="bc_address"
            name="bc_address"
            value={formData?.bc_address ?? undefined}
            onChange={(e) => onChange({ e })}
            placeholder="_ _:_ _:_ _:_ _:_ _:_ _"
            error={
              error?.bc_address && {
                content: error.bc_address,
              }
            }
            required
          />
          <FormElement
            kind="textarea"
            label="비고"
            id="bc_description"
            name="bc_description"
            value={formData?.bc_description ?? ''}
            onChange={(e) => onChange({ e })}
            placeholder="비고 입력란"
          />
        </FormArea>
      </BeaconInputCmpt>
      <FormElement
        kind="modal"
        modalData={modalData}
        setOpen={setOpen}
        // action={true}
      />
    </>
  );
};

export default BeaconInput;
