const express = require("express");
const router = express.Router();

const userController = require("../controllers/user-controller"); //引入userControl
const restController = require("../controllers/restaurant-controller"); // 引入restaurant路由
const admin = require("./modules/admin"); // 引入【後台】路由

router.use("/admin", admin); //後台

/** userControl */
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.signUp); //注意用 post

/** restControl */
router.get("/restaurants", restController.getRestaurants);
router.use("/", (req, res) => res.redirect("/restaurants"));

module.exports = router;
