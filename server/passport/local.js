const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const db = require("../models");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        // req.body에 저장된 속성명과 일치시키기
        usernameField: "userId",
        passwordField: "password"
      },
      async (userId, password, done) => {
        try {
          // 동일한 아이디를 가진 레코드가 있는지 확인하는 작업
          const user = await db.User.findOne({ where: { userId } });
          // 레코드가 없는 경우
          // done pattern: 실패 메시지 인자 설정
          if (!user)
            return done(null, false, { reason: "존재하지 않는 사용자입니다." });
          // 암호화된 두 비밀번호를 비교
          const result = await bcrypt.compare(password, user.password);
          // 두 비밀번호가 동일한 경우
          // done pattern: 성공 메시지 인자 설정
          if (result) return done(null, user);
          return done(null, false, { reason: "비밀번호가 일치하지 않습니다." });
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );
};
