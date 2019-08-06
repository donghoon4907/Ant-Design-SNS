import React from "react";
import Link from "next/link";
import Router from "next/router";
import { Menu, Icon, Button, Avatar } from "antd";
import PropTypes from "prop-types";
import {
  LayoutContainer,
  UserInfoContainer,
  Thumbnail,
  ChildContainer
} from "./LayoutStyledComponents";

const LayoutPresentation = ({ children, onLogout, loadUserData }) => (
  <>
    <LayoutContainer>
      <div>
        <UserInfoContainer>
          {loadUserData.thumbnail === "none" ? (
            <Avatar
              shape="square"
              icon="user"
              style={{ width: "100%", height: "180px", fontSize: 180 }}
            />
          ) : (
            <Thumbnail
              src={`http://localhost:3001/${loadUserData.thumbnail}`}
              alt="load error"
            />
          )}
        </UserInfoContainer>
        <div>
          <div style={{ fontSize: "20px" }}>
            {loadUserData.userId} 님 반갑습니다.
          </div>
        </div>
        <div>
          <Button onClick={onLogout} style={{ width: "100%" }}>
            로그아웃
          </Button>
        </div>
      </div>

      <Menu
        mode="vertical"
        defaultSelectedKeys={[Router.pathname]}
        style={{
          height: "80vh",
          marginTop: "1vh",
          borderTop: "1px solid #e8e8e8"
        }}
      >
        <Menu.Item key="/">
          <Link href="/">
            <a>
              <Icon type="home" />
              HOME
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/profile">
          <Link href="/profile">
            <a>
              <Icon type="setting" />
              PROFILE
            </a>
          </Link>
        </Menu.Item>
      </Menu>
    </LayoutContainer>
    <ChildContainer>{children}</ChildContainer>
  </>
);

export default LayoutPresentation;

LayoutPresentation.propTypes = {
  children: PropTypes.node.isRequired,
  onLogout: PropTypes.func.isRequired,
  loadUserData: PropTypes.shape({
    createdAt: PropTypes.string,
    id: PropTypes.number,
    thumbnail: PropTypes.string,
    updatedAt: PropTypes.string,
    userId: PropTypes.string
  })
};
