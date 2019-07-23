const express = require("express");
const next = require("next");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const dotenv = require("dotenv");

const dev = process.env.NODE_ENV !== "production";
//const prod = process.env.NODE_ENV === "production";

const app = next({ dev });
const handle = app.getRequestHandler();
dotenv.config();

// connect next-express
app.prepare().then(() => {
  const server = express();
  server.use(morgan("dev"));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  server.use(cookieParser(process.env.COOKIE_SECRET));
  server.use(
    expressSession({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false
      }
    })
  );
  // app.render(세 번째 인자에 정의한 페이지를 렌더링)
  server.get("/hashtag/:tag", (req, res) =>
    app.render(req, res, "/hashtag", { tag: req.params.tag })
  );
  server.get("/user/:id", (req, res) =>
    app.render(req, res, "/user", { id: req.params.id })
  );
  // 모든 요청을 처리하는 라우터
  server.get("*", (req, res) => handle(req, res));

  server.listen(process.env.PORT, () =>
    console.log("next + express running http://localhost:3002")
  );
});
