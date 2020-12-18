const express = require("express");
const router = express.Router();

const response = require("../../../network/response");
const controller = require("./index");

router.use(express.json());

router.get("/", function (req, res) {
  const lista = controller
    .list()
    .then(() => {
      response.success(req, res, lista, 200);
    })
    .catch((err) => response.error(req, res, err.message, 500));
});

router.get("/:id", function (req, res) {
  controller
    .get(req.params.id)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => response.error(req, res, err.message, 500));
});

router.delete("/:id", function (req, res) {
  controller
    .remove(req.params.id)
    .then((message) => {
      response.success(req, res, message, 200);
    })
    .catch((err) => response.error(req, res, err.message, 500));
});

router.post("/", function (req, res) {
  console.log(req.body);
  controller
    .create(req.body)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((err) => response.error(req, res, err.message, 500));
});

module.exports = router;
