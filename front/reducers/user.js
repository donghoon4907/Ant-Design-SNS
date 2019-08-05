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
        loadUserData: null,
        followerList: [],
        followingList: [],
        userInfo: null
      };
    }
    case LOG_OUT_FAILURE: {
      return {
        ...state,
        isLogoutLoading: false,
        logOutErrorReason: action.error
      };
    }
    // 로그인 시, 특정 유저 검색 시 이용됨
    case LOAD_USER_REQUEST: {
      return {
        ...state
      };
    }
    case LOAD_USER_SUCCESS: {
      // 로그인된 정보를 가져올 경우 undefined, 특정 유저 검색시 me가 id값을 가집니다.
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
    case FOLLOW_USER_REQUEST: {
      return {
        ...state
      };
    }
    case FOLLOW_USER_SUCCESS: {
      return {
        ...state,
        followingList: [...action.payload]
      };
    }
    case FOLLOW_USER_FAILURE: {
      return {
        ...state
      };
    }
    case UNFOLLOW_USER_REQUEST: {
      return {
        ...state
      };
    }
    case UNFOLLOW_USER_SUCCESS: {
      return {
        ...state,
        followingList: state.followingList.filter(v => v.id !== action.payload)
      };
    }
    case UNFOLLOW_USER_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_FOLLOWERS_REQUEST: {
      return {
        ...state,
        hasMoreFollower: action.lastId ? state.hasMoreFollower : true
      };
    }
    case LOAD_FOLLOWERS_SUCCESS: {
      return {
        ...state,
        followerList: state.followerList.concat(action.payload),
        hasMoreFollower: action.payload.length === 6
      };
    }
    case LOAD_FOLLOWERS_FAILURE: {
      return {
        ...state
      };
    }
    case LOAD_FOLLOWINGS_REQUEST: {
      return {
        ...state,
        hasMoreFollowing: action.offset ? state.hasMoreFollowing : true
      };
    }
    case LOAD_FOLLOWINGS_SUCCESS: {
      return {
        ...state,
        followingList: state.followingList.concat(action.payload),
        hasMoreFollowing: action.payload.length === 6
      };
    }
    case LOAD_FOLLOWINGS_FAILURE: {
      return {
        ...state
      };
    }
    case REMOVE_FOLLOWER_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_FOLLOWER_SUCCESS: {
      return {
        ...state
      };
    }
    case REMOVE_FOLLOWER_FAILURE: {
      return {
        ...state
      };
    }
    case EDIT_USERID_REQUEST: {
      return {
        ...state
      };
    }
    case EDIT_USERID_SUCCESS: {
      return {
        ...state,
        loadUserData: {
          ...state.loadUserData,
          userId: action.payload
        }
      };
    }
    case EDIT_USERID_FAILURE: {
      return {
        ...state
      };
    }

    default:
      return state;
  }
};
