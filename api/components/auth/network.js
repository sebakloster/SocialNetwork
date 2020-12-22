const express = require("express");
const router = express.Router();

const response = require("../../../network/response");
const controller = require("./index");
router.use(express.json());

router.post("/login", function (req, res) {
  controller
    .login(req.body.username, req.body.password)
    .then((token) => response.success(req, res, token, 200))
    .catch((error) => response.error(req, res, "Informacion invalida", 400));
});

module.exports = router;
