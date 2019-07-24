import React from "react";
import PropTypes from "prop-types";
import { Card, Button, Icon } from "antd";
import Link from "next/link";
import TextareaAutosize from "react-autosize-textarea";
import PostImages from "../PostImages";

const PostPresentation = ({
  post,
  commentCount,
  isAddComment,
  isLike,
  commentRef,
  mapToDescription,
  mapToComment,
  mapToAddComment,
  onLike,
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
    <PostImages images={post.Images} />

    <div style={{ border: "1px solid lightgray" }}>
      {isLike ? (
        <Icon
          type="heart"
          onClick={onLike}
          style={{ cursor: "pointer", fontSize: "30px" }}
          theme="filled"
        />
      ) : (
        <Icon
          type="heart"
          onClick={onLike}
          style={{ cursor: "pointer", fontSize: "30px" }}
        />
      )}
      {loggedInUser === post.User.userId && (
        <>
          <Button style={{ float: "right" }}>포스트 수정</Button>
          <Button style={{ float: "right" }}>포스트 삭제</Button>
        </>
      )}
    </div>

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
    }),
    Images: PropTypes.arrayOf(PropTypes.shape({ src: PropTypes.string }))
      .isRequired
  }),
  loadUserData: PropTypes.shape({ userId: PropTypes.string.isRequired }),
  commentCount: PropTypes.number.isRequired,
  isAddComment: PropTypes.bool.isRequired,
  isLike: PropTypes.bool.isRequired,
  commentRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({ current: PropTypes.elementType })
  ]),
  mapToDescription: PropTypes.func.isRequired,
  mapToComment: PropTypes.func.isRequired,
  mapToAddComment: PropTypes.func.isRequired,
  onLike: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loggedInUser: PropTypes.string.isRequired
};
