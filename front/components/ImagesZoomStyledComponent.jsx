import styled from "styled-components";
import { Icon } from "antd";

export const Container = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const StyledHeader = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;
  border-bottom: 1px solid lightgray;
`;

export const StyledH1 = styled.h1`
  margin: 0;
  font-size: 17px;
  color: #333;
  line-height: 44px;
`;

export const StyledIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  lineheight: 14px;
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  height: calc(100% - 44px);
  background: #f6f8fa;
`;

export const PageNumContainer = styled.div`
  padding: 1rem;
`;
export const PageNumber = styled.div`
  width: 75px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  background: #0366d6;
  text-align: center;
  color: white;
  font-size: 15px;
  margin: 0 auto;
`;
