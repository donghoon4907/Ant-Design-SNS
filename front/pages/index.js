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
  const onScroll = () => {
    const scrollY = window.scrollY; // 스크롤 내린 거리
    const clientHeight = document.documentElement.clientHeight; // 화면 높이
    const scrollHeight = document.documentElement.scrollHeight; // 전체 화면 길이
    if (
      scrollY + clientHeight > scrollHeight - 300 &&
      mainPosts.length % 5 === 0
    ) {
      // 마지막 포스트의 아이디로 다음 컨텐츠를 요청합니다.
      return dispatch({
        type: LOAD_MAIN_POST_REQUEST,
        payload: mainPosts[mainPosts.length - 1].id
      });
    }
  };
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
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mainPosts && mainPosts.length]);
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
      {mapToComponent.call(this)}
    </div>
  );
};
// NEXT가 제공하는 SSR life cycle
// app.js에서 주입한 ctx가 context
// ctx 내부의 store는 서버에서 리덕스 작업을 할 수 있도록 돕는다.
Main.getInitialProps = async context => {
  context.store.dispatch({
    type: LOAD_MAIN_POST_REQUEST
  });
};

export default Main;
