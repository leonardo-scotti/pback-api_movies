CREATE DATABASE db_locadora_filme_ds2t_25_2;

USE db_locadora_filme_ds2t_25_2;

-- ========== FILME ==========
CREATE TABLE tbl_filme(
	id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	sinopse TEXT,
	data_lancamento DATE,
	duracao TIME NOT NULL,
	orcamento DECIMAL NOT NULL,
	trailer VARCHAR(200),
	capa VARCHAR(200) NOT NULL
);

INSERT INTO tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
VALUES ("Jogo Sujo",
    "Segue Parker, um artesão e ladrão profissional que aborda seu trabalho com uma ética de trabalho direta e sem bobagens.",
    "2025-10-01",
    "02:05:00",
    190000000.00,
    "https://www.imdb.com/pt/video/vi2552612889/?playlistId=tt18392014&ref_=tt_ov_ov_vi",
    "https://www.imdb.com/pt/title/tt18392014/mediaviewer/rm3543377922/?ref_=tt_ov_i"
);

INSERT INTO tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
VALUES ("O Aprendiz de Feiticeiro",
    "O mestre feiticeiro Balthazar Blake deve encontrar e treinar o descendente de Merlin para derrotar Morgana la Fée, a feiticeira das trevas.",
    "2010-08-13",
    "01:49:00",
    150000000.00,
    "https://www.imdb.com/pt/video/vi780142105/?playlistId=tt0963966&ref_=tt_ov_ov_vi",
    "https://www.imdb.com/pt/title/tt0963966/mediaviewer/rm147224832/?ref_=tt_ov_i"
);

INSERT INTO tbl_filme(nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa)
VALUES ("Hotel Costiera",
    "Daniel De Luca é um ex-marinheiro meio italiano que retorna à Itália, terra de sua infância, e começa a resolver problemas em um dos hotéis mais luxuosos do mundo, localizado na espetacular costa de Positano.",
    "2025-09-24",
    "01:49:00",
    150000000.00,
    "https://www.imdb.com/pt/video/vi1780795417/?playlistId=tt13924416&ref_=tt_ov_pr_ov_vi",
    "https://www.imdb.com/pt/title/tt13924416/mediaviewer/rm2396239618/?ref_=tt_ov_i"
);

UPDATE tbl_filme SET
    nome                =   'nome',
    sinopse             =   'sinopse',
    data_lancamento     =   'data_lancamento',
    duracao             =   'duracao', 
    orcamento           =   'orcamento',
    trailer             =   'trailer',
    capa                =   'capa'
WHERE id = id;

SELECT id FROM tbl_filme ORDER BY id DESC LIMIT 1;


CREATE TABLE tbl_filme_genero(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    filme_id INT NOT NULL,
    genero_id INT NOT NULL,

    constraint FK_FILME_FILME_GENERO    # Nome da relação
    foreign key (filme_id)              # Qual a chave estrangeira
    references tbl_filme(id),            # De onde vem a FK

    constraint FK_GENERO_FILME_GENERO
    foreign key (genero_id)
    references tbl_genero(id_genero)
);

-- ========== GÊNERO ==========
CREATE TABLE tbl_genero(
	id_genero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(20) NOT NULL
);

INSERT INTO tbl_genero(nome)
VALUES (
    'Nome'
);

UPDATE tbl_genero SET
    nome                =   'nome'
WHERE id = id;

-- ========== IDIOMA ==========
CREATE TABLE tbl_idioma(
	id_idioma INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	idioma VARCHAR(100) NOT NULL
);

INSERT INTO tbl_idioma(idioma)
VALUES (
    'Idioma'
);

UPDATE tbl_idioma SET
    idioma                =   'idioma'
WHERE id = id;

-- ========== PERSONAGEM ==========
CREATE TABLE tbl_personagem(
	id_personagem INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	data_nascimento DATE NOT NULL,
	raca VARCHAR(50) NOT NULL,
	descricao VARCHAR(500) NOT NULL,
    altura DECIMAL(10,2) NOT NULL,
    peso DECIMAL(65,3) NOT NULL
);

INSERT INTO tbl_personagem(nome, data_nascimento, raca, descricao, altura, peso)
VALUES (
    "Nome",
    "DataNascimento",
    "Raça",
    "Descrição",
    12.56,
    150.890
);

UPDATE tbl_personagem SET
    nome                =   'nome'
    data_nascimento     =   'data_nascimento'
    raca                =   'raca'
    descricao           =   'descricao'
    altura              =   'altura'
    peso                =   'peso'
WHERE id = id;

-- ========== DIRETOR ==========
CREATE TABLE tbl_diretor(
	id_diretor INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL,
	data_nascimento DATE NOT NULL,
	altura DECIMAL(4,2) NULL,
	peso DECIMAL(6,3) NULL,
	patrimonio_liquido DECIMAL(14,2) NULL
);

INSERT INTO tbl_diretor(nome, data_nascimento, altura, peso, patrimonio_liquido)
VALUES (
    "Nome",
    "DataNascimento",
    "Raça",
    "Descrição",
    12.56,
    150.890
);

UPDATE tbl_diretor SET
    nome                =   'nome'
    data_nascimento     =   'data_nascimento'
    altura              =   'altura'
    peso                =   'peso'
    patrimonio_liquido  =   'patrimonio_lilquido'
WHERE id = id;
