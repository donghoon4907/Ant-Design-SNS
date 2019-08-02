import {
  all,
  fork,
  takeEvery,
  takeLatest,
  call,
  put
} from "redux-saga/effects";
import axios from "axios";
import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  FOLLOW_USER_REQUEST,
  FOLLOW_USER_SUCCESS,
  FOLLOW_USER_FAILURE,
  UNFOLLOW_USER_REQUEST,
  UNFOLLOW_USER_SUCCESS,
  UNFOLLOW_USER_FAILURE,
  LOAD_FOLLOWERS_REQUEST,
  LOAD_FOLLOWERS_SUCCESS,
  LOAD_FOLLOWERS_FAILURE,
  LOAD_FOLLOWINGS_REQUEST,
  LOAD_FOLLOWINGS_SUCCESS,
  LOAD_FOLLOWINGS_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  EDIT_USERID_REQUEST,
  EDIT_USERID_SUCCESS,
  EDIT_USERID_FAILURE
} from "../reducers/user";

function logInAPI(userData) {
  return axios
    .post("/user/login", userData, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function signUpAPI(userData) {
  const { userId, password, selectedFile } = userData;

  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("password", password);
  formData.append("file", selectedFile);
  return axios
    .post("/user/add", formData)
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function logOutAPI() {
  return axios.post(
    "/user/logout",
    {},
    {
      // 서버는 클라이언트가 전송한 쿠키로 로그인 여부를 판단한다.
      withCredentials: true
    }
  );
}

function loadUserAPI(userId) {
  return axios
    .get(userId ? `/user/${userId}` : "/user/loadUser", {
      // 서버에게 쿠키를 보내고, 유효한 쿠키인 경우 사용자 정보를 보낼 것임.
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function followAPI(userId) {
  return axios
    .get(`/user/${userId}/follow`, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function unfollowAPI(userId) {
  return axios
    .delete(`/user/${userId}/follow`, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function loadFollowersAPI(userId) {
  return axios
    .get(`/user/${userId}/followers`, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function loadFollowingsAPI(userId) {
  return axios
    .get(`/user/${userId}/followings`, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function removeFollowerAPI(userId) {
  return axios
    .delete(`/user/${userId}/follower`, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function editUserIdAPI(userId) {
  // 유저 정보 중 유저명 처럼 부분적인 수정 요청 시 patch
  return axios
    .patch(
      "/user/editUserId",
      { userId },
      {
        withCredentials: true
      }
    )
    .then(response => ({ response }))
    .catch(error => ({ error }));
}

function* logIn(action) {
  const { response, error } = yield call(logInAPI, action.payload);
  if (response) {
    yield put({
      type: LOG_IN_SUCCESS,
      payload: response.data
    });
    yield put({
      type: LOAD_USER_REQUEST
    });
    alert("로그인 성공");
  } else if (error) {
    yield put({
      type: LOG_IN_FAILURE,
      error
    });
    alert(error.response.data);
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* signUp(action) {
  const { response, error } = yield call(signUpAPI, action.payload);
  if (response) {
    yield put({
      type: SIGN_UP_SUCCESS
    });
    alert("회원가입 성공. 로그인 페이지로 이동합니다.");
    action.payload.successEvent.call(null);
  } else if (error) {
    yield put({
      type: SIGN_UP_FAILURE,
      error
    });
    alert(error.response.data);
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* logOut() {
  try {
    yield call(logOutAPI);
    alert("로그아웃 되었습니다.");
    yield put({
      type: LOG_OUT_SUCCESS
    });
  } catch (e) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: e
    });
    alert("로그아웃 실패, 잠시후 다시 시도하세요.");
  }
}

function* loadUser(action) {
  const { response, error } = yield call(loadUserAPI, action.payload);
  if (response) {
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: response.data,
      me: action.payload
    });
  } else if (error) {
    yield put({
      type: LOAD_USER_FAILURE,
      error
    });
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* follow(action) {
  const { response, error } = yield call(followAPI, action.payload);
  if (response) {
    yield put({
      type: FOLLOW_USER_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    yield put({
      type: FOLLOW_USER_FAILURE,
      error
    });
    alert(error.response.data);
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* unfollow(action) {
  const { response, error } = yield call(unfollowAPI, action.payload);
  if (response) {
    yield put({
      type: UNFOLLOW_USER_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    yield put({
      type: UNFOLLOW_USER_FAILURE,
      error
    });
    alert(error.response.data);
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* loadFollowers(action) {
  const { response, error } = yield call(loadFollowersAPI, action.payload);
  if (response) {
    yield put({
      type: LOAD_FOLLOWERS_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    yield put({
      type: LOAD_FOLLOWERS_FAILURE,
      error
    });
    alert(error.response.data);
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* loadFollowings(action) {
  const { response, error } = yield call(loadFollowingsAPI, action.payload);
  if (response) {
    yield put({
      type: LOAD_FOLLOWINGS_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    yield put({
      type: LOAD_FOLLOWINGS_FAILURE,
      error
    });
    alert(error.response.data);
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* removeFollower(action) {
  const { response, error } = yield call(removeFollowerAPI, action.payload);
  if (response) {
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS
    });
  } else if (error) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error
    });
    alert(error.response.data);
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* editUserId(action) {
  const { response, error } = yield call(editUserIdAPI, action.payload);
  if (response) {
    yield put({
      type: EDIT_USERID_SUCCESS,
      payload: response.data
    });
  } else if (error) {
    yield put({
      type: EDIT_USERID_FAILURE,
      error
    });
    alert(error.response.data);
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}
//로그인
function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}
// 회원가입
function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}
// 로그아웃
function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}
// 유저정보 로드
function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
// 팔로우
function* watchFollow() {
  yield takeEvery(FOLLOW_USER_REQUEST, follow);
}
// 언팔로우
function* watchUnfollow() {
  yield takeEvery(UNFOLLOW_USER_REQUEST, unfollow);
}
// 팔로워 불러오기
function* watchLoadFollowers() {
  yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
// 팔로잉 불러오기
function* watchLoadFollowings() {
  yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}
// 팔로워 삭제
function* watchRemoveFollower() {
  yield takeEvery(REMOVE_FOLLOWER_REQUEST, removeFollower);
}
// 유저명 수정
function* watchEditUserId() {
  yield takeEvery(EDIT_USERID_REQUEST, editUserId);
}
export default function*() {
  yield all([
    fork(watchLogIn),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchLoadUser),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadFollowers),
    fork(watchLoadFollowings),
    fork(watchRemoveFollower), // 현재 미사용
    fork(watchEditUserId) // 현재 미사용
  ]);
}

/**
 * redux-saga
 * : generator를 사용, 내부적으로 특정 API사용시 next 자동 적용
 *
 * about generator
 * 1. yield
 * yield 1
 * yield 2
 * = yield* [1, 2] - iterator
 *
 * 2. next()
 *
 *
 * effects
 * 1. take(action)
 * 인자로 온 액션이 dispatch 되기를 기다리고, dispatch된 경우 next()를 실행시킴
 * 제너레이터 특성상 한 번만 실행된 후 재실행을 할 수 없다.
 * 재실행을 원하는 경우 무한 반복문을 통해 구현.
 *
 * 2. takeLatest(action, callback*)
 * 동시에 여러 요청을 한 경우 가장 마지막의 요청만 유효하게 만든다.
 * 끝나지 않은 지난 요청을 취소한 후 실행.
 *
 * 3. takeEvery(action, callback*)
 * 반복가능한 take를 정의할 수 있습니다.
 *
 * 4. all([])
 * 여러 제너레이터 함수를 한번에 연결할 때 사용
 *
 * 5. delay(밀리초): 지연시간 설정
 * 6. call(func, action): func를 동기적으로 호출
 * 7. fork(func, action): func를 비동기적으로 호출
 */
