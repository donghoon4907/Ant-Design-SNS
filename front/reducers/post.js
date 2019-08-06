import produce from "immer";

export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const INIT_HASHTAG_POST = "INIT_HASHTAG_POST";

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
  isAddPostLoading: false, // 포스트 추가 요청 시도 중
  isAddComment: false, // 포스트 댓글 추가 요청 시도 중
  isRemovePostLoading: false, // 포스트 삭제 요청 시도 중
  historyPostCount: 0, // 만들어졌던 포스트 개수
  mainPosts: [], // 작성글 목록
  hashTagPosts: [], // 해쉬태그 작성글 목록
  images: [], // 업로드된 이미지 파일 목록
  loadPostErrorReason: "", // 포스트 불러오기 실패 사유
  imagePaths: [], // 미리보기 이미지 경로
  addPostErrorReason: "", // 포스트 업로드 실패 사유
  removePostErrorReason: "", // 포스트 삭제 실패 사유
  addCommentError: "", // 포스트 댓글 추가 요청 실패 사유
  uploadError: "", // 업로드 요청 실패 사유
  loadUserInfoError: "", // 유저 정보 요청 실패 사유
  likePostError: "", // 포스트 좋아요 요청 실패 사유
  unlikePostError: "" // 포스트 좋아요 취소 요청 실패 사유
};

export default (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case ADD_POST_REQUEST: {
        draft.isAddPostLoading = true;
        break;
      }
      case ADD_POST_SUCCESS: {
        draft.isaddPostLoading = false;
        draft.mainPosts.unshift(action.payload);
        draft.images = [];
        break;
      }
      case ADD_POST_FAILURE: {
        draft.isAddPostLoading = false;
        draft.images = [];
        draft.addPostErrorReason = action.error;
        break;
      }
      case REMOVE_POST_REQUEST: {
        draft.isRemovePostLoading = true;
        break;
      }
      case REMOVE_POST_SUCCESS: {
        const idx = draft.mainPosts.findIndex(
          post => post.id === action.payload
        );
        draft.isRemovePostLoading = false;
        draft.mainPosts.splice(idx, 1);
        break;
      }
      case REMOVE_POST_FAILURE: {
        draft.removePostErrorReason = action.error;
        break;
      }
      case LOAD_MAIN_POST_REQUEST: {
        draft.isLoadPosts = true;
        break;
      }
      case LOAD_MAIN_POST_SUCCESS: {
        draft.isLoadPosts = false;
        action.payload.forEach(v => draft.mainPosts.push(v));
        break;
      }
      case LOAD_MAIN_POST_FAILURE: {
        draft.isLoadPosts = false;
        draft.isLoadPostError = action.error;
        break;
      }
      case LOAD_HASHTAG_POST_REQUEST: {
        draft.isLoadPosts = true;
        break;
      }
      case LOAD_HASHTAG_POST_SUCCESS: {
        draft.isLoadPosts = false;
        action.payload.forEach(v => draft.hashTagPosts.push(v));
        break;
      }
      case LOAD_HASHTAG_POST_FAILURE: {
        draft.isLoadPosts = false;
        draft.isLoadPostError = action.error;
        break;
      }
      case LOAD_USER_POST_REQUEST:
        break;
      case LOAD_USER_POST_SUCCESS:
        break;
      case LOAD_USER_POST_FAILURE: {
        draft.loadUserInfoError = action.error;
        break;
      }
      case ADD_COMMENT_REQUEST: {
        draft.isAddComment = true;
        break;
      }
      case ADD_COMMENT_SUCCESS: {
        draft.isAddComment = false;
        break;
      }
      case ADD_COMMENT_FAILURE: {
        draft.isAddComment = false;
        draft.addCommentError = action.error;
        break;
      }
      case UPLOAD_IMAGES_REQUEST:
        break;
      case UPLOAD_IMAGES_SUCCESS: {
        draft.images.push(action.payload);
        break;
      }
      case UPLOAD_IMAGES_FAILURE: {
        draft.uploadError = action.error;
        break;
      }
      // 비동기 처리가 필요없는 경우는 리덕스로만 처리
      case REMOVE_IMAGE: {
        draft.images.splice(action.payload, 1);
        break;
      }
      case LIKE_POST_REQUEST:
        break;
      case LIKE_POST_SUCCESS:
        break;
      case LIKE_POST_FAILURE: {
        draft.likePostError = action.error;
        break;
      }
      case UNLIKE_POST_REQUEST:
        break;
      case UNLIKE_POST_SUCCESS:
        break;
      case UNLIKE_POST_FAILURE: {
        draft.unlikePostError = action.error;
        break;
      }
      case RETWEET_REQUEST:
        break;
      case RETWEET_SUCCESS: {
        draft.mainPosts.unshift(action.payload);
        break;
      }
      case RETWEET_FAILURE:
        break;
      case INIT_HASHTAG_POST: {
        draft.hashTagPosts = [];
        break;
      }
      default:
        return state;
    }
  });
