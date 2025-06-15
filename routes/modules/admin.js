const express = require("express");
const router = express.Router();

const { authenticatedAdmin } = require("../../middleware/auth"); //引入 auth.js

const adminController = require("../../controllers/admin-controller");

router.get("/restaurants", authenticatedAdmin, adminController.getRestaurants);
router.use("", (req, res) => res.redirect("/admin/restaurants"));

module.exports = router;
