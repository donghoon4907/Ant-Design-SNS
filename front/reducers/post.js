/**
 * action / state / reducer
 */

export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const MODIFY_POST_REQUEST = "MODIFY_POST_REQUEST";
export const MODIFY_POST_SUCCESS = "MODIFY_POST_SUCCESS";
export const MODIFY_POST_FAILURE = "MODIFY_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const LOAD_MAIN_POST_REQUEST = "LOAD_MAIN_POST_REQUEST";
export const LOAD_MAIN_POST_SUCCESS = "LOAD_MAIN_POST_SUCCESS";
export const LOAD_MAIN_POST_FAILURE = "LOAD_MAIN_POST_FAILURE";

export const LOAD_USER_POST_REQUEST = "LOAD_USER_POST_REQUEST";
export const LOAD_USER_POST_SUCCESS = "LOAD_USER_POST_SUCCESS";
export const LOAD_USER_POST_FAILURE = "LOAD_USER_POST_FAILURE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const LOAD_COMMENT_REQUEST = "LOAD_COMMENT_REQUEST";
export const LOAD_COMMENT_SUCCESS = "LOAD_COMMENT_SUCCESS";
export const LOAD_COMMENT_FAILURE = "LOAD_COMMENT_FAILURE";

export const RETWEET_REQUEST = "RETWEET_REQUEST";
export const RETWEET_SUCCESS = "RETWEET_SUCCESS";
export const RETWEET_FAILURE = "RETWEET_FAILURE";

export const LOAD_HASHTAG_POST_REQUEST = "LOAD_HASHTAG_POST_REQUEST";
export const LOAD_HASHTAG_POST_SUCCESS = "LOAD_HASHTAG_POST_SUCCESS";
export const LOAD_HASHTAG_POST_FAILURE = "LOAD_HASHTAG_POST_FAILURE";

export const initialState = {
  isLoadPosts: false, // 포스트 불러오기 요청 시도 중
  isaddPostLoading: false, // 포스트 추가 요청 시도 중
  isAddComment: false, // 포스트 댓글 추가 요청 시도 중
  isRemovePostLoading: false, // 포스트 삭제 요청 시도 중
  historyPostCount: 0, // 만들어졌던 포스트 개수
  mainPosts: [], // 작성글 목록
  images: [], // 업로드된 이미지 파일 목록
  loadPostErrorReason: "", // 포스트 불러오기 실패 사유
  imagePaths: [], // 미리보기 이미지 경로
  addPostErrorReason: "", // 포스트 업로드 실패 사유
  removePostErrorReason: "", // 포스트 삭제 실패 사유
  backupData: null, // 포스트 삭제 요청 시 임시로 저장할 데이터
  backupDataIndex: -1, // 포스트 삭제 전 위치
  userInfo: null, // 유저 정보
  addCommentError: "", // 포스트 댓글 추가 요청 실패 사유
  uploadError: "", // 업로드 요청 실패 사유
  loadUserInfoError: "", // 유저 정보 요청 실패 사유
  likePostError: "", // 포스트 좋아요 요청 실패 사유
  unlikePostError: "" // 포스트 좋아요 취소 요청 실패 사유
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST: {
      return {
        ...state,
        isaddPostLoading: true
      };
    }
    case ADD_POST_SUCCESS: {
      return {
        ...state,
        isaddPostLoading: false,
        mainPosts: [action.payload, ...state.mainPosts],
        images: []
      };
    }
    case ADD_POST_FAILURE: {
      return {
        ...state,
        isaddPostLoading: false,
        images: [],
        addPostErrorReason: action.error
      };
    }
    // case REMOVE_POST_REQUEST: {
    //   return {
    //     ...state,
    //     backupData: state.mainPosts[action.payload],
    //     mainPosts: state.mainPosts.filter(
    //       (post, idx) => idx !== action.payload
    //     ),
    //     isRemovePostLoading: true,
    //     backupDataIndex: action.payload
    //   };
    // }
    // case REMOVE_POST_SUCCESS: {
    //   return {
    //     ...state,
    //     isRemovePostLoading: false,
    //     backupData: null,
    //     backupDataIndex: -1
    //   };
    // }
    // case REMOVE_POST_FAILURE: {
    //   return {
    //     ...state,
    //     mainPosts: state.mainPosts.splice(
    //       state.backupDataIndex,
    //       0,
    //       state.backupData
    //     ),
    //     backupData: null,
    //     backupDataIndex: -1
    //   };
    // }
    case LOAD_HASHTAG_POST_REQUEST:
    case LOAD_MAIN_POST_REQUEST: {
      return {
        ...state,
        isLoadPosts: true,
        mainPosts: []
      };
    }
    case LOAD_HASHTAG_POST_SUCCESS:
    case LOAD_MAIN_POST_SUCCESS: {
      return {
        ...state,
        isLoadPosts: false,
        mainPosts: action.payload
      };
    }
    case LOAD_HASHTAG_POST_FAILURE:
    case LOAD_MAIN_POST_FAILURE: {
      return {
        ...state,
        isLoadPosts: false,
        isLoadPostError: action.error
      };
    }
    case LOAD_USER_POST_REQUEST: {
      return {
        ...state
      };
    }
    case LOAD_USER_POST_SUCCESS: {
      return {
        ...state,
        userInfo: action.payload
      };
    }
    case LOAD_USER_POST_FAILURE: {
      return {
        ...state,
        loadUserInfoError: action.error
      };
    }
    case ADD_COMMENT_REQUEST: {
      return {
        ...state,
        isAddComment: true
      };
    }
    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        isAddComment: false
      };
    }
    case ADD_COMMENT_FAILURE: {
      return {
        ...state,
        isAddComment: false,
        addCommentError: action.error
      };
    }
    case UPLOAD_IMAGES_REQUEST: {
      return {
        ...state
      };
    }
    case UPLOAD_IMAGES_SUCCESS: {
      return {
        ...state,
        images: [...state.images, action.payload]
      };
    }
    case UPLOAD_IMAGES_FAILURE: {
      return {
        ...state,
        uploadError: action.error
      };
    }
    // 비동기 처리가 필요없는 경우는 리덕스로만 처리
    case REMOVE_IMAGE: {
      return {
        ...state,
        images: state.images.filter((image, idx) => idx !== action.payload)
      };
    }
    case LIKE_POST_REQUEST: {
      return {
        ...state
      };
    }
    case LIKE_POST_SUCCESS: {
      return {
        ...state
      };
    }
    case LIKE_POST_FAILURE: {
      return {
        ...state,
        likePostError: action.error
      };
    }
    case UNLIKE_POST_REQUEST: {
      return {
        ...state
      };
    }
    case UNLIKE_POST_SUCCESS: {
      return {
        ...state
      };
    }
    case UNLIKE_POST_FAILURE: {
      return {
        ...state,
        unlikePostError: action.error
      };
    }
    default:
      return state;
  }
};
