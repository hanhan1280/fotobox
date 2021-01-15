const express = require("express");
const {
    getFriends,
    addFriend,
    getAllUsers,
    rmFriends,
    getFriendImgs, } = require("../controller/controller");
const router = express.Router();
router.post("/add/:userId", addFriend);
router.get("/all/:search", getAllUsers);
router.get("/friends/getImages/:userId", getFriendImgs);
router.get("/friends", getFriends);
router.delete("/delete/:userId", rmFriends);
module.exports = router;