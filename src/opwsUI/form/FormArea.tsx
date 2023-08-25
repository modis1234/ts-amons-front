import React from "react";
import { Form } from "semantic-ui-react";
import styled from "styled-components";

const FormAreaCmpt = styled(Form)`
  height: 100%;
  &.form-body {
    .resizable-area {
      height: 89%;
      /* height: 93%; */
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

type FormAreaType = {
  children: React.ReactNode;
  submitButton: React.ReactElement;
  id: string;
  className: string;
};

const FormArea = ({ children, submitButton, id, className }: FormAreaType) => {
  return (
    <FormAreaCmpt id={id} className={`form-body ${className ? className : ""}`}>
      <div className="resizable-area">{children}</div>
      {submitButton}
    </FormAreaCmpt>
  );
};

export default React.memo(FormArea);
