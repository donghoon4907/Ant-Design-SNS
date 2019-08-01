import React from "react";
import PropTypes from "prop-types";
import {
  StyledButton,
  StyledForm,
  StyledInput
} from "../common/StyledAntdComponents";

const LoginPresentation = ({
  onSubmit,
  userId,
  userPwd,
  isLoginLoading,
  onSignUp
}) => (
  <StyledForm onSubmit={onSubmit} autoComplete="off">
    <div>
      <div>
        <StyledInput required {...userId} placeholder="아이디" />
      </div>
      <div>
        <StyledInput required {...userPwd} placeholder="암호" />
      </div>
      <div>
        <StyledButton htmlType="submit" loading={isLoginLoading}>
          로그인
        </StyledButton>
      </div>
      <div>
        <StyledButton htmlType="button" onClick={onSignUp}>
          회원가입
        </StyledButton>
      </div>
    </div>
  </StyledForm>
);

export default LoginPresentation;

LoginPresentation.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  userId: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func
  }),
  userPwd: PropTypes.shape({
    value: PropTypes.string,
    onChange: PropTypes.func
  }),
  isLoginLoading: PropTypes.bool.isRequired,
  onSignUp: PropTypes.func.isRequired
};
