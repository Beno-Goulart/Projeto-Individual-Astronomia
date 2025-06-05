var database = require("../database/config");

function listarFinais() {
  var instrucaoSql = `SELECT * FROM finais;`;
  return database.executar(instrucaoSql);
}

function buscarFinalPorId(id) {
  var instrucaoSql = `SELECT * FROM finais WHERE id = ${id};`;
  return database.executar(instrucaoSql);
}

module.exports = {
  listarFinais,
  buscarFinalPorId
};