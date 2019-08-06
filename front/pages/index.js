import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
import { LOAD_MAIN_POST_REQUEST } from "../reducers/post";
import Modal from "../components/modal/AddPostContainer";
import PostCard from "../components/card/PostContainer";

const Main = () => {
  const dispatch = useDispatch();
  const countRef = useRef([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const { mainPosts, isLoadPosts } = useSelector(state => state.post);

  const onScroll = () => {
    const scrollY = window.scrollY; // 스크롤 내린 거리
    const { clientHeight, scrollHeight } = document.documentElement; // 화면 높이 및 전체 화면 길이
    const lastId =
      mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id;
    // 특정 위치로 스크롤 한 경우
    if (
      scrollY + clientHeight > scrollHeight - 300 &&
      mainPosts.length % 5 === 0
    ) {
      // 저장되지 않은 id일 경우
      if (!countRef.current.includes(lastId)) {
        // 마지막 포스트의 아이디로 다음 컨텐츠를 요청합니다.
        dispatch({
          type: LOAD_MAIN_POST_REQUEST,
          payload: lastId
        });
        countRef.current.push(lastId);
      }
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

/* 검색엔진 최적화 
          <Helmet
            title={`${post.User.userId}님의 글`}
            description={post.content}
            meta={[
              { name: "description", content: post.content },
              {
                property: "og:title",
                content: `${post.User.userId}님의 게시글`
              },
              { property: "og:description", content: post.content },
              {
                property: "og:image",
                content:
                  post.Images[0] &&
                  `http://localhost:3065/${post.Images[0].src}`
              },
              {
                property: "og:url",
                content: `http://localhost:3060/post/${post.id}`
              }
            ]}
          />
          - itemScope
          */
