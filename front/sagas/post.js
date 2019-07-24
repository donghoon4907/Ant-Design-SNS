import { all, fork, takeEvery, put, call } from "redux-saga/effects";
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_MAIN_POST_REQUEST,
  LOAD_MAIN_POST_SUCCESS,
  LOAD_MAIN_POST_FAILURE,
  LOAD_HASHTAG_POST_REQUEST,
  LOAD_HASHTAG_POST_SUCCESS,
  LOAD_HASHTAG_POST_FAILURE,
  LOAD_USER_POST_REQUEST,
  LOAD_USER_POST_SUCCESS,
  LOAD_USER_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE
} from "../reducers/post";
import axios from "axios";

// 새 포스트 작성시 쿠키도 함께 보내기
function addPostAPI(postData) {
  return axios
    .post("/post/add", postData, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function loadPostAPI() {
  return axios
    .get("/post/load")
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function loadHashTagPostAPI(tag) {
  return axios
    .get(`/hashtag/${tag}`)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function loadUserPostAPI(id) {
  return axios
    .get(`/user/${id}`, {}, { withCredentials: true })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function addCommentAPI({ postId, content }) {
  return axios
    .post(
      `/post/${postId}/comment`,
      { content },
      {
        withCredentials: true
      }
    )
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function uploadImageAPI(files) {
  const formData = new FormData();
  [].forEach.call(files, file => {
    formData.append("image", file);
  });
  return axios
    .post("/post/upload", formData, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function likePostAPI(postId) {
  return axios
    .post(
      `/post/${postId}/like`,
      {},
      {
        withCredentials: true
      }
    )
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function unlikePostAPI(postId) {
  return axios
    .delete(`/post/${postId}/like`, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function* addPost(action) {
  const { response, error } = yield call(addPostAPI, action.payload);
  if (response) {
    yield put({
      type: ADD_POST_SUCCESS,
      payload: response.data
    });
    alert("포스트 작성 성공");
  } else if (error) {
    console.error(error);
    yield put({
      type: ADD_POST_FAILURE,
      error
    });
    alert(error);
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* removePost() {
  try {
    yield put({
      type: REMOVE_POST_SUCCESS
    });
    alert("포스트 삭제 성공");
  } catch (e) {
    console.error(e);
    yield put({
      type: REMOVE_POST_FAILURE,
      error: e
    });
  }
}

function* loadPost() {
  const { response, error } = yield call(loadPostAPI);
  if (response) {
    yield put({
      type: LOAD_MAIN_POST_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    console.error(error);
    yield put({
      type: LOAD_MAIN_POST_FAILURE,
      error
    });
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* loadHashTagPost(action) {
  const { response, error } = yield call(loadHashTagPostAPI, action.payload);
  if (response) {
    yield put({
      type: LOAD_HASHTAG_POST_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    console.error(error);
    yield put({
      type: LOAD_HASHTAG_POST_FAILURE,
      error
    });
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* loadUserPost(action) {
  const { response, error } = yield call(loadUserPostAPI, action.payload);
  if (response) {
    yield put({
      type: LOAD_USER_POST_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_POST_FAILURE,
      error
    });
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* addComment(action) {
  const { response, error } = yield call(addCommentAPI, action.payload);
  if (response) {
    yield put({
      type: ADD_COMMENT_SUCCESS
    });
    alert("댓글 작성 완료");
  } else if (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      error
    });
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* uploadImage(action) {
  const { response, error } = yield call(uploadImageAPI, action.payload);
  if (response) {
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      payload: response.data
    });
    alert("이미지 업로드 완료");
  } else if (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error
    });
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* likePost(action) {
  const { response, error } = yield call(likePostAPI, action.payload);
  if (response) {
    yield put({
      type: LIKE_POST_SUCCESS
    });
    alert(response.data);
  } else if (error) {
    console.error(error);
    yield put({
      type: LIKE_POST_FAILURE,
      error
    });
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* unlikePost(action) {
  const { response, error } = yield call(unlikePostAPI, action.payload);
  if (response) {
    yield put({
      type: UNLIKE_POST_SUCCESS
    });
    alert(response.data);
  } else if (error) {
    console.error(error);
    yield put({
      type: UNLIKE_POST_FAILURE,
      error
    });
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}
// 포스트 추가
function* watchAddPost() {
  yield takeEvery(ADD_POST_REQUEST, addPost);
}
// 포스트 불러오기
function* watchLoadPost() {
  yield takeEvery(LOAD_MAIN_POST_REQUEST, loadPost);
}
// 포스트 삭제
function* watchRemovePost() {
  yield takeEvery(REMOVE_POST_REQUEST, removePost);
}
// 특정 해쉬태그 관련 포스트 불러오기
function* watchLoadHashtagPost() {
  yield takeEvery(LOAD_HASHTAG_POST_REQUEST, loadHashTagPost);
}
// 특정 유저가 작성한 포스트 불러오기
function* watchLoadUserPost() {
  yield takeEvery(LOAD_USER_POST_REQUEST, loadUserPost);
}
// 댓글 작성
function* watchAddComment() {
  yield takeEvery(ADD_COMMENT_REQUEST, addComment);
}
// 이미지 업로드
function* watchUploadImage() {
  yield takeEvery(UPLOAD_IMAGES_REQUEST, uploadImage);
}
// 좋아요
function* watchLikePost() {
  yield takeEvery(LIKE_POST_REQUEST, likePost);
}
// 좋아요 취소
function* watchUnlikePost() {
  yield takeEvery(UNLIKE_POST_REQUEST, unlikePost);
}
export default function*() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchLoadPost),
    fork(watchLoadHashtagPost),
    fork(watchLoadUserPost),
    fork(watchAddComment),
    fork(watchUploadImage),
    fork(watchLikePost),
    fork(watchUnlikePost)
  ]);
}
