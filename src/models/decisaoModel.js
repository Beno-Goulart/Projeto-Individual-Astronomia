var database = require("../database/config");

function listarDecisoes() {
  var instrucaoSql = `SELECT * FROM decisoes;`;
  return database.executar(instrucaoSql);
}

function buscarDecisaoPorEtapa(etapa) {
  var instrucaoSql = `SELECT * FROM decisoes WHERE etapa = '${etapa}';`;
  return database.executar(instrucaoSql);
}

function inserirDecisao(etapa, textoOpcao) {
  var instrucaoSql = `
    INSERT INTO decisoes (etapa, texto_opcao) VALUES ('${etapa}', '${textoOpcao}');
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  listarDecisoes,
  buscarDecisaoPorEtapa,
  inserirDecisao
};