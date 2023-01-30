const path = require("path");
const express = require("express");
const router = express.Router();
const app = express();



router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "../Public/index.html"));
});


router.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../Public/index.html"));
});

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../Public/index.html"));
});

module.exports = router;