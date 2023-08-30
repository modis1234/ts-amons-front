// @ts-nocheck
import {
  faBackspace,
  faCheckCircle,
  faCircleExclamation,
  faCircleMinus,
  faImage,
  faUpload,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { Icon, Image, Input, Loader } from "semantic-ui-react";
import "react-datepicker/dist/react-datepicker.css";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import ko from "date-fns/locale/ko";
import "moment/locale/ko";
import _ from "lodash";
import {
  ButtonCmpt,
  CalendarCmpt,
  CheckBoxCmpt,
  CheckBoxFieldCmpt,
  FormFieldCmpt,
  FormSelectCmpt,
  ImageCmpt,
  InputCmpt,
  LabelTag,
  ModalCmpt,
  RadioCmpt,
} from "./FormElementStyled";

registerLocale("ko", ko);

export type ModalDataType = {
  open: boolean;
  type: "update" | "delete" | "warning" | null; //type: update/delete/warning
  content?: string | null;
  header?: string | null;
};

export type SetOpenModalType = (data: {
  action: boolean;
  open: boolean;
}) => void;

type FormElementType = {
  kind: string;
  label?: string;
  type?: string;
  name?: string;
  value?: any;
  id?: string;
  required?: boolean;
  // disabled = false,
  className?: string;
  error?:
    | {
        [keys: string]: string;
        content: string | null;
      }
    | string
    | null;
  startYears?: number;
  endYears?: number;
  unit?: { basic: boolean; content: string };
  options?: Array<any>;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  content?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, option: Object) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
  labelPosition?: "right" | "left";
  maxLength?: number | string;
  modalData?: ModalDataType;
  setOpen?: SetOpenModalType;

  // rest?: {
  //   className: string;
  // };
};

