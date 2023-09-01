import { AnnounceErrorType, AnnounceType } from 'modules/announces';
import { SelectedRowType } from 'opwsUI/table/types';
import React from 'react';
import { Form } from 'semantic-ui-react';
import styled from 'styled-components';
import FormArea from '../../../opwsUI/form/FormArea';
import FormElement, {
  ModalDataType,
  SetOpenModalType,
} from '../../../opwsUI/form/FormElement';

const AnnounceInputCmpt = styled.div`
  width: 100%;
  height: 100%;
  #announce-form {
    height: inherit;
    .radio-ann_preview-component {
      margin-top: 5px;
    }
  }
`;

type AnnounceInputType = {
  formData: AnnounceType;
  selectedRow: SelectedRowType;
  error?: AnnounceErrorType;
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

const AnnounceInput = ({
  formData,
  selectedRow,
  error,
  modalData,
  onChange,
  onSubmit,
  setOpen,
  ...rest
}: AnnounceInputType) => {
  return (
    <AnnounceInputCmpt className="announce-input-component">
      <FormArea
        id="announce-form"
        submitButton={
          <FormElement
            kind="button"
            // type="submit"
            onClick={onSubmit}
            disabled={error?.ann_title && error?.ann_contents ? true : false}
            content={selectedRow?.selectedId ? '수정' : '등록'}
          />
        }
      >
        <FormElement
          kind="textarea"
          label="제목"
          id="ann_title"
          name="ann_title"
          value={formData.ann_title ?? ''}
          onChange={(e) => onChange({ e })}
          placeholder="제목을 입력해 주세요."
        />
        <FormElement
          kind="textarea"
          label="내용"
          id="ann_contents"
          name="ann_contents"
          value={formData.ann_contents ?? ''}
          onChange={(e) => onChange({ e })}
          placeholder="내용을 입력해 주세요."
        />
        <FormElement kind="label" label="게시 여부" id="ann_preview-label" />
        <FormElement
          kind="radio"
          label="사용"
          id="preview_abled"
          name="ann_preview"
          value={'1'}
          checked={formData.ann_preview === 1}
          onChange={(e, option) => onChange({ e, option })}
        />
        <FormElement
          kind="radio"
          label="미사용"
          id="preview_disabled"
          name="ann_preview"
          value={'0'}
          // checked={formData.net_scan_action === 0 ? true : false}
          checked={formData.ann_preview === 0 ? true : false}
          onChange={(e, option) => onChange({ e, option })}
        />
      </FormArea>
      <FormElement
        kind="modal"
        modalData={modalData}
        setOpen={setOpen}
        // action={true}
      />
    </AnnounceInputCmpt>
  );
};

export default AnnounceInput;
