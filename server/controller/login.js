require('dotenv').config();
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const {
  generateAccessToken,
  sendAccessToken,
  isAuthorized,
} = require('./functions/user');

module.exports = {
  login: async (req, res) => {
    const { user_id, password } = req.body;

    if (!user_id)
      return res
        .status(400)
        .json({ success: false, message: '아이디를 입력해주세요' });
    if (!password)
      return res
        .status(400)
        .json({ success: false, message: '비밀번호를 입력해주세요' });
    try {
      const userInfo = await User.findOne({ where: { userId: user_id } });
      if (!userInfo) {
        return res.status(400).json({
          success: false,
          message: '아이디 또는 비밀번호가 잘못되었습니다',
        });
      }

      const match = await bcrypt.compare(
        password,
        userInfo.dataValues.password
      );
      if (!match) {
        return res.status(400).json({
          success: false,
          message: '아이디 또는 비밀번호가 잘못되었습니다',
        });
      }
      if (userInfo.dataValues.expiredDatetime) {
        return res
          .status(400)
          .json({ success: false, message: '탈퇴한 회원입니다' });
      }
      delete userInfo.dataValues.password;
      const accessToken = generateAccessToken(userInfo.dataValues);
      sendAccessToken(res, accessToken);

      return res
        .status(201)
        .json({ success: true, message: '로그인이 완료되었습니다' });
    } catch (err) {
      console.log(err);
    }
  },
  checkToken: (req, res) => {
    const accessToken = isAuthorized(req);
    if (!accessToken)
      return res.json({
        success: false,
        loginId: null,
        message: '로그아웃 상태입니다',
      });
    const loginId = accessToken.userId;
    res.json({ success: true, loginId: loginId, message: '로그인 상태입니다' });
  },
};
