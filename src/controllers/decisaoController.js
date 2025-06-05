var decisaoModel = require("../models/decisaoModel");

function listarDecisoes(req, res) {
    decisaoModel.listarDecisoes()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarDecisaoPorEtapa(req, res) {
    var etapa = req.params.etapa;

    if (!etapa) {
        res.status(400).send("Etapa está indefinida!");
    } else {
        decisaoModel.buscarDecisaoPorEtapa(etapa)
            .then(function (resultado) {
                res.status(200).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function inserirDecisao(req, res) {
    var etapa = req.body.etapa;
    var texto_opcao = req.body.texto_opcao;

    if (!etapa) {
        res.status(400).send("Etapa está indefinida!");
    } else if (!texto_opcao) {
        res.status(400).send("Texto da opção está indefinido!");
    } else {
        decisaoModel.inserirDecisao(etapa, texto_opcao)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    listarDecisoes,
    buscarDecisaoPorEtapa,
    inserirDecisao
};