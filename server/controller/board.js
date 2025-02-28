const board = require('./functions/board');
const { createBoard, updateBoard, deleteBoard } = require('./functions/board');
const { isAuthorized } = require('./functions/user');
const { participate, cancelParticipate } = require('./functions/applicant');
const { Board, User, applicant } = require('../models');

module.exports = {
  createBoard: async (req, res) => {
    console.log('여기');
    const resObject = await createBoard(req);
    res.status(resObject.code).send(resObject.message);
  },
  updateBoard: async (req, res) => {
    const resObject = await updateBoard(req);
    res.status(resObject.code).send(resObject.message);
  },
  deleteBoard: async (req, res) => {
    const resObject = await deleteBoard(req);
    res.status(resObject.code).send(resObject.message);
  },
  getAllBoard: async (req, res) => {
    console.log('1번');
    try {
      const boardList = await Board.findAll({
        include: [
          {
            model: User,
            required: true,
            attributes: ['nickname'],
          },
        ],
      });
      res.status(200).json({ boardList });
    } catch (err) {
      res.status(400).json({ message: '잘못된 요청입니다' });
    }
  },
  getUserBoard: async (req, res) => {
    const userInfo = isAuthorized(req);
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const boardList = await Board.findAll({
          include: [
            {
              model: User,
              required: true,
              attributes: ['nickname'],
            },
          ],
          where: { user_id: userInfo.id },
        });

        res.status(200).json({ boardList });
      } catch (err) {
        res.status(400).json({ message: '잘못된 요청입니다' });
      }
    }
  },
  getBoard: async (req, res) => {
    const userInfo = isAuthorized(req);
    const boardId = req.params.boardId;
    console.log('여기가 파람스', req.params.boardId);
    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const boardList = await Board.findOne({
          include: [
            {
              model: User,
              required: true,
              attributes: ['nickname'],
            },
          ],
          where: { id: boardId },
        });
        console.log('보드리스트', boardList);
        res.status(200).json({ boardList });
      } catch (err) {
        res.status(400).json({ message: '잘못된 요청입니다' });
      }
    }
  },
  participate: async (req, res) => {
    const resObject = await participate(req);
    res.status(resObject.code).send(resObject.message);
  },
  cancelParticipate: async (req, res) => {
    const resObject = await cancelParticipate(req);
    res.status(resObject.code).send(resObject.message);
  },
  getAllApplicant: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const applicantList = await applicant.findAll({
          include: [
            {
              model: User,
              required: true,
              attributes: ['userId', 'nickname', 'email', 'mobile'],
            },
          ],
        });

        res.status(200).json({ applicantList });
      } catch (err) {
        res.status(400).json({ message: '잘못된 요청입니다' });
      }
    }
  },
  getAppliedBoard: async (req, res) => {
    const userInfo = isAuthorized(req);

    if (!userInfo) {
      res.status(401).json({ message: '로그인이 필요합니다' });
    } else {
      try {
        const applyingBoard = await applicant.findAll({
          include: [
            {
              model: Board,
              required: true,
              attributes: ['title', 'work_date', 'work_place'],
            },
          ],
          where: { user_id: userInfo.id },
        });
        res.status(200).json({ applyingBoard });
      } catch (err) {
        res.status(400).json({ message: '잘못된 요청입니다' });
      }
    }
  },
};
