var escolhaModel = require("../models/escolhaModel");

function salvarEscolha(req, res) {
    var escolha = req.body;

    if (!escolha.sessao_id) {
        res.status(400).send("ID da sessão está indefinido!");
    } else if (!escolha.decisao_id) {
        res.status(400).send("ID da decisão está indefinido!");
    } else if (escolha.ordem_etapa === undefined) {
        res.status(400).send("Ordem da etapa está indefinida!");
    } else {
        escolhaModel.salvarEscolha(escolha)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listarEscolhasPorSessao(req, res) {
    var sessao_id = req.params.sessao_id;

    if (!sessao_id) {
        res.status(400).send("ID da sessão está indefinido!");
    } else {
        escolhaModel.listarEscolhasPorSessao(sessao_id)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    salvarEscolha,
    listarEscolhasPorSessao
};