import React, { useCallback, useState, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_POST_REQUEST,
  UPLOAD_IMAGES_REQUEST,
  REMOVE_IMAGE
} from "../../reducers/post";
import AddPostPresentation from "./AddPostPresentation";
import { StyledButton } from "../common/StyledAntdComponents";

const AddPostContainer = ({ visible, setVisible }) => {
  const imageRef = useRef(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const { images } = useSelector(state => state.post);
  const onChangeTitle = useCallback(e => {
    setTitle(e.target.value);
  }, []);
  const onChangeContent = useCallback(e => {
    setContent(e.target.value);
  }, []);
  const onSubmit = useCallback(e => {
    e.preventDefault();
  }, []);
  const onConfirm = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      payload: {
        images,
        title,
        content
      }
    });
    setVisible(false);
    setTitle("");
    setContent("");
  }, [title, content, images]);
  const onCancel = useCallback(() => {
    setVisible(false);
  }, []);
  const onClickUpload = useCallback(() => {
    imageRef.current.click();
  }, [imageRef.current]);
  const onChangeUpload = useCallback(e => {
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      payload: e.target.files
    });
    imageRef.current.value = "";
  }, []);
  const onRemoveImage = useCallback(
    idx => () => {
      dispatch({
        type: REMOVE_IMAGE,
        payload: idx
      });
    },
    []
  );
  const mapToImages = useCallback(
    () =>
      images &&
      images.map((image, idx) => (
        <div key={`image${idx + 1}`}>
          <img
            src={`http://localhost:3001/${image}`}
            alt="load error"
            style={{ width: "100%", height: "100px", marginTop: "5px" }}
          />
          <StyledButton onClick={onRemoveImage(idx)}>삭제</StyledButton>
        </div>
      )),
    [images]
  );
  return (
    <AddPostPresentation
      imageRef={imageRef}
      mapToImages={mapToImages}
      visible={visible}
      title={title}
      content={content}
      onConfirm={onConfirm}
      onCancel={onCancel}
      onChangeContent={onChangeContent}
      onChangeTitle={onChangeTitle}
      onSubmit={onSubmit}
      onClickUpload={onClickUpload}
      onChangeUpload={onChangeUpload}
    />
  );
};

export default AddPostContainer;

AddPostContainer.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired
};
