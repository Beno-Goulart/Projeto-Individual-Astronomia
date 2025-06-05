var database = require("../database/config");

function salvarSessao(req, res) {
    const { usuario_id, final_id, escolhas, perfil } = req.body;

    console.log("Recebendo dados da sessão:", req.body);

    if (!usuario_id || !final_id || !Array.isArray(escolhas) || !perfil) {
        return res.status(400).json({ erro: "Dados inválidos ou incompletos" });
    }

    const sqlSessao = `
        INSERT INTO sessao (usuario_id, final_id, data_hora) 
        VALUES (${usuario_id}, ${final_id}, NOW())
    `;

    database.executar(sqlSessao).then(resultadoSessao => {
        const sessao_id = resultadoSessao.insertId;

        let sqlEscolhas = "";
        escolhas.forEach(e => {
            sqlEscolhas += `
                INSERT INTO escolha (sessao_id, decisao_id, ordem_etapa) 
                VALUES (${sessao_id}, '${e.decisao_id}', ${e.ordem_etapa});
            `;
        });

        const sqlPerfil = `
            INSERT INTO perfil (sessao_id, cauteloso, impulsivo, analitico, emocional, explorador)
            VALUES (${sessao_id}, ${perfil.cauteloso}, ${perfil.impulsivo}, ${perfil.analitico}, ${perfil.emocional}, ${perfil.explorador});
        `;

        const sqlCompleto = sqlEscolhas + sqlPerfil;

        return database.executar(sqlCompleto);
    })
    .then(() => {
        res.status(200).json({ mensagem: "Sessão salva com sucesso" });
    })
    .catch(erro => {
        console.error("Erro ao salvar sessão:", erro);
        res.status(500).json({ erro: "Erro ao salvar sessão", detalhe: erro });
    });
}


function buscarSessaoPorUsuario(req, res) {
    const usuario_id = req.params.usuario_id;

    const sql = `
        SELECT * FROM sessao 
        WHERE usuario_id = ${usuario_id}
        ORDER BY data_hora DESC
        LIMIT 1;
    `;

    database.executar(sql).then(resultado => {
        res.status(200).json(resultado);
    }).catch(erro => {
        console.error("Erro ao buscar sessão:", erro);
        res.status(500).json({ erro: "Erro ao buscar sessão" });
    });
}

module.exports = {
    salvarSessao,
    buscarSessaoPorUsuario
};