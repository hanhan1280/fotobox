const express = require("express");
const {
    getFriends,
    addFriend,
    getAllUsers,
    getFriendImgs, } = require("../controller/controller");
const router = express.Router();
router.post("/add/:userId", addFriend);
router.get("/all", getAllUsers);
router.get("/friends/getImages/:userId", getFriendImgs);
router.get("/friends", getFriends);
module.exports = router;