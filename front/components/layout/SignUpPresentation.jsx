import React, { memo } from "react";
import { Checkbox, Avatar } from "antd";
import PropTypes from "prop-types";
import { ThumbnailContainer, Thumbnail } from "./SignUpStyledComponent";
import {
  StyledForm,
  StyledInput,
  StyledButton
} from "../common/StyledAntdComponents";

const SignUpPresentation = ({
  onSubmit,
  onClick,
  onChangeUserId,
  onChangePassword,
  onChangePasswordCheck,
  onChangeTerm,
  onChangeThumbnail,
  thumbnail,
  fileRef,
  userId,
  password,
  passwordCheck,
  passwordError,
  term,
  termError,
  isSignUpLoading,
  onCancel
}) => (
  <StyledForm onSubmit={onSubmit} autoComplete="off">
    <div>
      <ThumbnailContainer>
        <Thumbnail thumbnail={thumbnail} onClick={onClick}>
          {!thumbnail && <Avatar icon="user" size={128} />}
          <input
            type="file"
            hidden
            ref={fileRef}
            onChange={onChangeThumbnail}
          />
        </Thumbnail>
      </ThumbnailContainer>
      <div>
        <StyledInput
          required
          onChange={onChangeUserId}
          value={userId}
          placeholder="아이디"
        />
      </div>
      <div>
        <StyledInput
          required
          onChange={onChangePassword}
          value={password}
          placeholder="암호"
        />
      </div>
      <div>
        <StyledInput
          required
          onChange={onChangePasswordCheck}
          value={passwordCheck}
          placeholder="암호확인"
        />
        {passwordError && (
          <p style={{ color: "red" }}>패스워드가 일치하지 않습니다.</p>
        )}
      </div>
      <div>
        <Checkbox name="user-term" value={term} onChange={onChangeTerm}>
          약관에 동의합니다.
        </Checkbox>
        {termError && <p style={{ color: "red" }}>약관에 동의하셔야 합니다.</p>}
      </div>
      <div>
        <StyledButton htmlType="submit" loading={isSignUpLoading}>
          회원가입
        </StyledButton>
        <StyledButton htmlType="button" onClick={onCancel}>
          취소
        </StyledButton>
      </div>
    </div>
  </StyledForm>
);

export default memo(SignUpPresentation);

SignUpPresentation.propTypes = {
  onClick: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChangeUserId: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  onChangePasswordCheck: PropTypes.func.isRequired,
  onChangeTerm: PropTypes.func.isRequired,
  onChangeThumbnail: PropTypes.func.isRequired,
  thumbnail: PropTypes.string,
  fileRef: PropTypes.shape({
    current: PropTypes.object
  }),
  userId: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  passwordCheck: PropTypes.string.isRequired,
  passwordError: PropTypes.bool.isRequired,
  term: PropTypes.bool.isRequired,
  termError: PropTypes.bool.isRequired,
  isSignUpLoading: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired
};
