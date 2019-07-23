import React, { useState, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { SIGN_UP_REQUEST } from "../../reducers/user";
import SignUpPresentation from "./SignUpPresentation";

const SignUpContainer = ({ onCancel }) => {
  const fileRef = useRef(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [thumbnail, setThumbnail] = useState(""); // 미리보기
  const [selectedFile, setSelectedFile] = useState(null); // 파일 데이터
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);

  const dispatch = useDispatch();
  const { isSignUpLoading, signUpErrorReason } = useSelector(
    state => state.user
  );

  const onClick = useCallback(() => {
    fileRef.current.click();
  }, []);

  const onChangeThumbnail = useCallback(
    e => {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        setThumbnail(reader.result);
        setSelectedFile(file);
      };

      reader.readAsDataURL(file);
    },
    [selectedFile, thumbnail]
  );
  const onChangeUserId = useCallback(e => {
    setUserId(e.target.value);
  }, []);
  const onChangePassword = useCallback(e => {
    setPassword(e.target.value);
  }, []);
  const onChangePasswordCheck = useCallback(
    e => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );
  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked);
  }, []);
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (password !== passwordCheck) {
        return setPasswordError(true);
      } else {
        setPasswordError(false);
      }

      if (!term) {
        return setTermError(true);
      } else {
        setTermError(false);
      }
      dispatch({
        type: SIGN_UP_REQUEST,
        payload: {
          userId,
          password,
          selectedFile,
          successEvent: onCancel
        }
      });
    },
    [userId, password, passwordCheck, term, signUpErrorReason]
  );
  return (
    <SignUpPresentation
      onSubmit={onSubmit}
      onClick={onClick}
      onChangeUserId={onChangeUserId}
      onChangePassword={onChangePassword}
      onChangePasswordCheck={onChangePasswordCheck}
      onChangeTerm={onChangeTerm}
      onChangeThumbnail={onChangeThumbnail}
      thumbnail={thumbnail}
      fileRef={fileRef}
      userId={userId}
      password={password}
      passwordCheck={passwordCheck}
      passwordError={passwordError}
      term={term}
      termError={termError}
      isSignUpLoading={isSignUpLoading}
      onCancel={onCancel}
    />
  );
};

export default SignUpContainer;

SignUpContainer.propTypes = {
  onCancel: PropTypes.func.isRequired
};
