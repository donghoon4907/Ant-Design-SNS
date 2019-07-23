/**
 *  라우터에서 공통적으로 쓰이는 로직 정의
 */

exports.isLoggedIn = (req, res, next) => {
  // req.user, 로그인된 상태인지 확인하는 함수
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인 이후에 가능합니다.");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("로그인한 사용자는 접근할 수 없습니다.");
  }
};
