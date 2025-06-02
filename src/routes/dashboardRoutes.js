const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Total de jogadores
router.get('/total-jogadores', async (req, res) => {
    const [result] = await db.query('SELECT COUNT(*) AS total FROM usuarios');
    res.json(result[0]);
});

// Final mais alcançado
router.get('/final-mais-alcancado', async (req, res) => {
    const [result] = await db.query(`
        SELECT f.titulo, COUNT(s.final_id) AS total
        FROM sessoes_jogo s
        JOIN finais f ON s.final_id = f.id
        GROUP BY f.titulo
        ORDER BY total DESC
        LIMIT 1
    `);
    res.json(result[0]);
});

// Tempo médio de jogo
router.get('/tempo-medio', async (req, res) => {
    const [result] = await db.query(`
        SELECT ROUND(AVG(tempo_total_segundos)) AS media_segundos
        FROM sessoes_jogo
    `);
    res.json(result[0]);
});

// Distribuição dos finais (para gráfico de barras)
router.get('/finais', async (req, res) => {
    const [result] = await db.query(`
        SELECT f.titulo, COUNT(s.final_id) AS total
        FROM sessoes_jogo s
        JOIN finais f ON s.final_id = f.id
        GROUP BY f.titulo
    `);
    res.json(result);
});

// Distribuição das escolhas (para pizza)
router.get('/escolhas', async (req, res) => {
    const [result] = await db.query(`
        SELECT d.texto_opcao AS escolha, COUNT(e.id) AS total
        FROM escolhas e
        JOIN decisoes d ON e.decisao_id = d.id
        GROUP BY d.texto_opcao
    `);
    res.json(result);
});

// Perfil de decisões (para radar)
router.get('/perfil-decisoes', async (req, res) => {
    const [result] = await db.query(`
        SELECT tipo_perfil, COUNT(*) AS total
        FROM decisoes
        WHERE tipo_perfil IS NOT NULL
        GROUP BY tipo_perfil
    `);
    res.json(result);
});

module.exports = router;