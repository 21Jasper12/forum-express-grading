const express = require("express");
const router = express.Router();

const admin = require("./modules/admin"); // 引入【後台】路由
const userController = require("../controllers/user-controller"); //引入userControl
const restController = require("../controllers/restaurant-controller"); // 引入restaurant路由
const { generalErrorHandler } = require("../middleware/error-handler"); // 引入error-handler

/** 引入passport設定 */
const passport = require("./../config/passport");

router.use("/admin", admin); //後台

/** userControl - 註冊 */
router.get("/signup", userController.signUpPage);
router.post("/signup", userController.signUp); //注意用 post

/** userControl - 登入 */
router.get("/signin", userController.signInPage);
router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/signin",
    failureFlash: true,
  }),
  userController.signIn
);
/** userControl - 登出 */
router.get("/logout", userController.logout);

/** restControl */
router.get("/restaurants", restController.getRestaurants);
router.use("/", (req, res) => res.redirect("/restaurants"));

/** error判別 */
router.use("/", generalErrorHandler);

module.exports = router;
