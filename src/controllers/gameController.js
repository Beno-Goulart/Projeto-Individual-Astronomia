var gameModel = require("../models/gameModel");

// Iniciar uma sessão de jogo
function registrarSessao(req, res) {
    var usuarioId = req.body.usuarioId;

    gameModel.registrarSessao(usuarioId)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

// Registrar uma escolha feita
function registrarEscolha(req, res) {
    var sessaoId = req.body.sessaoId;
    var decisaoId = req.body.decisaoId;
    var tempoGasto = req.body.tempoGasto;
    var ordemEtapa = req.body.ordemEtapa;

    gameModel.registrarEscolha(sessaoId, decisaoId, tempoGasto, ordemEtapa)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

// Finalizar a sessão de jogo
function finalizarSessao(req, res) {
    var sessaoId = req.body.sessaoId;
    var finalId = req.body.finalId;
    var tempoTotal = req.body.tempoTotal;

    gameModel.finalizarSessao(sessaoId, finalId, tempoTotal)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

// Dados do dashboard
function obterDashboard(req, res) {
    gameModel.obterDashboard()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    registrarSessao,
    registrarEscolha,
    finalizarSessao,
    obterDashboard
};