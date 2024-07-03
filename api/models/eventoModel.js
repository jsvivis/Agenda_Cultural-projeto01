const dbConnection = require("../db/dbConnection");

class EventoModel {

  executeSQL(sql, parametros = "") {
    return new Promise(function (resolve, reject) {
      dbConnection.query(sql, parametros, function (error, resposta) {
        if (error) {
          return reject(error);
        }
        return resolve(resposta);
      });
    });
  }

  readList() {
    const sql =  `SELECT 
        Evento.IdEvento, Evento.Nome, Evento.Descricao, Evento.ImagemEvento, Evento.HorarioInicial, Evento.HorarioFinal, Evento.Valor, 
        Evento.Publico, Evento.PublicoTotal, Evento.Ativo, Evento.IdUsuario, Evento.IdEspaco, UsuarioCriador.Nome AS NomeUsuario,
        Espaco.Nome AS NomeEspaco, Evento.Liberado, UsuarioLiberacao.Nome AS NomeUsuarioLiberacao
    FROM Evento
    JOIN Usuario AS UsuarioCriador ON Evento.IdUsuario = UsuarioCriador.IdUsuario
    JOIN Espaco ON Evento.IdEspaco = Espaco.IdEspaco
    LEFT JOIN Usuario AS UsuarioLiberacao ON Evento.Liberado = UsuarioLiberacao.IdUsuario`;
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = `
        SELECT 
            Evento.IdEvento, Evento.Nome, Evento.Descricao, Evento.ImagemEvento, Evento.HorarioInicial, Evento.HorarioFinal, Evento.Valor,    
            Evento.Publico, Evento.PublicoTotal, Evento.Ativo, Evento.IdUsuario, Evento.IdEspaco, UsuarioCriador.Nome AS NomeUsuario,
            Espaco.Nome AS NomeEspaco, Espaco.IdEspacoCultural, EspacoCultural.Nome AS NomeEspacoCultural, Evento.Liberado, 
            UsuarioLiberacao.Nome AS NomeUsuarioLiberacao
        FROM Evento 
        JOIN Usuario AS UsuarioCriador ON Evento.IdUsuario = UsuarioCriador.IdUsuario 
        JOIN Espaco ON Evento.IdEspaco = Espaco.IdEspaco 
        JOIN EspacoCultural ON Espaco.IdEspacoCultural = EspacoCultural.IdEspacoCultural
        LEFT JOIN Usuario AS UsuarioLiberacao ON Evento.Liberado = UsuarioLiberacao.IdUsuario 
        WHERE Evento.IdEvento = ?`;
    return this.executeSQL(sql, id); 
  }

  create(novoEvento) {
    const sql = "INSERT INTO Evento SET ?"; 
    return this.executeSQL(sql, novoEvento);
  }

  update(updateEvento, id) {
    const sql = "UPDATE Evento SET ? WHERE IdEvento = ?";
    return this.executeSQL(sql, [updateEvento, id]); 
  }

  updateLiberar(liberar, id) {
    const sql = "UPDATE Evento SET Liberado = ? WHERE IdEvento = ?";
    return this.executeSQL(sql, [liberar, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM Evento WHERE IdEvento = ?";
    return this.executeSQL(sql, id); 
  }
}

module.exports = new EventoModel();
