var express = require("express");
var router = express.Router();

var escolhaController = require("../controllers/escolhaController");

router.post("/salvar", function (req, res) {
    escolhaController.salvarEscolha(req, res);
});

router.get("/sessao/:sessao_id", function (req, res) {
    escolhaController.listarEscolhasPorSessao(req, res);
});

module.exports = router;