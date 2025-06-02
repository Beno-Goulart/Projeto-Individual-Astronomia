var database = require("../database/config");

function autenticar(email, senha) {
    console.log("Acessando o usuarioModel para autenticar:", email, senha);

    var instrucaoSql = `
        SELECT id, nome, email, data_cadastro
        FROM usuarios
        WHERE email = '${email}' AND senha_hash = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    console.log("Acessando o usuarioModel para cadastrar:", nome, email, senha);

    var instrucaoSql = `
        INSERT INTO usuarios (nome, email, senha_hash)
        VALUES ('${nome}', '${email}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};