const FormElement = ({
  kind = "text",
  label = "",
  name = "",
  value = "",
  id,
  required = false,
  // disabled = false,
  ...rest
}: FormElementType) => {
  const years =
    kind === "calendar" &&
    _.range(
      rest?.startYears ?? 2018,
      rest?.endYears ?? getYear(new Date()) + 5,
      1
    );
  const months = kind === "calendar" &&
    rest?.endYears && [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];

  return (
    <>
      {kind === "label" && (
        <LabelTag
          className={`label-component label-${name}-component`}
          {...rest}
        >
          {label}
        </LabelTag>
      )}
      {kind === "text" && (
        // <FormFieldCmpt
        //   className={`input-component input-${name}-component ${
        //     rest?.className ? rest?.className : ''
        //   }`}
        //   control="input"
        //   id="input"
        //   name={name}
        //   value={value ?? ''}
        //   label={label}
        //   {...rest}
        //   required={required}
        // >
        //   {rest?.error && (
        //     <div
        //       className="ui pointing above prompt label"
        //       id="input-error-message"
        //       role="alert"
        //       aria-atomic="true"
        //     >
        //       {rest?.error?.content ?? ''}
        //     </div>
        //   )}
        // </FormFieldCmpt>
        <FormFieldCmpt
          className={`input-component input-${name}-component ${
            rest?.className ? rest?.className : ""
          }`}
          required={required}
        >
          <LabelTag>{label}</LabelTag>
          <InputCmpt
            name={name}
            value={value ?? ""}
            label={rest?.unit}
            {...rest}
          />
          {rest?.error && (
            <div
              className="ui pointing above prompt label"
              id="input-error-message"
              role="alert"
              aria-atomic="true"
            >
              {rest?.error?.content ?? ""}
            </div>
          )}
        </FormFieldCmpt>
      )}
      {kind === "number" && (
        <FormFieldCmpt className="number-input-position" required={required}>
          <LabelTag>{label}</LabelTag>
          <InputCmpt name={name} value={value} label={rest?.unit} {...rest} />
          {rest?.error && (
            <div
              className="ui pointing above prompt label"
              id="input-error-message"
              role="alert"
              aria-atomic="true"
            >
              {rest?.error?.content ?? ""}
            </div>
          )}
        </FormFieldCmpt>
      )}
      {kind === "textarea" && (
        <FormFieldCmpt
          className={`textarea-component input-${name}-component`}
          control="textarea"
          name={name}
          value={value ?? ""}
          label={label}
          {...rest}
        />
      )}
      {kind === "select" && (
        <FormSelectCmpt
          className={`select-component select-${name}-component`}
          // control="select"
          options={rest?.options}
          name={name}
          value={value}
          label={label}
          {...rest}
          required={required}
        />
      )}
      {kind === "checkbox" && (
        <CheckBoxFieldCmpt
          className={`checkbox-component checkbox-${name}-component`}
        >
          <LabelTag className="label">{label}</LabelTag>
          <CheckBoxCmpt
            className="checkbox-field"
            id={id}
            name={name}
            {...rest}
            // checked={wk_sms_yn}
            // value={wk_sms_yn}
            // onChange={(e, value) => onSelectChange(e, value)}
            // disabled={SOS_ACTION !== 1 ? true : false}
          />
        </CheckBoxFieldCmpt>
      )}
      {kind === "radio" && (
        <RadioCmpt className={`radio-component radio-${name}-component`}>
          <input
            type="radio"
            id={id}
            name={name}
            value={value || ""}
            {...rest}
          />
          <LabelTag className="radio-tag">{label}</LabelTag>
        </RadioCmpt>
      )}
      {kind === "calendar" && (
        <CalendarCmpt
          className={`calendar-component calendar-${name}-component`}
        >
          <LabelTag className="label">{label}</LabelTag>
          <Icon className="calendar-icon" name="calendar alternate outline" />
          <DatePicker
            id={id}
            name={name}
            value={value || ""}
            locale="ko"
            selected={rest?.selected ?? new Date()}
            className="calendar-input"
            renderCustomHeader={({
              date,
              changeYear,
              changeMonth,
              decreaseMonth,
              increaseMonth,
              prevMonthButtonDisabled,
              nextMonthButtonDisabled,
            }) => (
              <div
                style={{
                  margin: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="decrease-button"
                  onClick={decreaseMonth}
                  disabled={prevMonthButtonDisabled}
                >
                  {"<"}
                </div>
                <select
                  value={getYear(date)}
                  onChange={({ target: { value } }) => changeYear(value)}
                >
                  {years.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <select
                  value={months[getMonth(date)]}
                  onChange={({ target: { value } }) =>
                    changeMonth(months.indexOf(value))
                  }
                >
                  {months.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div
                  className="increase-button"
                  onClick={increaseMonth}
                  disabled={nextMonthButtonDisabled}
                >
                  {">"}
                </div>
              </div>
            )}
            // onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            minDate={rest.minDate ?? new Date()}
            {...rest}
          />
        </CalendarCmpt>
      )}
      {kind === "image" && (
        <ImageCmpt className={`image-component image-${name}-component`}>
          <LabelTag className="image-field-label">{label ?? ""}</LabelTag>
          {value && (
            <div className="button-box">
              <div
                className="image-button preview-button"
                onClick={rest?.onPreview}
              >
                {!rest?.preview ? "미리보기" : "닫기"}
              </div>
              <div
                className="image-button remove-button"
                onClick={rest?.onImageRemove}
              >
                지우기
              </div>
            </div>
          )}

          {rest?.preview && (
            <Image
              src={
                rest?.src
                  ? rest?.src
                  : `http://${process.env.REACT_APP_API_SERVER}/uploads/${process.env.REACT_APP_TS_INDEX}/${rest?.type}/${rest?.fileName}`
              }
            />
          )}
          <div className="image-input-box">
            <LabelTag basic className="image-icon-label">
              <FontAwesomeIcon icon={faImage} />
            </LabelTag>
            <InputCmpt
              className="upload-name"
              disabled="disabled"
              value={value ?? ""}
            >
              <label
                className={`upload-label ${value ? "is-image" : "non-image"}`}
                htmlFor="ex_filename"
              >
                {value ? value : "사진을 등록해 주세요.(jpg,png,gif)"}
              </label>
              <Input
                type="file"
                id="ex_filename"
                accept="image/jpg,jpge,png,gif"
                className="upload-hidden"
                onChange={rest?.onChange}
              />
            </InputCmpt>
            {rest?.error && (
              <div
                className="ui pointing above prompt label"
                id="input-error-message"
                role="alert"
                aria-atomic="true"
              >
                {rest?.error?.content ?? ""}
              </div>
            )}

            {rest?.uploadButton && rest?.uploadAction && (
              <LabelTag
                className="backspace-icon-label"
                onClick={rest?.onUpload}
              >
                {value && <FontAwesomeIcon icon={faUpload} />}
              </LabelTag>
            )}
          </div>
        </ImageCmpt>
      )}
      {kind === "button" && (
        <FormFieldCmpt
          className={`button-field ${
            rest?.type === "submit" ? "submit-button" : ""
          } ${name}`}
          id={id}
          control={ButtonCmpt}
          // type={rest?.type ?? 'button'}
          // disabled={disabled}
          primary
          content={rest?.content ?? "등록"}
          {...rest}
        />
      )}
      {kind === "modal" && (
        <ModalCmpt
          className="confirm-modal"
          open={rest?.modalData.open ?? false}
        >
          <ModalCmpt.Header className="confirm-modal header">
            {/* {wk_name || vh_name ? '안내' : '수정'} */}
            {rest?.modalData?.header}
            {!rest?.modalData?.header &&
              rest?.modalData.type === "update" &&
              "수정"}
            {!rest?.modalData?.header &&
              rest?.modalData.type === "delete" &&
              "삭제"}
            {!rest?.modalData?.header &&
              rest?.modalData.type === "warning" &&
              "안내"}
            {!rest?.modalData?.header &&
              rest?.modalData.type === "kickout" &&
              `${rest?.modalData.usedType === "worker" ? "작업자" : "차량"}
              퇴출`}
            {!rest?.modalData?.header &&
              rest?.modalData.type === "complete" &&
              "확인"}
          </ModalCmpt.Header>
          <ModalCmpt.Content className="confirm-modal content">
            <ModalCmpt.Description className="confirm-modal description">
              <FontAwesomeIcon
                className={`modal-icon ${rest?.modalData.type}-icon`}
                icon={
                  rest?.modalData.type === "update"
                    ? faCircleExclamation
                    : rest?.modalData.type === "complete"
                    ? faCheckCircle
                    : faCircleMinus
                }
              />
              <div className="confirm-modal text">
                {rest?.modalData?.content}
                {!rest?.modalData?.content &&
                  rest?.modalData.type === "update" &&
                  "입력한 내용으로 수정하시겠습니까?"}
                {!rest?.modalData?.content &&
                  rest?.modalData.type === "delete" &&
                  "선택한 내용으로 삭제하시겠습니까?"}
                {!rest?.modalData?.content &&
                  rest?.modalData.type === "warning" &&
                  "경고 알람!!"}
                {!rest?.modalData?.content &&
                  rest?.modalData.type === "kickout" && (
                    <div>
                      <div>관리번호 : {rest?.modalData.mgtNumber}</div>
                      <div>
                        <span className="bold">{rest?.modalData.name}</span>
                        {rest?.modalData.usedType === "worker"
                          ? "님을"
                          : "을(를)"}{" "}
                        퇴출시키겠습니까?
                      </div>
                    </div>
                  )}
                {!rest?.modalData?.header &&
                  rest?.modalData.type === "complete" &&
                  "내용이 저장되었습니다."}
              </div>
            </ModalCmpt.Description>
          </ModalCmpt.Content>
          <ModalCmpt.Actions className="confirm-modal actions">
            {rest?.modalData.type !== "warning" &&
              rest?.modalData.type !== "complete" && (
                <ButtonCmpt
                  className={`confirm-modal-button confirm ${
                    rest?.modalData.type === "update" ? "update" : "delete"
                  }`}
                  color={rest?.modalData.type === "update" ? "blue" : "red"}
                  content={
                    rest?.modalData.type === "update"
                      ? "수정"
                      : rest?.modalData.type === "kickout"
                      ? "퇴출"
                      : "삭제"
                  }
                  labelPosition="right"
                  icon="checkmark"
                  onClick={() => rest?.setOpen({ action: true, open: false })}
                />
              )}

            <ButtonCmpt
              className="confirm-modal-button cancel"
              color="black"
              onClick={() => rest?.setOpen({ action: false, open: false })}
            >
              {rest?.modalData.type === "warning" ||
              rest?.modalData.type === "complete"
                ? "확인"
                : "취소"}
            </ButtonCmpt>
          </ModalCmpt.Actions>
        </ModalCmpt>
      )}
    </>
  );
};

export default FormElement;

// /**@description 숫자 입력 시, 3자리에서 ,를 찍는다. */
// export const addComma = (num) => {
//   if (!num) return;
//   // eslint-disable-next-line no-restricted-globals
//   const _number = isNaN(num) ? num.replaceAll(',', '') : num;
//   const _comma =
//     num <= 999
//       ? _number
//       : _number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
//   return _comma;
// };

// /**@description 12자리 이상 일 때, 입력된 값을 두자로 잘라서 : 를 넣는다. */
// export const splitByColon = (str = '') => {
//   const length = str.length;
//   let point = str.length % 2;
//   let splitedStr = '';

//   splitedStr = str.substring(0, point);
//   while (point < length) {
//     if (splitedStr !== '') splitedStr += ':';
//     splitedStr += str.substring(point, point + 2);
//     point += 2;
//   }

//   return splitedStr;
// };

// /**@description 12자리 이하 일 때,  입력된 값을 두자로 잘라서 : 를 넣는다. */
// export const splitByColonInput = (str) => {
//   const _str = str.replace(/:/g, '');
//   if (_str.length > 12) {
//     return splitByColon(_str.substring(0, 12));
//   }

//   const length = _str.length;
//   let point = _str.length % 2;
//   let splitedStr = '';
//   splitedStr = _str.substring(0, point);
//   while (point < length) {
//     if (splitedStr !== '') splitedStr += ':';
//     splitedStr += _str.substring(point, point + 2);
//     point += 2;
//   }
//   return splitedStr;
// };
