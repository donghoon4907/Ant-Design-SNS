const passport = require("passport");
const db = require("../models");
const local = require("./local");

// 서버에 저장될 사용자 정보를 최소화 하는 작업
module.exports = () => {
  // 로그인 시 서버에 최소한의 데이터(db에 저장된 아이디값과 쿠키)를 저장 [{ id: x, cookie: y}]
  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  // 서버에 저장한 데이터로 다시 쿼리문을 실행해 찾은 데이터 및 쿠키를 클라이언트로 보낸다.
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await db.User.findOne({
        where: { id }
      });
      return done(null, user);
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });
  local();
};
