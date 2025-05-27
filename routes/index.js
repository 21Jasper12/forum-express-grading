const express = require("express");
const router = express.Router();

const restController = require("../controllers/restaurant-controller"); // 引入restaurant路由
const admin = require("./modules/admin"); // 引入【後台】路由

router.use("/admin", admin); //後台

router.get("/restaurants", restController.getRestaurants);
router.use("/", (req, res) => res.redirect("/restaurants"));

module.exports = router;
