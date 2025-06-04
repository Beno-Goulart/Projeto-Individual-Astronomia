-- DROP DATABASE spacexplore;
CREATE DATABASE spacexplore;
USE spacexplore;

-- Usuários
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    data_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Possíveis finais do jogo
CREATE TABLE finais (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- Sessões de jogo (cada jogada feita por um usuário)
CREATE TABLE sessoes_jogo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT,
    data_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    data_fim DATETIME,
    final_id INT,
    tempo_total_segundos INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (final_id) REFERENCES finais(id) ON DELETE SET NULL
);

-- Decisões disponíveis em cada etapa
CREATE TABLE decisoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    etapa VARCHAR(50) NOT NULL,
    texto_opcao VARCHAR(255) NOT NULL
);

-- Decisões feitas por cada usuário em uma sessão
CREATE TABLE escolhas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    sessao_id INT,
    decisao_id INT,
    tempo_gasto_segundos INT,
    ordem_etapa INT,
    FOREIGN KEY (sessao_id) REFERENCES sessoes_jogo(id) ON DELETE CASCADE,
    FOREIGN KEY (decisao_id) REFERENCES decisoes(id) ON DELETE CASCADE
);

-- Dados fixos dos finais do jogo
INSERT INTO finais (titulo, descricao) VALUES
('Missão Cumprida', 'Você conserta a nave e chega ao planeta habitável.'),
('Missão Fracassada', 'A nave é destruída e você não sobrevive.'),
('Civilização Alienígena', 'Você encontra e vive entre alienígenas.'),
('Sobrevivente Solitário', 'Você trai a missão para sobreviver sozinho.'),
('Sacrifício Heróico', 'Você se sacrifica para salvar a missão.');

select * from sessoes_jogo;