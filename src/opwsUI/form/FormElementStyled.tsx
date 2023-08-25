import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
} from 'semantic-ui-react';
import styled from 'styled-components';

// label CSS
export const LabelTag = styled.label`
  width: 100%;
  height: 20px;
  font-family: NotoSansCJKkr-Regular;
  /* padding-left: 5px; */
  color: #2e2e2e;
  font-size: 13px;
  margin-bottom: 4px;
  font-weight: bold;
  &.radio-tag {
    color: #656565;
  }
`;

// kind is calendar CSS
// eslint-disable-next-line import/prefer-default-export
export const CalendarCmpt = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 22px;
  position: relative;
  i.calendar-icon {
    position: absolute;
    top: 30px;
    left: 16px;
    font-size: 18px !important;
    z-index: 1;
  }
  input.calendar-input {
    padding-left: 45px !important;
    &:hover {
      cursor: pointer;
    }
    &:focus {
      border: 1px solid var(--company-identity-color) !important;
    }
  }
  .decrease-button {
    margin-right: 5px;
  }
  .increase-button {
    margin-left: 5px;
  }

  .decrease-button,
  .increase-button {
    font-family: NotoSansCJKkr-Medium;
    font-size: 15px;
    border: solid 1px rgba(34, 36, 38, 0.35);
    border-radius: 50%;
    width: 25px;
    height: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    padding: 10px;
    &:hover {
      cursor: pointer;
      color: var(--company-identity-color, #0000ff) !important;
      background-color: #ffffff;
    }
  }
  select {
    font-family: NotoSansCJKkr-Medium;
    font-size: 12px;
    &:hover {
      cursor: pointer;
    }
  }
  .react-datepicker__day-names {
    font-family: NotoSansCJKkr-Medium;
    font-size: 15px;
    /* font-weight: bold; */
  }
  .react-datepicker__week {
    font-family: NotoSansCJKkr-Regular;
    font-size: 15px;
  }
`;

// kind is image CSS
export const ImageCmpt = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 36px;

  /* display: flex; */
  .image-field-label {
    padding-left: 0px;
  }
  .button-box {
    display: flex;
    justify-content: end;
    font-family: NotoSansCJKkr-Medium;
    font-size: 14px;
    margin-bottom: 4px;
    .image-button {
      :hover {
        cursor: pointer;
        color: var(--company-identity-color, #0000ff) !important;
      }
      border: 1px solid #dededf;
      border-radius: 4px;
      width: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.preview-button {
        background-color: #e0e1e2;
      }
      &.remove-button {
        margin-left: 5px;
        background-color: #dededf;
      }
    }
  }
  .image-input-box {
    margin-top: 4px;
    display: flex;
    position: relative;
    .image-icon-label {
      width: 44px;
      height: 38px;
      background-color: #2e2e2e;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0px;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      svg {
        font-size: 20px;
      }
    }

    .upload-name {
      width: 100%;
      height: 38px;
      display: inline-block;
      font-size: inherit;
      font-family: inherit;
      line-height: normal;
      vertical-align: middle;
      -webkit-appearance: none; /* 네이티브 외형 감추기 */
      -moz-appearance: none;
      appearance: none;
      label.upload-label {
        border: 1px solid rgba(34, 36, 38, 0.5);
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        width: 100%;
        height: 100%;
        display: inline-block;
        font-size: inherit;
        vertical-align: middle;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 5px;
        &.is-image {
          font-family: NotoSansCJKkr-Regular;
          color: rgba(0, 0, 0, 0.87);
          border: 1px solid var(--company-identity-color, #0000ff);
        }
        &.non-image {
          font-family: NotoSansCJKkr-Medium;
          color: #929292;
        }

        &:hover {
          cursor: pointer;
        }
      }
      .upload-hidden {
        display: none;
      }
    }

    .backspace-icon-label {
      position: absolute;
      background-color: inherit;
      top: 0%;
      right: 0%;
      width: 46px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        cursor: pointer;
        color: #ff0000;
      }
      svg {
        font-size: 21px;
      }
    }
    #input-error-message {
      white-space: normal;
      background: #fff !important;
      border: 1px solid #e0b4b4 !important;
      color: #9f3a38 !important;
      position: absolute;
      top: 35px;
    }
  }
`;

// kind is kind CSS
export const CheckBoxFieldCmpt = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 22px;
`;

export const CheckBoxCmpt = styled(Checkbox)`
  &.checkbox-field {
    width: 100%;
    display: flex;
    /* justify-content: center;
    align-items: center; */
    left: 40%;
    align-items: center;
    margin-top: 5px;
  }
`;

// SemanticUI Form.Field CSS
export const FormFieldCmpt = styled(Form.Field)`
  &.field {
    margin-bottom: 22px !important;
    label {
      font-family: NotoSansCJKkr-Regular;
    }
  }
  input,
  textarea {
    font-family: NotoSansCJKkr-Regular !important;
    &:focus {
      border-color: var(--company-identity-color, #0000ff) !important;
    }

    &::placeholder {
      font-family: NotoSansCJKkr-Regular;
      font-size: 14px;
      color: #929292;
    }
  }
  textarea {
    resize: none !important;
  }

  .ui[class*='right labeled'].input {
    font-family: NotoSansCJKkr-Regular;
  }
  .ui[class*='right labeled'].input > input:focus {
    border-right-color: var(--company-identity-color, #0000ff) !important;
  }
`;

// SemanticUI Form.Select CSS
export const FormSelectCmpt = styled(Form.Select)`
  &.field {
    margin-bottom: 22px !important;
    label {
      font-family: NotoSansCJKkr-Regular;
    }
  }
  .ui.selection.dropdown {
    font-family: NotoSansCJKkr-Regular !important;
  }
  .menu,
  .ui.selection.dropdown:focus {
    border: 1px solid var(--company-identity-color) !important;
  }
`;

// SemanticUI Input CSS
export const InputCmpt = styled(Input)`
  width: 100%;
  height: 100%;
`;

// SemanticUI Button CSS
export const ButtonCmpt = styled(Button)`
  width: 100%;
  height: 50px;
  background-color: var(--company-identity-color, #0000ff) !important;
  font-family: NotoSansCJKkr-Regular;

  &.button,
  &[type='submit'] {
    position: absolute;
    bottom: 10px;
    font-size: 18px;
    font-family: NotoSansCJKkr-Regular;
    transition: all 0.3s;
  }
  &.cancel {
    position: relative;
    bottom: 0;
    font-size: 18px;
    font-family: NotoSansCJKkr-Regular;
    transition: all 0.3s;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const ModalCmpt = styled(Modal)`
  .bold {
    font-weight: 900;
  }

  .confirm-modal.actions {
    /* display: flex;
    justify-content: end; */
    .button {
      white-space: nowrap;
      /* bottom: 0px !important; */
      /* padding: 0; */
      position: relative;
      top: 0px;
      &.confirm {
        width: 120px;
        padding: 0 50px 0 5px !important;
        &.update {
          background-color: var(--company-identity-color) !important;
        }
        &.delete {
          background-color: #d01919 !important;
        }
      }
      &.cancel {
        width: 100px;
        background-color: #000000 !important;
      }
      /* .confirm-modal-button {
        width: 100px;
      } */
    }
  }
`;

// SemanticUI Radio CSS
export const RadioCmpt = styled.div`
  width: 100%;
  height: auto;
  white-space: nowrap;
  font-family: NotoSansCJKkr-Regular;
  color: #656565;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  line-height: 1.8;

  input[type='radio'] {
    border-radius: 50%;
    width: 18px;
    height: 18px;
    border: 1px solid #999;
    margin-right: 5px;
    accent-color: var(--company-identity-color, #0000ff);
    &:hover {
      cursor: pointer;
    }
    &:disabled {
      color: var(--company-identity-color, #0000ff) !important;
    }
  }
`;
