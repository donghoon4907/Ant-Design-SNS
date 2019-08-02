import React, { useCallback } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../../hooks/useInput";
import { EDIT_USERID_REQUEST } from "../../reducers/user";

const EditUserIdForm = () => {
  const dispatch = useDispatch();
  const { loadUserData } = useSelector(state => state.user);
  const editUserId = useInput();
  const onSubmit = useCallback(
    e => {
      e.preventDefault();
      if (loadUserData.userId === editUserId.value) {
        return alert("동일한 아이디 입니다.");
      }
      dispatch({
        type: EDIT_USERID_REQUEST,
        payload: editUserId.value
      });
    },
    [editUserId.value]
  );
  return (
    <Form
      style={{
        marginBottom: "20px",
        border: "1px solid #d9d9d9",
        padding: "20px"
      }}
      onSubmit={onSubmit}
    >
      <Input addonBefore="유저명" {...editUserId} />
      <Button type="primary">수정</Button>
    </Form>
  );
};

export default EditUserIdForm;
