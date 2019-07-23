/**
 * action / state / reducer
 */

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const ADD_POST_TO_ME = "ADD_POST_TO_ME";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const LOAD_USER_REQUEST = "LOAD_USER_REQUEST";
export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS";
export const LOAD_USER_FAILURE = "LOAD_USER_FAILURE";

export const LOAD_FOLLOW_REQUEST = "LOAD_FOLLOW_REQUEST";
export const LOAD_FOLLOW_SUCCESS = "LOAD_FOLLOW_SUCCESS";
export const LOAD_FOLLOW_FAILURE = "LOAD_FOLLOW_FAILURE";

export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST";
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE";

export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST";
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const initialState = {
  isLoginLoading: false, // 로그인 요청 시도 중
  isSignUpLoading: false, // 가입 요청 시도 중
  isLogoutLoading: false, // 로그아웃 요청 시도 중
  loginErrorReason: "", // 로그인 실패 사유
  signUpErrorReason: "", // 가입 실패 사유
  logOutErrorReason: "", // 로그아웃 실패 사유
  loadUserErrorReason: "", // 사용자 정보 로드 실패 사유
  followingList: [], // 팔로잉 리스트
  followerList: [], // 팔로워 리스트
  loadUserData: null, // 로드된 로그인한 사용자 정보
  userInfo: null // 특정 사용자 정보
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: {
      return {
        ...state,
        isLoginLoading: true
      };
    }
    case LOG_IN_SUCCESS: {
      return {
        ...state,
        isLoginLoading: false
      };
    }
    case LOG_IN_FAILURE: {
      return {
        ...state,
        isLoginLoading: false,
        loginErrorReason: action.error
      };
    }
    case SIGN_UP_REQUEST: {
      return {
        ...state,
        isSignUpLoading: true
      };
    }
    case SIGN_UP_SUCCESS: {
      return {
        ...state,
        isSignUpLoading: false
      };
    }
    case SIGN_UP_FAILURE: {
      return {
        ...state,
        isSignUpLoading: false,
        signUpErrorReason: action.error
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        isLogoutLoading: true
      };
    }
    case LOG_OUT_SUCCESS: {
      return {
        ...state,
        isLoggedIn: false,
        isLogoutLoading: false,
        loadUserData: null
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        isLogoutLoading: false,
        logOutErrorReason: action.error
      };
    }
    case LOAD_USER_REQUEST: {
      return {
        ...state
      };
    }
    case LOAD_USER_SUCCESS: {
      if (action.me) {
        return {
          ...state,
          userInfo: action.payload
        };
      }
      return {
        ...state,
        loadUserData: action.payload
      };
    }
    case LOAD_USER_FAILURE: {
      return {
        ...state,
        loadUserErrorReason: action.error
      };
    }
    default:
      return state;
  }
};
