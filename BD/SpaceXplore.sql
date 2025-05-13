-- create database spacexplore;
-- use spacexplore;

-- Usuários
create table usuarios (
    id int primary key auto_increment,
    nome varchar(100) not null,
    email varchar(100) unique not null,
    senha_hash varchar(255) not null,
    data_cadastro datetime default current_timestamp
);

-- Possíveis finais do jogo
create table finais (
    id int primary key auto_increment,
    titulo varchar(100) not null,
    descricao text
);

-- Sessões de jogo (cada jogada feita por um usuário)
create table sessoes_jogo (
    id int primary key auto_increment,
    usuario_id int,
    data_inicio datetime default current_timestamp,
    data_fim datetime,
    final_id int,
    tempo_total_segundos int,
    foreign key (usuario_id) references usuarios(id),
    foreign key (final_id) references finais(id)
);

-- Decisões disponíveis em cada etapa
create table decisoes (
    id int primary key auto_increment,
    etapa varchar(50) not null,
    texto_opcao varchar(255) not null,
    tipo_perfil varchar(50)  -- Ex: 'impulsivo', 'cauteloso'
);

-- Decisões feitas por cada usuário em uma sessão
create table escolhas (
    id int primary key auto_increment,
    sessao_id int,
    decisao_id int,
    tempo_gasto_segundos int,
    ordem_etapa int,
    foreign key (sessao_id) references sessoes_jogo(id),
    foreign key (decisao_id) references decisoes(id)
);

insert into finais (titulo, descricao) values
('Missão Cumprida', 'Você conserta a nave e chega ao planeta habitável.'),
('Missão Fracassada', 'A nave é destruída e você não sobrevive.'),
('Civilização Alienígena', 'Você encontra e vive entre alienígenas.'),
('Sobrevivente Solitário', 'Você trai a missão para sobreviver sozinho.'),
('Sacrifício Heróico', 'Você se sacrifica para salvar a missão.');

