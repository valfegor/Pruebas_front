const express = require("express");
const router = express.Router();
const Upload = require("../middleware/file");
const taskController = require("../controllers/task");
const multiparty = require("connect-multiparty");
const mult = multiparty();
const Auth = require("../middleware/auth");
const ValidateUser = require("../middleware/validateUser");

router.post("/saveTask",mult,Upload,Auth, ValidateUser,taskController.saveTask);
router.put("/updateTask",Auth, ValidateUser,taskController.updateTask);
router.get("/listTask/:_id",Auth, ValidateUser, taskController.listTask);
router.delete("/deleteTask/:_id",Auth, ValidateUser,taskController.deleteTask)
router.put("/assignTask",taskController.asignTask);
router.put("/unassingTask",Auth,ValidateUser,taskController.unassingTask);
router.get("/listAssignedTasks",Auth, ValidateUser, taskController.listAsignedTasks);
router.get("/listRanking",taskController.listRankingPoints);
router.get("/listAllTask",taskController.getAlltask);
router.post("/listAllAsigned",taskController.listAsignedTaskForPerson)

module.exports = router;
