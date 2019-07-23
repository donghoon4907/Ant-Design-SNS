import React from "react";
import { Modal, Form, Button, Input } from "antd";
import PropTypes from "prop-types";

const AddPostPresentation = ({
  imageRef,
  mapToImages,
  visible,
  title,
  content,
  onConfirm,
  onCancel,
  onChangeContent,
  onChangeTitle,
  onSubmit,
  onClickUpload,
  onChangeUpload
}) => (
  <div>
    <Modal
      title="Modal"
      visible={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="작성"
      cancelText="취소"
    >
      <Form encType="multipart/form-data" onSubmit={onSubmit}>
        <div>
          <label htmlFor="add-post-title">제목</label>
          <br />
          <Input
            name="add-post-title"
            placeholder="제목을 입력하세요"
            onChange={onChangeTitle}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="add-post-content">내용</label>
          <br />
          <Input.TextArea
            name="add-post-content"
            placeholder="내용을 입력하세요"
            onChange={onChangeContent}
            value={content}
          />
        </div>
        <div>
          <input type="file" ref={imageRef} onChange={onChangeUpload} hidden />
          <Button onClick={onClickUpload}>이미지 업로드</Button>
          {mapToImages()}
          <div />
        </div>
      </Form>
    </Modal>
  </div>
);

export default AddPostPresentation;

AddPostPresentation.propTypes = {
  imageRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({ current: PropTypes.elementType })
  ]),
  mapToImages: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChangeContent: PropTypes.func.isRequired,
  onChangeTitle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClickUpload: PropTypes.func.isRequired,
  onChangeUpload: PropTypes.func.isRequired
};
