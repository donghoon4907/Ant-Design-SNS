import React from "react";
import { Form, Input, List, Button, Card, Icon } from "antd";

const Profile = () => (
  <div>
    <Form
      style={{
        marginBottom: "20px",
        border: "1px solid black",
        padding: "20px"
      }}
    >
      <Input addonBefore="닉네임" />
      <Button type="primary">수정</Button>
      <List
        style={{ marginBottom: "20px" }}
        grid={{ gutter: 4, xs: 2, md: 3 }}
        size="small"
        header={<div>팔로워 목록</div>}
        loadMore={<Button style={{ width: "100%" }}>더 보기</Button>}
        bordered
        dataSource={["1", "2", "3"]}
        renderItem={item => (
          <List.Item style={{ marginTop: "20px" }}>
            <Card actions={[<Icon key="stop" type="stop" />]}>
              <Card.Meta description={item} />
            </Card>
          </List.Item>
        )}
      />
    </Form>
  </div>
);

export default Profile;
