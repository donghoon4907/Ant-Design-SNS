import React, { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../../components/card/PostContainer";
import { LOAD_HASHTAG_POST_REQUEST } from "../../reducers/post";

const HashTag = ({ tag }) => {
  const dispatch = useDispatch();
  const { hashTagPosts } = useSelector(state => state.post);
  const onScroll = () => {
    const scrollY = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    if (
      scrollY + clientHeight > scrollHeight - 300 &&
      hashTagPosts.length % 5 === 0
    ) {
      return dispatch({
        type: LOAD_HASHTAG_POST_REQUEST,
        payload: hashTagPosts[hashTagPosts.length - 1].id,
        tag
      });
    }
  };
  const mapToComponent = useCallback(
    () =>
      hashTagPosts.map((post, idx) => (
        <div key={`${post.title + idx}`} style={{ marginBottom: "10px" }}>
          <PostCard post={post} />
        </div>
      )),
    [hashTagPosts && hashTagPosts]
  );
  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div>
      <h1>#{tag} 관련 포스트</h1>
      {mapToComponent.call(this)}
    </div>
  );
};

// getInitialProps: componentDidMount보다 먼저 발생, 클라이언트 및 서버에서 동작, 서버사이드 렌더링(서버쪽에서 데이터를 받은 이후 렌더링하는 경우)
// ctx { query: ...}
HashTag.getInitialProps = async context => {
  const { tag } = context.query;
  const { store } = context;
  const state = store.getState();
  state.post.hashTagPosts = [];
  store.dispatch({
    type: LOAD_HASHTAG_POST_REQUEST,
    payload: tag
  });
  return { tag };
};

export default HashTag;

HashTag.propTypes = {
  tag: PropTypes.string.isRequired
};
