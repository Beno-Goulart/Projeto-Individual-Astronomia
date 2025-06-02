var express = require("express");
var router = express.Router();

var gameController = require("../controllers/gameController");

// Cadastro de usuário
router.post("/cadastrar", function (req, res) {
    gameController.cadastrar(req, res);
});

// Login de usuário
router.post("/autenticar", function (req, res) {
    gameController.autenticar(req, res);
});

// Iniciar sessão de jogo
router.post("/iniciarSessao", function (req, res) {
    gameController.iniciarSessao(req, res);
});

// Registrar uma escolha
router.post("/registrarEscolha", function (req, res) {
    gameController.registrarEscolha(req, res);
});

// Finalizar a sessão
router.post("/finalizarSessao", function (req, res) {
    gameController.finalizarSessao(req, res);
});

module.exports = router;