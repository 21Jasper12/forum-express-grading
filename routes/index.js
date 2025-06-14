const express = require("express");
const router = express.Router();

const admin = require("./modules/admin"); // 引入【後台】路由
const userController = require("../controllers/user-controller"); //引入userControl
const restController = require("../controllers/restaurant-controller"); // 引入restaurant路由
const { generalErrorHandler } = require("../middleware/error-handler"); // 引入error-handler

router.use("/admin", admin); //後台

/** userControl */
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.signUp); //注意用 post

/** restControl */
router.get("/restaurants", restController.getRestaurants);
router.use("/", (req, res) => res.redirect("/restaurants"));

/** error判別 */
router.use("/", generalErrorHandler);

module.exports = router;
