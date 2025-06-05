var database = require("../database/config");

function salvarEscolha(escolha) {
  var instrucaoSql = `
    INSERT INTO escolhas (sessao_id, decisao_id, ordem_etapa) 
    VALUES (${escolha.sessao_id}, ${escolha.decisao_id}, ${escolha.ordem_etapa});
  `;
  return database.executar(instrucaoSql);
}

function listarEscolhasPorSessao(sessao_id) {
  var instrucaoSql = `SELECT * FROM escolhas WHERE sessao_id = ${sessao_id} ORDER BY ordem_etapa ASC;`;
  return database.executar(instrucaoSql);
}

module.exports = {
  salvarEscolha,
  listarEscolhasPorSessao
};