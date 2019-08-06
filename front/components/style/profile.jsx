import styled from "styled-components";
import { Avatar } from "antd";

export const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
  border-radius: 50%;
`;

export const UserName = styled.div`
  font-size: 20px;
  text-align: center;
`;

export const StyledAvatar = styled(Avatar)`
  width: 100%;
  height: 180px;
  font-size: 150px;
`;
