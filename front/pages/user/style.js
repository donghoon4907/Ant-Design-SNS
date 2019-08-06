import styled from "styled-components";

export const Container = styled.div`
  & > div {
    height: 400px;
    position: relative;
    border-bottom: 1px dotted lightgray;
  }
`;

export const Thumbnail = styled.div`
  position: absolute;
  top: 60px;
  left: 120px;

  & > img {
    width: 260px;
    height: 260px;
    border-radius: 50%;
  }
`;

export const Description = styled.div`
  position: absolute;
  top: 120px;
  left: 500px;
  font-size: 32px;

  & > div:nth-child(1) {
    margin-bottom: 30px;
  }
`;
