const { login, register, logout } = require("../controllers/userController");
const express = require("express");
const {getUsers} = require("../controllers/userController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/getUsers", getUsers);

module.exports = router;