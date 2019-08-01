import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import ImagesZoom from "./ImagesZoom";
import {
  StyledImg,
  AddImageContainer,
  AddImageBtn
} from "./PostImagesStyledComponent";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);
  if (images.length === 0) {
    return <></>;
  }
  if (images.length === 1) {
    return (
      <>
        <StyledImg
          src={`http://localhost:3001/${images[0].src}`}
          alt="load error"
          onClick={onZoom}
        />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <StyledImg
            check
            src={`http://localhost:3001/${images[0].src}`}
            alt="load error"
            onClick={onZoom}
          />
          <StyledImg
            check
            src={`http://localhost:3001/${images[1].src}`}
            alt="load error"
            onClick={onZoom}
          />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <StyledImg
          check
          src={`http://localhost:3001/${images[0].src}`}
          alt="load error"
          onClick={onZoom}
        />
        <AddImageContainer>
          <AddImageBtn onClick={onZoom}>
            <div>
              <Icon type="plus" style={{ fontSize: "40px" }} />
              <br />
              {images.length - 1}
              개의 사진 더보기
            </div>
          </AddImageBtn>
        </AddImageContainer>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

export default PostImages;

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string
    })
  ).isRequired
};
