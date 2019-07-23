import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { LOAD_MAIN_POST_REQUEST } from "../reducers/post";
import Modal from "../components/modal/AddPostContainer";
import PostCard from "../components/card/PostContainer";

const Main = () => {
  const dispatch = useDispatch();
  const [visibleModal, setVisibleModal] = useState(false);
  const { mainPosts } = useSelector(state => state.post);
  const { isLoadPosts } = useSelector(state => state.post);
  const onClickAddPost = useCallback(() => {
    setVisibleModal(true);
  }, []);
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
      type: LOAD_MAIN_POST_REQUEST
    });
  }, []);
  return (
    <div>
      {visibleModal && (
        <Modal visible={visibleModal} setVisible={setVisibleModal} />
      )}
      <div style={{ marginBottom: "15px" }}>
        <Button
          onClick={onClickAddPost}
          style={{ width: "100%", marginBottom: "11px" }}
          loading={isLoadPosts}
        >
          새 포스트
        </Button>
      </div>
      {mapToComponent()}
    </div>
  );
};

export default Main;
