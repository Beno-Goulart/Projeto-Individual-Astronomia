var database = require("../database/config");

function salvarSessao(sessao) {
  var instrucaoSql = `
    INSERT INTO sessao 
    (usuario_id, final_id, perfil_cauteloso, perfil_impulsivo, perfil_analitico, perfil_emocional, perfil_explorador) 
    VALUES 
    (${sessao.usuario_id}, ${sessao.final_id}, ${sessao.perfil_cauteloso}, ${sessao.perfil_impulsivo}, ${sessao.perfil_analitico}, ${sessao.perfil_emocional}, ${sessao.perfil_explorador});
  `;

  return database.executar(instrucaoSql);
}

function buscarSessaoPorUsuario(usuario_id) {
  var instrucaoSql = `SELECT * FROM sessao WHERE usuario_id = ${usuario_id};`;
  return database.executar(instrucaoSql);
}

module.exports = {
  salvarSessao,
  buscarSessaoPorUsuario
};