CREATE DATABASE agenda;
USE agenda;

/* Um tipo de perfil diferente para somente administradores poderem fazer certas ações */
CREATE TABLE Perfil ( 
    IdPerfil INT PRIMARY KEY AUTO_INCREMENT,
    PerfilUsuario ENUM('ADMINISTRADOR', 'USUARIO') DEFAULT 'USUARIO'
);

/* Usuário para fazer login associado a um tipo de perfil --> não deletar só inativar para manter integridade referencial */
CREATE TABLE Usuario (
    IdUsuario INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NOT NULL,
    Email VARCHAR(50) NOT NULL UNIQUE,
    Senha VARCHAR(255) NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE,
    IdPerfil INT NOT NULL DEFAULT 2,
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
CREATE TABLE EspacoCultural (
    IdEspacoCultural INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NOT NULL,
    Cep INT NOT NULL,
    Endereco VARCHAR(100) NOT NULL,
    Numero VARCHAR(20) NOT NULL,
    Complemento VARCHAR(30),
    Cidade VARCHAR(40) NOT NULL,
    Estado VARCHAR(40) NOT NULL,
    Telefone VARCHAR(25) NOT NULL,
    Email VARCHAR(50) NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE,
    INDEX idx_espaco_cultural_nome (Nome)
);

/* Para armazenar os espaços dentro de um espaço cultural */
CREATE TABLE Espaco (
    IdEspaco INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(30) NOT NULL,
    Ativo BOOLEAN DEFAULT TRUE,
    IdEspacoCultural INT NOT NULL,
    FOREIGN KEY (IdEspacoCultural) REFERENCES EspacoCultural(IdEspacoCultural) ON DELETE CASCADE,
    INDEX idx_espaco_nome (Nome)
);

/* Eventos associados a espaço, usuário e tema --> e inicialmente fica oculto até aprovação de administrador */
CREATE TABLE Evento (
    IdEvento INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(50) NOT NULL,
    Descricao TEXT NOT NULL,
    ImagemEvento TEXT NOT NULL,
    HorarioInicial DATETIME NOT NULL,
    HorarioFinal DATETIME NOT NULL,
    Valor DOUBLE,
    Publico INT,
    PublicoTotal INT,
    Ativo BOOLEAN DEFAULT FALSE,
    Liberado INT,
    IdUsuario INT,
    IdEspaco INT,
    FOREIGN KEY (IdUsuario) REFERENCES Usuario(IdUsuario) ON DELETE CASCADE,
    FOREIGN KEY (IdEspaco) REFERENCES Espaco(IdEspaco) ON DELETE CASCADE,
    INDEX idx_evento_ativo (Ativo),
    INDEX idx_evento_horario_inicial (HorarioInicial),
    INDEX idx_evento_horario_final (HorarioFinal),
    INDEX idx_evento_usuario (IdUsuario),
    INDEX idx_evento_espaco (IdEspaco),
    INDEX idx_evento_liberado (Liberado)
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

/* Inserir dados fictícios na tabela Perfil */
INSERT INTO Perfil (PerfilUsuario) VALUES 
('ADMINISTRADOR'), 
('USUARIO');

/* Inserir dados fictícios na tabela Usuario */
INSERT INTO Usuario (Nome, Email, Senha, Ativo, IdPerfil) VALUES 
('Admin User', 'admin@example.com', 'password123', TRUE, 1),
('Regular User', 'user@example.com', 'password123', TRUE, 2);

/* Inserir dados fictícios na tabela Categoria */
INSERT INTO Categoria (Nome, Ativo, Cor) VALUES 
('Música', TRUE, '#FF0000'), 
('Teatro', TRUE, '#00FF00'), 
('Dança', TRUE, '#0000FF');

/* Inserir dados fictícios na tabela EspacoCultural */
INSERT INTO EspacoCultural (Nome, Cep, Endereco, Numero, Complemento, Cidade, Estado, Telefone, Email, Ativo) VALUES 
('Espaço Cultural 1', 12345678, 'Rua A', '123', 'Apto 1', 'Cidade A', 'Estado A', '123456789', 'espacocultural1@example.com', TRUE),
('Espaço Cultural 2', 87654321, 'Rua B', '456', 'Apto 2', 'Cidade B', 'Estado B', '987654321', 'espacocultural2@example.com', TRUE);

/* Inserir dados fictícios na tabela Espaco */
INSERT INTO Espaco (Nome, Ativo, IdEspacoCultural) VALUES 
('Espaço 1-1', TRUE, 1), 
('Espaço 1-2', TRUE, 1), 
('Espaço 2-1', TRUE, 2);

/* Inserir dados fictícios na tabela Evento */
INSERT INTO Evento (Nome, Descricao, ImagemEvento, HorarioInicial, HorarioFinal, Valor, Publico, PublicoTotal, Ativo, IdUsuario, IdEspaco) VALUES 
('Evento 1', 'Descrição do Evento 1', 'imagem1.jpg', '2024-07-01 10:00:00', '2024-07-01 12:00:00', 100.0, 50, 100, TRUE, 1, 1),
('Evento 2', 'Descrição do Evento 2', 'imagem2.jpg', '2024-07-02 14:00:00', '2024-07-02 16:00:00', 50.0, 25, 50, FALSE, 2, 2);

/* Inserir dados fictícios na tabela CategoriaEvento */
INSERT INTO CategoriaEvento (IdEvento, IdCategoria) VALUES 
(1, 1), 
(1, 2), 
(2, 3);

/* Inserir dados fictícios na tabela Arquivo */
INSERT INTO Arquivo (Caminho, IdEvento) VALUES 
('caminho/arquivo1.pdf', 1), 
('caminho/arquivo2.pdf', 2);

/* Inserir dados fictícios na tabela Imagem */
INSERT INTO Imagem (Caminho, IdEvento) VALUES 
('caminho/imagem1.jpg', 1), 
('caminho/imagem2.jpg', 2);

/* Inserir dados fictícios na tabela Link */
INSERT INTO Link (Link, IdEvento) VALUES 
('http://link1.com', 1), 
('http://link2.com', 2);

/* Inserir dados fictícios na tabela Reacao */
INSERT INTO Reacao (Nome, Emoticon, Ativo) VALUES 
('Gostei', '👍', TRUE), 
('Amei', '❤️', TRUE), 
('Haha', '😂', TRUE);

/* Inserir dados fictícios na tabela ReacaoUsuario */
INSERT INTO ReacaoUsuario (IdReacao, IdUsuario, IdEvento) VALUES 
(1, 1, 1), 
(2, 2, 2);

