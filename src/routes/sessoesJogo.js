var express = require("express");
var router = express.Router();

var sessaoJogoController = require("../controllers/sessaoJogoController");

router.post("/salvar", function (req, res) {
    sessaoJogoController.salvarSessao(req, res);
});

router.get("/usuario/:usuario_id", function (req, res) {
    sessaoJogoController.buscarSessaoPorUsuario(req, res);
});

module.exports = router;