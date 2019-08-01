const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const db = require("../models");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("./middleware");

// 회원 가입(사용자 생성)
router.post("/add", isNotLoggedIn, async (req, res, next) => {
  try {
    // 특정 아이디를 가진 레코드 검색
    const userQuery = await db.User.findOne({
      where: {
        userId: req.body.userId
      }
    });
    if (userQuery) {
      return res.status(403).send("이미 사용중인 아이디 입니다.");
    }
    // 비밀번호 암호화(salt: 10~13)
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    // 테이블에 레코드 추가
    const newUser = await db.User.create({
      userId: req.body.userId,
      password: hashedPassword,
      thumbnail: req.files ? req.files.file.name : "none"
    });
    // 지정한 경로에 파일 업로드
    if (req.files) {
      req.files.file.mv(`${__dirname}/images/${req.files.file.name}`, err => {
        if (err) return res.status(500).send("파일 업로드 중 서버 에러");
        else return res.status(200).send("프로필 사진을 등록한 사용자 생성");
      });
    } else {
      return res.status(200).send("프로필 사진을 등록하지 않은 사용자 생성");
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
});
// 로그인 요청이 전달되는 경로 router -> local -> authenticate ->
router.post("/login", isNotLoggedIn, (req, res, next) => {
  // 일반, kakao 로그인인 경우 local => kakao
  // 두번째 인자는 done을 통해 전해진 정보 err: 서버에러, user: 유저정보, info: 로직에러
  passport.authenticate("local", (err, user, info) => {
    // 서버 에러가 난 경우
    if (err) {
      console.error(err);
      return next(err);
    }
    // 로직 에러가 난 경우
    if (info) return res.status(401).send(info.reason);
    // serializeUser 실행
    return req.login(user, async loginErr => {
      if (loginErr) return next(loginErr);

      const fullUser = await db.User.findOne({
        where: { id: user.id },
        include: [
          {
            model: db.Post,
            as: "Posts" // as를 사용한 경우
          },
          {
            model: db.User,
            as: "Followings"
          },
          {
            model: db.User,
            as: "Followers"
          }
        ],
        // 모든 필드가 아닌 특정 필드만 가져오고 싶은 경우 명시
        attributes: ["id", "userId", "thumbnail"]
      });
      // 보안을 위해 비밀번호를 제외한 유저 정보를 보내기
      // const filteredUser = Object.assign({}, user.toJSON());
      // delete filteredUser.password;
      return res.json(fullUser);
    });
  })(req, res, next);
});
// 로그아웃
router.post("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send("로그아웃 성공");
});
// 로그인 성공한 이후 쿠키에 기록된 사용자 정보를 클라이언트에 전달, deserialize => router
router.get("/loadUser", isLoggedIn, async (req, res) => {
  // 서버에 저장된 쿠키 정보를 가진 사용자가 로그인한 경우 passport의 deserialize를 거쳐 생성된 사용자 정보를 전달
  const result = Object.assign({}, req.user.toJSON());
  try {
    const user = await db.User.findOne({
      where: { id: result.id },
      attributes: ["id"],
      include: [
        {
          model: db.User,
          as: "Followings"
        }
      ]
    });
    result.User = user;
  } catch (e) {
    console.error(e);
    next(e);
  }
  delete result.password;
  return res.json(result);
});
// 특정 유저가 작성한 포스트 목록 검색
router.get("/:id/post", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      where: { UserId: parseInt(req.params.id, 10), RetweetId: null },
      include: [
        {
          model: db.User,
          attributes: ["id", "userId"]
        }
      ]
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
// 특정 유저 정보 검색
router.get("/:id", async (req, res, next) => {
  try {
    const user = await db.User.findOne({
      where: { id: parseInt(req.params.id, 10) },
      include: [
        {
          model: db.Post,
          as: "Posts",
          attributes: ["id"]
        },
        {
          model: db.User,
          as: "Followings",
          attributes: ["id"]
        },
        {
          model: db.User,
          as: "Followers",
          attributes: ["id"]
        }
      ],
      attributes: ["id", "userId"]
    });
    // 보안을 위해 id값 대신 length를 클라이언트로 보내기
    const jsonUser = user.toJSON();
    jsonUser.Posts = jsonUser.Posts ? jsonUser.Posts.length : 0;
    jsonUser.Followings = jsonUser.Followings ? jsonUser.Followings.length : 0;
    jsonUser.Followers = jsonUser.Followers ? jsonUser.Followers.length : 0;
    res.json(jsonUser);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
// 팔로우
router.get("/:id/follow", async (req, res, next) => {
  try {
    const me = await db.User.findOne({ where: { id: req.user.id } });
    await me.addFollowing(req.params.id);
    res.send("팔로우 성공");
  } catch (e) {
    console.error(e);
    next(e);
  }
});
// 언팔로우
router.delete("/:id/follow", async (req, res, next) => {
  try {
    const me = await db.User.findOne({ where: { id: req.user.id } });
    await me.removeFollowing(req.params.id);
    res.send("언팔로우 성공");
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;

/**
 *
 * response set
 * send: 문자열
 * render: html
 * json: json data
 */
