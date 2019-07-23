import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { LOG_IN_REQUEST } from "../../reducers/user";
import LoginPresentation from "./LoginPresentation";
import SignUpPage from "./SignUpContainer";

const LoginContainer = () => {
  const userId = useInput("");
  const userPwd = useInput("");
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const onSignUp = useCallback(() => {
    setIsSignUp(true);
  }, []);
  const onCancel = useCallback(() => {
    setIsSignUp(false);
  }, []);
  const { isLoginLoading } = useSelector(state => state.user);
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (!userId.value) return alert("아이디를 입력하세요.");
      if (!userPwd.value) return alert("비밀번호를 입력하세요.");
      return dispatch({
        type: LOG_IN_REQUEST,
        payload: {
          userId: userId.value,
          password: userPwd.value
        }
      });
    },
    [userId.value, userPwd.value]
  );
  return isSignUp ? (
    <SignUpPage onCancel={onCancel} />
  ) : (
    <LoginPresentation
      onSubmit={onSubmit}
      userId={userId}
      userPwd={userPwd}
      isLoginLoading={isLoginLoading}
      onSignUp={onSignUp}
      onCancel={onCancel}
    />
  );
};

export default LoginContainer;
