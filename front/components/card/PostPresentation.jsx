import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "antd";
import Link from "next/link";
import TextareaAutosize from "react-autosize-textarea";

const PostPresentation = ({
  post,
  commentCount,
  isAddComment,
  commentRef,
  mapToDescription,
  mapToComment,
  mapToAddComment,
  mapToImages,
  onSubmit,
  loggedInUser
}) => (
  <Card>
    <Card.Meta
      title={
        <div>
          <div style={{ float: "left" }}>제목: {post.title}</div>
          <div style={{ float: "right" }}>
            {post.createdAt.replace("T", " ").substring(0, 19)}
          </div>
        </div>
      }
      description={<p>{mapToDescription(post.content.split(/(#[^\s]+)/g))}</p>}
    />
    <div>
      작성자: &nbsp;
      <Link
        href={{ pathname: "/user", query: { id: post.User.id } }}
        as={`/user/${post.User.id}`}
      >
        <a>{post.User.userId}</a>
      </Link>
    </div>
    {loggedInUser === post.User.userId && (
      <div style={{ float: "right" }}>
        <Button>수정</Button>
        <Button>삭제</Button>
      </div>
    )}
    {mapToImages()}
    <div style={{ marginTop: "20px" }}>
      <div>댓글 목록({commentCount})</div>
      <div>{mapToComment(post)}</div>
      <div>{mapToAddComment()}</div>
      <form onSubmit={onSubmit}>
        <div style={{ position: "relative" }}>
          <TextareaAutosize
            ref={commentRef}
            placeholder="댓글을 입력하세요."
            style={{
              float: "left",
              width: "85%",
              fontSize: "18px",
              border: "1px solid lightgray"
            }}
          />
          <Button
            htmlType="submit"
            loading={isAddComment}
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "15%",
              borderRadius: 0
            }}
          >
            작성
          </Button>
        </div>
      </form>
    </div>
  </Card>
);

export default PostPresentation;

PostPresentation.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    User: PropTypes.shape({
      userId: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired
    })
  }),
  loadUserData: PropTypes.shape({ userId: PropTypes.string.isRequired }),
  commentCount: PropTypes.number.isRequired,
  isAddComment: PropTypes.bool.isRequired,
  commentRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({ current: PropTypes.elementType })
  ]),
  mapToDescription: PropTypes.func.isRequired,
  mapToComment: PropTypes.func.isRequired,
  mapToAddComment: PropTypes.func.isRequired,
  mapToImages: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loggedInUser: PropTypes.string.isRequired
};
