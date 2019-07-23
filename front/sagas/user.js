import { all, fork, takeEvery, call, put } from "redux-saga/effects";
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
  LOAD_USER_FAILURE
} from "../reducers/user";

function logInAPI(userData) {
  return axios
    .post("/user/login", userData, {
      withCredentials: true
    })
    .then(response => ({ response }))
    .catch(error => ({ error: error.response }));
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
    .catch(error => ({ error: error.response }));
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
    .catch(error => ({ error: error.response }));
}

function* logIn(action) {
  const { response, error } = yield call(logInAPI, action.payload);
  if (response && response.status === 200) {
    yield put({
      type: LOG_IN_SUCCESS,
      payload: response.data
    });
    yield put({
      type: LOAD_USER_REQUEST
    });
    alert("로그인 성공");
  } else if (error) {
    console.error(error);
    yield put({
      type: LOG_IN_FAILURE,
      error
    });
    alert(error.data);
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* signUp(action) {
  const { response, error } = yield call(signUpAPI, action.payload);
  if (response && response.status === 200) {
    yield put({
      type: SIGN_UP_SUCCESS
    });
    alert("회원가입 성공.");
    action.payload.successEvent.call(null);
  } else if (error) {
    console.error(error);
    yield put({
      type: SIGN_UP_FAILURE,
      error
    });
    alert(error.data);
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
    console.error(e);
    alert("로그아웃 실패, 잠시후 다시 시도하세요.");
    yield put({
      type: LOG_OUT_FAILURE,
      error: e
    });
  }
}

function* loadUser(action) {
  const { response, error } = yield call(loadUserAPI, action.payload);
  if (response && response.status === 200) {
    yield put({
      type: LOAD_USER_SUCCESS,
      payload: response.data,
      me: action.payload
    });
  } else if (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_FAILURE,
      error
    });
    alert(error.data);
  } else {
    console.error(error);
    alert("알 수 없는 오류가 발생했습니다.");
  }
}

function* watchLogIn() {
  yield takeEvery(LOG_IN_REQUEST, logIn);
}

function* watchSignUp() {
  yield takeEvery(SIGN_UP_REQUEST, signUp);
}

function* watchLogOut() {
  yield takeEvery(LOG_OUT_REQUEST, logOut);
}

function* watchLoadUser() {
  yield takeEvery(LOAD_USER_REQUEST, loadUser);
}

export default function*() {
  yield all([
    fork(watchLogIn),
    fork(watchSignUp),
    fork(watchLogOut),
    fork(watchLoadUser)
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
