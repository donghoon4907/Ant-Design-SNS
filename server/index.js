const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const passport = require("passport");

const passportConfig = require("./passport");
const db = require("./models");
const userAPIRouter = require("./routes/user");
const postAPIRouter = require("./routes/post");
const hashtagAPIRouter = require("./routes/hashtag");

dotenv.config();
const app = express();
db.sequelize.sync();
passportConfig();

// 요청이 들어오면 로그를 남김.
app.use(morgan("dev"));
// uploads 폴더를 루트주소로 다루고, 하위의 파일들에 자유롭게 접근할 수 있음.
app.use("/", express.static("routes/uploads"));
app.use("/", express.static("routes/images"));
// CORS 문제 해결
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
// json 및 formdata 취급; req.body를 호환하기 위한 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false
    },
    name: "UNKNOWN"
  })
);
app.use(passport.initialize());
app.use(passport.session());
// 파일 업로드
app.use(fileUpload());

app.use("/api/user", userAPIRouter);
app.use("/api/post", postAPIRouter);
app.use("/api/hashtag", hashtagAPIRouter);

app.listen(3001, () => {
  console.log("server is running on http://localhost:3001");
});
