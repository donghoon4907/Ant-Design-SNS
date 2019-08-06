import produce from "immer";

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

export const LOAD_FOLLOWERS_REQUEST = "LOAD_FOLLOWERS_REQUEST";
export const LOAD_FOLLOWERS_SUCCESS = "LOAD_FOLLOWERS_SUCCESS";
export const LOAD_FOLLOWERS_FAILURE = "LOAD_FOLLOWERS_FAILURE";

export const LOAD_FOLLOWINGS_REQUEST = "LOAD_FOLLOWINGS_REQUEST";
export const LOAD_FOLLOWINGS_SUCCESS = "LOAD_FOLLOWINGS_SUCCESS";
export const LOAD_FOLLOWINGS_FAILURE = "LOAD_FOLLOWINGS_FAILURE";

export const FOLLOW_USER_REQUEST = "FOLLOW_USER_REQUEST";
export const FOLLOW_USER_SUCCESS = "FOLLOW_USER_SUCCESS";
export const FOLLOW_USER_FAILURE = "FOLLOW_USER_FAILURE";

export const UNFOLLOW_USER_REQUEST = "UNFOLLOW_USER_REQUEST";
export const UNFOLLOW_USER_SUCCESS = "UNFOLLOW_USER_SUCCESS";
export const UNFOLLOW_USER_FAILURE = "UNFOLLOW_USER_FAILURE";

export const REMOVE_FOLLOWER_REQUEST = "REMOVE_FOLLOWER_REQUEST";
export const REMOVE_FOLLOWER_SUCCESS = "REMOVE_FOLLOWER_SUCCESS";
export const REMOVE_FOLLOWER_FAILURE = "REMOVE_FOLLOWER_FAILURE";

export const EDIT_USERID_REQUEST = "EDIT_USERID_REQUEST";
export const EDIT_USERID_SUCCESS = "EDIT_USERID_SUCCESS";
export const EDIT_USERID_FAILURE = "EDIT_USERID_FAILURE";

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
  userInfo: null, // 특정 사용자 정보
  hasMoreFollower: false, // 더보기 버튼 보여줄지 여부
  hasMoreFollowing: false // 더보기 버튼 보여줄지 여부
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOG_IN_REQUEST: {
        draft.isLoginLoading = true;
        break;
      }
      case LOG_IN_SUCCESS: {
        draft.isLoginLoading = false;
        break;
      }
      case LOG_IN_FAILURE: {
        draft.isLoginLoading = false;
        draft.loginErrorReason = action.error;
        break;
      }
      case SIGN_UP_REQUEST: {
        draft.isSignUpLoading = true;
        break;
      }
      case SIGN_UP_SUCCESS: {
        draft.isSignUpLoading = false;
        break;
      }
      case SIGN_UP_FAILURE: {
        draft.isSignUpLoading = false;
        draft.signUpErrorReason = action.error;
        break;
      }
      case LOG_OUT_REQUEST: {
        draft.isLogoutLoading = true;
        break;
      }
      case LOG_OUT_SUCCESS: {
        draft.isLoggedIn = false;
        draft.isLogoutLoading = false;
        draft.loadUserData = null;
        draft.followerList = [];
        draft.followingList = [];
        draft.userInfo = null;
        break;
      }
      case LOG_OUT_FAILURE: {
        draft.isLogoutLoading = false;
        draft.logOutErrorReason = action.error;
        break;
      }
      // 로그인 시, 특정 유저 검색 시 이용됨
      case LOAD_USER_REQUEST:
        break;
      case LOAD_USER_SUCCESS: {
        // 로그인된 정보를 가져올 경우 undefined, 특정 유저 검색시 me가 id값을 가집니다.
        if (action.me) {
          draft.userInfo = action.payload;
          break;
        }
        draft.loadUserData = action.payload;
        break;
      }
      case LOAD_USER_FAILURE: {
        draft.loadUserErrorReason = action.error;
        break;
      }
      case FOLLOW_USER_REQUEST:
        break;
      case FOLLOW_USER_SUCCESS: {
        draft.followingList = [];
        action.payload.forEach(v => draft.followingList.push(v));
        break;
      }
      case FOLLOW_USER_FAILURE:
        break;
      case UNFOLLOW_USER_REQUEST:
        break;
      case UNFOLLOW_USER_SUCCESS: {
        const idx = draft.followingList.findIndex(v => v.id === action.payload);
        draft.followingList.splice(idx, 1);
        break;
      }
      case UNFOLLOW_USER_FAILURE:
        break;
      case LOAD_FOLLOWERS_REQUEST: {
        draft.hasMoreFollower = action.lastId ? state.hasMoreFollower : true;
        break;
      }
      case LOAD_FOLLOWERS_SUCCESS: {
        action.payload.forEach(v => draft.followerList.push(v));
        draft.hasMoreFollower = action.payload.length === 6;
        break;
      }
      case LOAD_FOLLOWERS_FAILURE:
        break;
      case LOAD_FOLLOWINGS_REQUEST: {
        draft.hasMoreFollowing = action.offset ? state.hasMoreFollowing : true;
        break;
      }
      case LOAD_FOLLOWINGS_SUCCESS: {
        action.payload.forEach(v => draft.followingList.push(v));
        draft.hasMoreFollowing = action.payload.length === 6;
        break;
      }
      case LOAD_FOLLOWINGS_FAILURE:
        break;
      case REMOVE_FOLLOWER_REQUEST:
        break;
      case REMOVE_FOLLOWER_SUCCESS:
        break;
      case REMOVE_FOLLOWER_FAILURE:
        break;
      case EDIT_USERID_REQUEST:
        break;
      case EDIT_USERID_SUCCESS: {
        draft.loadUserData.userId = action.payload;
        break;
      }
      case EDIT_USERID_FAILURE:
        break;
      default:
        return state;
    }
  });
