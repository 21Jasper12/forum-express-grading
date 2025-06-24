const express = require("express");
const router = express.Router();

const adminController = require("../../controllers/admin-controller");
const upload = require("../../middleware/multer"); // 載入 multer

/** 新增餐廳路由 - 頁面 */
router.get("/restaurants/create", adminController.createRestaurant);
/** 編輯單一餐廳資訊【路由】 - 頁面 */
router.get("/restaurants/:id/edit", adminController.editRestaurant);
/** 到單一餐廳【路由】 - 頁面 */
router.get("/restaurants/:id", adminController.getRestaurant);
/** 修改單一餐廳 - put */
router.put(
  "/restaurants/:id",
  upload.single("image"),
  adminController.putRestaurant
);
/** 刪除單一餐廳 */
router.delete("/restaurants/:id", adminController.deleteRestaurant);
/** 所有餐廳路由 - 頁面 */
router.get("/restaurants", adminController.getRestaurants);
/** post - 新增餐廳 */
router.post(
  "/restaurants",
  upload.single("image"),
  adminController.postRestaurant
);

router.use("", (req, res) => res.redirect("/admin/restaurants"));

module.exports = router;
