var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.email;
    var senha = req.body.senha;

    if (!email) {
        res.status(400).send("Seu email está indefinido!");
    } else if (!senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.autenticar(email, senha)
            .then(function (resultadoAutenticar) {
                console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                if (resultadoAutenticar.length === 1) {
                    res.status(200).json(resultadoAutenticar[0]);
                } else if (resultadoAutenticar.length === 0) {
                    res.status(403).send("Email e/ou senha inválidos.");
                } else {
                    res.status(403).send("Mais de um usuário com o mesmo email e senha.");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function cadastrar(req, res) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    if (!nome) {
        res.status(400).send("Seu nome está indefinido!");
    } else if (!email) {
        res.status(400).send("Seu email está indefinido!");
    } else if (!senha) {
        res.status(400).send("Sua senha está indefinida!");
    } else {
        usuarioModel.cadastrar(nome, email, senha)
            .then(function (resultado) {
                res.status(201).json(resultado);
            })
            .catch(function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar o cadastro! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar
};