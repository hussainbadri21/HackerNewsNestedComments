const express = require("express");
const router = express.Router();


const commentsRouter = require("./routes/comments.router");

router.get("/", function(req, res) {
    res.status(200).send({ status: "success", message: "API is working fine." });
});

//All Route Paths

router.use("/comment", commentsRouter);

module.exports = router;
