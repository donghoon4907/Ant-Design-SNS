const express = require("express");
const path = require("path");
const router = express.Router();
const db = require("../models");
const { isLoggedIn } = require("./middleware");

// 모든 사용자가 작성한 게시글 가져오기
router.get("/load", async (req, res, next) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.User,
          attributes: ["id", "userId", "thumbnail", "createdAt"]
        },
        {
          model: db.Comment,
          attributes: ["id", "content", "createdAt"],
          include: [
            {
              model: db.User,
              attributes: ["userId"]
            }
          ]
        },
        {
          model: db.Image,
          attributes: ["src"]
        }
      ],
      order: [["createdAt", "DESC"]] // DESC는 내림차순, ASC는 오름차순
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
// 게시글 작성
router.post("/add", isLoggedIn, async (req, res, next) => {
  try {
    // #이 붙은 문자집합의 배열
    const hashtags = req.body.content.match(/#[^\s]+/g);
    const newPost = await db.Post.create({
      title: req.body.title,
      content: req.body.content,
      UserId: req.user.id
    });
    // 특정 문장에서 해쉬태그 뽑아내 생성하기
    if (hashtags) {
      const result = await Promise.all(
        hashtags.map(tag =>
          // #을 제외한 문자열로 데이터 생성
          db.Hashtag.findOrCreate({
            where: { name: tag.slice(1).toLowerCase() }
          })
        )
      );
      await newPost.addHashtags(result.map(r => r[0]));
    }
    // 이미지가 여러개인 경우와 하나인 경우를 분리해 작업
    if (req.body.images.length === 1) {
      const image = await db.Image.create({ src: req.body.images[0] });
      await newPost.addImage(image);
    } else if (req.body.images.length > 1) {
      const images = await Promise.all(
        req.body.images.map(image => db.Image.create({ src: image }))
      );
      await newPost.addImages(images);
    }
    // const fullPost = await newPost.getUser();
    // newPost.User = User;
    // res.json(newPost)
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [
        {
          model: db.User,
          attributes: ["id", "userId", "thumbnail"]
        },
        {
          model: db.Comment,
          include: [
            {
              model: db.User,
              attributes: ["userId"]
            }
          ]
        },
        {
          model: db.Image,
          attributes: ["src"]
        }
      ]
    });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
// 댓글 작성
router.post("/:postId/comment", isLoggedIn, async (req, res, next) => {
  try {
    // 댓글 저장전에 해당 포스트가 있는지 확인
    const post = await db.Post.findOne({ where: { id: req.params.postId } });
    if (!post) return res.status(404).send("포스트가 존재하지 않습니다.");
    // 댓글 생성
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content
    });
    // 검색된 포스트와 연관을 맺음
    await post.addComment(newComment.id);
    // 생성되었는지 확인
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id
      },
      include: [
        {
          model: db.User,
          attributes: ["id", "userId"]
        }
      ]
    });
    res.json(comment);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
// 특정 포스트의 댓글들 가져오기
router.get("/:id/comments", async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) return res.status(404).send("포스트가 존재하지 않습니다.");
    // 특정 포스트의 댓글들 가져오기
    const comments = await db.Comment.findAll({
      where: { PostId: req.params.id },
      order: [["createdAt", "ASC"]],
      include: [
        {
          model: db.User,
          attributes: ["id", "userId"]
        }
      ]
    });
    res.json(comments);
  } catch (e) {
    console.error(e);
    next(e);
  }
});
// 포스트의 이미지 업로드
router.post("/upload", (req, res) => {
  // 지정한 경로에 파일 업로드
  if (req.files) {
    const {
      image: { name }
    } = req.files;
    const condition =
      name.substring(name.indexOf(".") + 1) === "jpg" ||
      name.substring(name.indexOf(".") + 1) === "png";
    if (condition) {
      req.files.image.mv(
        `${__dirname}/uploads/${req.files.image.name}`,
        err => {
          if (err) return res.status(500).send("파일 업로드 중 서버 에러");
          else return res.json(req.files.image.name);
        }
      );
    } else {
      return res.status(401).send("이미지 형식은 png 또는 jpg만 가능합니다.");
    }
  }
});

router.post("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    // 선작업: 해당 포스트가 존재하는지 확인
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) return res.status(404).send("포스트가 존재하지 않습니다.");
    await post.addLiker(req.user.id);
    res.status(200).send("좋아요");
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete("/:id/like", isLoggedIn, async (req, res, next) => {
  try {
    // 선작업: 해당 포스트가 존재하는지 확인
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) return res.status(404).send("포스트가 존재하지 않습니다.");
    await post.removeLiker(req.user.id);
    res.status(200).send("좋아요 취소");
  } catch (e) {
    console.error(e);
    next(e);
  }
});
module.exports = router;
