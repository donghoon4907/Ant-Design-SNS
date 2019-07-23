import styled from "styled-components";
import flex from "../../theme/_flex";

export const Thumbnail = styled.div`
  ${flex}
  width: 128px;
  height: 128px;
  border-radius: 50%;
  border: 1px solid lightgray;
  textalign: center;
  background: url(${props => props.thumbnail}) no-repeat center;
  background-size: cover;
`;
export const ThumbnailContainer = styled.div`
  ${flex}
  width: ${props => props.theme.loginAndSignUpContainerWidth};
  margin-bottom: ${props => props.theme.loginAndSignUpMargin}
`;
