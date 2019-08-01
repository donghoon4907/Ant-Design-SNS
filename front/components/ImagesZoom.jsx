import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import Slick from "react-slick";
import {
  Container,
  StyledHeader,
  StyledH1,
  StyledIcon,
  ImageContainer,
  PageNumContainer,
  PageNumber
} from "./ImagesZoomStyledComponent";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const mapToImages = useCallback(
    () =>
      images.map((image, idx) => (
        <div key={`detailImage${idx + 1}`}>
          <img
            src={`http://localhost:3001/${image.src}`}
            alt="load error"
            style={{ margin: "0 auto", maxHeight: 750 }}
          />
        </div>
      )),
    []
  );
  return (
    <Container>
      <StyledHeader>
        <StyledH1>상세 이미지</StyledH1>
        <StyledIcon type="close" onClick={onClose} />
      </StyledHeader>
      <ImageContainer>
        <div>
          <Slick
            initialSlide={0}
            afterChange={slide => setCurrentSlide(slide)}
            infinite={false}
            arrows
            slidesToShow={1}
            slidesToScroll={1}
          >
            {mapToImages.call(this)}
          </Slick>
          <PageNumContainer>
            <PageNumber>
              {currentSlide + 1} / {images.length}
            </PageNumber>
          </PageNumContainer>
        </div>
      </ImageContainer>
    </Container>
  );
};

export default ImagesZoom;

ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired
};
