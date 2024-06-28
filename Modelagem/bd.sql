CREATE DATABASE agenda;
USE agenda;

/* Um tipo de perfil diferente para somente administradores poderem fazer certas ações */
CREATE TABLE Perfil ( 
    IdPerfil INT PRIMARY KEY AUTO_INCREMENT,
    PerfilUsuario ENUM('ADMINISTRADOR','COLABORADOR','USUARIO') DEFAULT 'USUARIO'
);

/* Usuário para fazer login associado a um tipo de perfil --> não deletar só inativar para manter integridade referencial */
CREATE TABLE Usuario (
    IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE,
    IdPerfil INT,
    FOREIGN KEY (IdPerfil) REFERENCES Perfil(IdPerfil) ON DELETE CASCADE,
    INDEX idx_usuario_ativo (Ativo),
    INDEX idx_usuario_email (Email)
);

/* Para configurações de cores para cada tipo de eventos */
CREATE TABLE Categoria (
    IdCategoria INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE,
    Cor VARCHAR(30) NOT NULL,
	INDEX idx_categoria_ativo (Ativo)
);

/* Armazenar os espaços culturais */
CREATE TABLE Espaco (
    IdEspaco INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NOT NULL,
    Cep INT NOT NULL,
    Endereco VARCHAR(100) NOT NULL,
    Numero VARCHAR(20) NOT NULL,
    Complemento VARCHAR(30),
    Cidade VARCHAR(40) NOT NULL,
    Estado VARCHAR(40) NOT NULL,
    Telefone VARCHAR(25) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    INDEX idx_espaco_nome (Nome)
);

/* Eventos associados a espaço, usuário e tema --> e inicialmente fica oculto até aprovação de administrador */
CREATE TABLE Evento (
    IdEvento INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(50) NOT NULL,
    Descricao TEXT NOT NULL,
    ImagemEvento TEXT NOT NULL,
    Horario DATETIME NOT NULL,
    Valor DOUBLE,
    Publico INT,
    Ativo BOOLEAN DEFAULT FALSE,
    IdUsuario INT,
    IdEspaco INT,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) ON DELETE CASCADE,
    FOREIGN KEY (IdEspaco) REFERENCES Espaco(IdEspaco) ON DELETE CASCADE,
    INDEX idx_evento_ativo (Ativo),
    INDEX idx_evento_horario (Horario),
    INDEX idx_evento_usuario (IdUsuario),
    INDEX idx_evento_espaco (IdEspaco)
);

/* Para categorias que podem ter no evento */
CREATE TABLE CategoriaEvento (
    IdCategoriaEvento INT PRIMARY KEY AUTO_INCREMENT,
    IdEvento INT,
    IdCategoria INT,
    FOREIGN KEY (IdEvento) REFERENCES Evento(IdEvento) ON DELETE CASCADE,
    FOREIGN KEY (IdCategoria) REFERENCES Categoria(IdCategoria) ON DELETE CASCADE,
    INDEX idx_categoria_evento_evento (IdEvento),
    INDEX idx_categoria_evento_categoria (IdCategoria)
);

/* Para arquivos do evento */
CREATE TABLE Arquivo (
    IdArquivo INT PRIMARY KEY AUTO_INCREMENT,
    Caminho TEXT NOT NULL,
    IdEvento INT,
    FOREIGN KEY (IdEvento) REFERENCES Evento(IdEvento) ON DELETE CASCADE,
    INDEX idx_arquivo_evento (IdEvento)
);

/* Para imagens do evento */
CREATE TABLE Imagem (
    IdImagem INT PRIMARY KEY AUTO_INCREMENT,
    Caminho TEXT NOT NULL,
    IdEvento INT,
    FOREIGN KEY (IdEvento) REFERENCES Evento(IdEvento) ON DELETE CASCADE,
    INDEX idx_imagem_evento (IdEvento)
);

/* Para links do evento */
CREATE TABLE Link (
    IdLink INT PRIMARY KEY AUTO_INCREMENT,
    Link TEXT NOT NULL,
    IdEvento INT,
    FOREIGN KEY (IdEvento) REFERENCES Evento(IdEvento) ON DELETE CASCADE,
    INDEX idx_link_evento (IdEvento)
);

/* Para os tipos de "emoticons" que o sistema vai aceitar */
CREATE TABLE Reacao (
    IdReacao INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NOT NULL,
    Emoticon VARCHAR(30) NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE,
    INDEX idx_reacao_nome (Nome),
    INDEX idx_reacao_ativo (Ativo)
);

