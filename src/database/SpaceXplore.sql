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

-- Sessões de jogo
CREATE TABLE sessao(
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_id INT NOT NULL,
    final_id INT NOT NULL,
    perfil_cauteloso INT DEFAULT 0,
    perfil_impulsivo INT DEFAULT 0,
    perfil_analitico INT DEFAULT 0,
    perfil_emocional INT DEFAULT 0,
    perfil_explorador INT DEFAULT 0,

    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (final_id) REFERENCES finais(id)
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
    sessao_id INT NOT NULL,
    decisao_id INT NOT NULL,
    ordem_etapa INT NOT NULL,

    FOREIGN KEY (sessao_id) REFERENCES sessao(id),
    FOREIGN KEY (decisao_id) REFERENCES decisoes(id)
);

-- Dados fixos dos finais do jogo
INSERT INTO finais (titulo, descricao) VALUES
('Missão Cumprida', 'Você conserta a nave e chega ao planeta habitável.'),
('Missão Fracassada', 'A nave é destruída e você não sobrevive.'),
('Civilização Alienígena', 'Você encontra e vive entre alienígenas.'),
('Sobrevivente Solitário', 'Você trai a missão para sobreviver sozinho.'),
('Sacrifício Heróico', 'Você se sacrifica para salvar a missão.');

-- Verificar
SELECT * FROM usuarios;