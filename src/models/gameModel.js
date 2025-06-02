var database = require("../database/config");

// Iniciar uma sessão
function registrarSessao(usuarioId) {
    var instrucaoSql = `
        INSERT INTO sessoes_jogo (usuario_id) VALUES (${usuarioId});
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Registrar uma escolha
function registrarEscolha(sessaoId, decisaoId, tempoGasto, ordemEtapa) {
    var instrucaoSql = `
        INSERT INTO escolhas (sessao_id, decisao_id, tempo_gasto_segundos, ordem_etapa)
        VALUES (${sessaoId}, ${decisaoId}, ${tempoGasto}, ${ordemEtapa});
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Finalizar sessão
function finalizarSessao(sessaoId, finalId, tempoTotal) {
    var instrucaoSql = `
        UPDATE sessoes_jogo 
        SET data_fim = CURRENT_TIMESTAMP, final_id = ${finalId}, tempo_total_segundos = ${tempoTotal}
        WHERE id = ${sessaoId};
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Dados do Dashboard
function obterDashboard() {
    var instrucaoSql = `
        SELECT 
            (SELECT COUNT(*) FROM usuarios) AS totalJogadores,
            (SELECT titulo FROM finais 
                WHERE id = (
                    SELECT final_id FROM sessoes_jogo 
                    GROUP BY final_id 
                    ORDER BY COUNT(*) DESC 
                    LIMIT 1
                )
            ) AS finalMaisAlcancado,
            (SELECT texto_opcao FROM decisoes 
                WHERE id = (
                    SELECT decisao_id FROM escolhas 
                    GROUP BY decisao_id 
                    ORDER BY COUNT(*) DESC 
                    LIMIT 1
                )
            ) AS decisaoMaisComum,
            (SELECT ROUND(AVG(tempo_total_segundos)) FROM sessoes_jogo WHERE tempo_total_segundos IS NOT NULL) AS tempoMedio;
    `;
    console.log("Executando SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    registrarSessao,
    registrarEscolha,
    finalizarSessao,
    obterDashboard
};