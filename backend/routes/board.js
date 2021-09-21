const express = require("express");
const router = express.Router();
const BoardController = require("../controllers/board");
const multiparty = require("connect-multiparty");
const mult = multiparty();
const Auth = require("../middleware/auth");
const Upload = require("../middleware/file");
const ValidateUser = require("../middleware/validateUser");

router.post(
  "/registerBoard",
  mult,
  Upload,
  Auth,
  ValidateUser,
  BoardController.registerBoard
);
router.get("/listBoard", Auth, ValidateUser, BoardController.listBoard);
router.get(
  "/listBoardMember",
  Auth,
  ValidateUser,
  BoardController.listBoardMember
);

router.get("/listShared", Auth, ValidateUser,BoardController.listBoardShared)
router.get("/listMember" , Auth, ValidateUser, BoardController.listMember);
router.put("/addMember", Auth, ValidateUser, BoardController.addMember);
router.put("/deleteMember", Auth, ValidateUser, BoardController.deleteMember);
router.put("/updateBoard" , Auth, ValidateUser, BoardController.updateBoard);
router.delete(
  "/deleteBoard/:_id",
  Auth,
  ValidateUser,
  BoardController.deleteBoard
);
router.get("/getBoard/:_id" , Auth, ValidateUser, BoardController.getBoard);

module.exports = router;