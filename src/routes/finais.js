var express = require("express");
var router = express.Router();

var finalController = require("../controllers/finalController");

router.get("/", function (req, res) {
    finalController.listarFinais(req, res);
});

router.get("/:id", function (req, res) {
    finalController.buscarFinalPorId(req, res);
});

module.exports = router;