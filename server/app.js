require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
// const controllers = require('./controller');

app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://localhost:3000", process.env.REACT_APP_SERVER_URI],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "OPTIONS", "DELETE"],
  })
);

const loginPage = require("./router/loginPage");
const logoutPage = require("./router/logoutPage");
const mypagePage = require("./router/mypagePage");
const oauthPage = require("./router/oauthPage");
const signupPage = require("./router/signupPage");
const boardPage = require("./router/boardPage");
const authPage = require("./router/authPage");
const applicantPage = require("./router/applicantPage");

app.get("/", (req, res) => {
  res.status(200).send("hello world");
});
app.use(cookieParser());

app.use("/login", loginPage);
app.use("/logout", logoutPage);
app.use("/oauth", oauthPage);
app.use("/signup", signupPage);
app.use("/boards", boardPage);
app.use("/auth", authPage);
app.use("/applicants", applicantPage);
app.use("/", mypagePage);

// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행합니다.
// 만약 인증서 파일이 존재하지 않는경우, http 프로토콜을 사용하는 서버를 실행합니다.
// 파일 존재여부를 확인하는 폴더는 서버 폴더의 package.json이 위치한 곳입니다.

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
