import styled from "styled-components";
import { Form, Button, Input } from "antd";
import flex from "../../theme/_flex";

export const StyledForm = styled(Form)`
  ${flex}
  width: 100vw;
  height: 100vh;
`;
export const StyledButton = styled(Button)`
  width: 100%;
  height: ${props => props.theme.loginAndSignUpInputHeight}
  margin-bottom: ${props => props.theme.loginAndSignUpMargin}
`;

export const StyledInput = styled(Input)`
  width: ${props => props.theme.loginAndSignUpContainerWidth}
  height: ${props => props.theme.loginAndSignUpInputHeight}
  margin-bottom: ${props => props.theme.loginAndSignUpMargin}
`;
