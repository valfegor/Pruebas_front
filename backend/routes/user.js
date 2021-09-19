const upload = require("../middleware/file");
const express = require("express");
const multiparty = require("connect-multiparty");
const mult = multiparty();
const router = express.Router();
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");
const UserController = require("../controllers/user");

router.post("/registerUser", UserController.registerUser);
router.post("/login", UserController.login);
router.get("/listUsers/:name?", UserController.listUser);
router.get("/listUsersAll/:name?", UserController.listUserAll);
router.put("/updateUser", UserController.updateUser);
router.put("/updatePhoto", mult, upload, Auth, ValidateUser, UserController.updatePhoto);
router.put("/deleteUser", UserController.deleteUser);
router.post("/registerAdmin", UserController.registerAdmin);
router.get("/getRole/:email", UserController.getRole);
router.get("/getNombre/:email", UserController.getNombre);
router.get("/getProfile", Auth, ValidateUser, UserController.profile);
router.get("/findUser/:_id", Auth, ValidateUser, UserController.findUser);
router.get("/getId/:email", UserController.getId);
router.post("/findUserByEmail", Auth, ValidateUser, UserController.findUserByEmail)

module.exports = router;