import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../../components/card/PostContainer";
import {
  LOAD_HASHTAG_POST_REQUEST
  //MODIFY_POST_REQUEST,
  //REMOVE_POST_REQUEST
} from "../../reducers/post";

const HashTag = ({ tag }) => {
  const dispatch = useDispatch();
  const { mainPosts } = useSelector(state => state.post);
  const mapToComponent = useCallback(
    () =>
      mainPosts.map((post, idx) => (
        <div key={`${post.title + idx}`} style={{ marginBottom: "10px" }}>
          <PostCard post={post} />
        </div>
      )),
    [mainPosts]
  );
  useEffect(() => {
    dispatch({
      type: LOAD_HASHTAG_POST_REQUEST,
      payload: tag
    });
  }, [tag]);
  return <div>{mapToComponent.call(this)}</div>;
};

// getInitialProps: componentDidMount보다 먼저 발생, 클라이언트 및 서버에서 동작, 서버사이드 렌더링(서버쪽에서 데이터를 받은 이후 렌더링하는 경우)
// ctx { query: ...}
HashTag.getInitialProps = async ({ query: { tag } }) => ({ tag });

export default HashTag;

HashTag.propTypes = {
  tag: PropTypes.string.isRequired
};
