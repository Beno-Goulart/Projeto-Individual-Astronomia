var finalModel = require("../models/finalModel");

function listarFinais(req, res) {
    finalModel.listarFinais()
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function buscarFinalPorId(req, res) {
    var id = req.params.id;

    if (!id) {
        res.status(400).send("ID do final está indefinido!");
    } else {
        finalModel.buscarFinalPorId(id)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado[0]);
                } else {
                    res.status(404).send("Final não encontrado");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    listarFinais,
    buscarFinalPorId
};