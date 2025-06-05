var express = require("express");
var router = express.Router();

var decisaoController = require("../controllers/decisaoController");

router.get("/", function (req, res) {
    decisaoController.listarDecisoes(req, res);
});

router.get("/etapa/:etapa", function (req, res) {
    decisaoController.buscarDecisaoPorEtapa(req, res);
});

router.post("/inserir", function (req, res) {
    decisaoController.inserirDecisao(req, res);
});

module.exports = router;