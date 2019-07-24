import styled from "styled-components";
import flex from "../theme/_flex";

export const StyledImg = styled.img`
  width: ${props => (props.check ? "50%" : "100%")};
  height: 400px;
  display: inline-block;
`;

export const AddImageContainer = styled.div`
  ${flex}
  float: right;
  width: 50%;
  height: 400px;
  text-align: center;
`;

export const AddImageBtn = styled.div`
  ${flex}
  background: black;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  color: white;
`;
