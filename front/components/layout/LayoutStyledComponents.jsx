import styled from "styled-components";
import { Menu } from "antd";

export const StyledMenu = styled(Menu)`
  height: 80vh;
  margin-top: 1vh;
  border-top: 1px solid #e8e8e8;
`;

export const LayoutContainer = styled.div`
  position: fixed;
  width: 240px;
`;

export const UserInfoContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
`;

export const Thumbnail = styled.img`
  width: 100%;
  height: 180px;
`;

export const ChildContainer = styled.div`
  margin-left: 250px;
  padding-right: 10px;
`;