/* Para armazenar as reações das postagens */
CREATE TABLE ReacaoUsuario (
    IdReacaoUsuario INT PRIMARY KEY AUTO_INCREMENT,
    IdReacao INT,
    IdUsuario INT,
    IdEvento INT,
    FOREIGN KEY (IdReacao) REFERENCES Reacao(IdReacao) ON DELETE CASCADE,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) ON DELETE CASCADE,
    FOREIGN KEY (IdEvento) REFERENCES Evento(IdEvento) ON DELETE CASCADE,
    UNIQUE (IdUsuario, IdEvento, IdReacao), -- Evita múltiplas reações iguais do mesmo usuário na mesma postagem
    INDEX idx_reacao_usuario_evento (IdUsuario, IdEvento)
);

/*Perfil*/
INSERT INTO Perfil (PerfilUsuario) VALUES ('ADMINISTRADOR');
INSERT INTO Perfil (PerfilUsuario) VALUES ('USUARIO');

/*Usuario*/
INSERT INTO Usuario (Nome, Email, Senha, Ativo, IdPerfil) VALUES ('Administrador', 'admin@example.com', 'senha_admin', TRUE, 1);
INSERT INTO Usuario (Nome, Email, Senha, Ativo, IdPerfil) VALUES ('Usuário 1', 'usuario1@example.com', 'senha_usuario1', TRUE, 2);
INSERT INTO Usuario (Nome, Email, Senha, Ativo, IdPerfil) VALUES ('Usuário 2', 'usuario2@example.com', 'senha_usuario2', TRUE, 2);

/*Categoria*/
INSERT INTO Categoria (Nome, Cor) VALUES ('Música', '#FF0000');
INSERT INTO Categoria (Nome, Cor) VALUES ('Teatro', '#00FF00');
INSERT INTO Categoria (Nome, Cor) VALUES ('Dança', '#0000FF');

/*Espaco*/
INSERT INTO Espaco (Nome, Cep, Endereco, Numero, Complemento, Cidade, Estado, Telefone, Email) 
VALUES 
('Espaço Cultural 1', 12345678, 'Rua A', '100', 'Sala 1', 'Cidade A', 'Estado A', '1234-5678', 'contato1@espaco.com'),
('Espaço Cultural 2', 87654321, 'Avenida B', '200', NULL, 'Cidade B', 'Estado B', '8765-4321', 'contato2@espaco.com');

/*Evento*/
INSERT INTO Evento (Nome, Descricao, ImagemEvento, Horario, Valor, Publico, Ativo, IdUsuario, IdEspaco) 
VALUES 
('Evento 1', 'Descrição do Evento 1', 'imagem1.jpg', '2024-07-01 20:00:00', 50.0, 100, FALSE, 2, 1),
('Evento 2', 'Descrição do Evento 2', 'imagem2.jpg', '2024-07-02 18:00:00', 30.0, 150, TRUE, 3, 2);

/*CategoriaEvento*/
INSERT INTO CategoriaEvento (IdEvento, IdCategoria) VALUES (1, 1);
INSERT INTO CategoriaEvento (IdEvento, IdCategoria) VALUES (1, 2);
INSERT INTO CategoriaEvento (IdEvento, IdCategoria) VALUES (2, 3);

/*Arquivo*/
INSERT INTO Arquivo (Caminho, IdEvento) VALUES ('/caminho/para/arquivo1.pdf', 1);
INSERT INTO Arquivo (Caminho, IdEvento) VALUES ('/caminho/para/arquivo2.pdf', 2);

/*Imagem*/
INSERT INTO Imagem (Caminho, IdEvento) VALUES ('/caminho/para/imagem1.jpg', 1);
INSERT INTO Imagem (Caminho, IdEvento) VALUES ('/caminho/para/imagem2.jpg', 2);

/*Link*/
INSERT INTO Link (Link, IdEvento) VALUES ('https://linkparaevento1.com', 1);
INSERT INTO Link (Link, IdEvento) VALUES ('https://linkparaevento2.com', 2);

/*Reacao*/
INSERT INTO Reacao (Nome, Emoticon) VALUES ('Like', '👍');
INSERT INTO Reacao (Nome, Emoticon) VALUES ('Love', '❤️');
INSERT INTO Reacao (Nome, Emoticon) VALUES ('Happy', '😊');

/*ReacaoUsuario*/
INSERT INTO ReacaoUsuario (IdReacao, IdUsuario, IdEvento) VALUES (1, 2, 1);
INSERT INTO ReacaoUsuario (IdReacao, IdUsuario, IdEvento) VALUES (2, 3, 2);
INSERT INTO ReacaoUsuario (IdReacao, IdUsuario, IdEvento) VALUES (3, 2, 2);

