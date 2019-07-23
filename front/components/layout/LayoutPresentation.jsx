import React, { memo } from "react";
import Link from "next/link";
import Router from "next/router";
import { Menu, Icon, Button } from "antd";
import PropTypes from "prop-types";

const LayoutPresentation = ({ children, onLogout, loadUserData }) => (
  <>
    <div style={{ position: "fixed", width: "240px" }}>
      {loadUserData.thumbnail !== "none" && (
        <img
          src={`http://localhost:3001/${loadUserData.thumbnail}`}
          style={{ width: "30px", height: "30px" }}
          alt="load error"
        />
      )}
      <span>{loadUserData.userId}</span>
      <Button style={{ float: "right" }} onClick={onLogout}>
        로그아웃
      </Button>
      <Menu
        mode="vertical"
        defaultSelectedKeys={[Router.pathname]}
        style={{
          height: "97vh",
          marginTop: "3vh",
          borderTop: "1px solid #E8E8E8"
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
    </div>
    <div style={{ marginLeft: "250px", paddingRight: "10px" }}>{children}</div>
  </>
);

export default memo(LayoutPresentation);

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
