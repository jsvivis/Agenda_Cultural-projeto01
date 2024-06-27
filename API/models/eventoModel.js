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
    const sql = "SELECT IdEvento, Nome, Descricao, ImagemEvento, Horario, Valor, Publico, Ativo, IdUsuario, IdEspaco FROM Evento";
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = "SELECT IdEvento, Nome, Descricao, ImagemEvento, Horario, Valor, Publico, Ativo, IdUsuario, IdEspaco FROM Evento WHERE IdEvento = ?"; 
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

  delete(id) {
    const sql = "DELETE FROM Evento WHERE IdEvento = ?";
    return this.executeSQL(sql, id); 
  }
}

module.exports = new EventoModel();
