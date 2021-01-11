const express = require("express");
const upload = require("../services/upload");
const { uploadImage, getImages, deleteImage } = require("../controller/controller");
const router = express.Router();
router.get("/images", getImages);
router.post("/upload", upload.array("picture", 10), uploadImage);
router.delete("/:imageid", deleteImage);
module.exports = router;