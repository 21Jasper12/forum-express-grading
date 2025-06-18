const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin-controller");

/** 所有餐廳路由 - 頁面 */
router.get("/restaurants", adminController.getRestaurants);
/** 新增餐廳路由 - 頁面 */
router.get("/restaurants/create", adminController.createRestaurant);
/** post - 新增餐廳 */
router.post("/restaurants", adminController.postRestaurant);

router.use("", (req, res) => res.redirect("/admin/restaurants"));

module.exports = router;
