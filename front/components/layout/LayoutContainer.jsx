import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import LayoutPresentation from "./LayoutPresentation";
import { LOG_OUT_REQUEST } from "../../reducers/user";
import LoginPage from "./LoginContainer";
import LoadingPage from "./Loading";

const LayoutContainer = ({ children }) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true); // 초기화면이 랜더링될 때 까지 로딩화면 컨트롤
  const { loadUserData } = useSelector(state => state.user);
  const onLogout = useCallback(e => {
    e.preventDefault();
    dispatch({
      type: LOG_OUT_REQUEST
    });
  }, []);
  useEffect(() => {
    setLoad(false);
  }, []);

  return load ? (
    <LoadingPage />
  ) : !loadUserData ? (
    <LoginPage />
  ) : (
    <LayoutPresentation
      children={children}
      loadUserData={loadUserData}
      onLogout={onLogout}
    />
  );
};

export default LayoutContainer;

LayoutContainer.propTypes = {
  children: PropTypes.node.isRequired
};
