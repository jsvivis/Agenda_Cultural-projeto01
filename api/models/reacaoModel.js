const dbConnection = require("../db/dbConnection");

class ReacaoModel {

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
    const sql = "SELECT IdReacao, Nome, Emoticon,Ativo FROM Reacao";
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = "SELECT IdReacao, Nome, Emoticon, Ativo FROM Reacao WHERE IdReacao = ?"; 
    return this.executeSQL(sql, id); 
  }

  create(novoLink) {
    const sql = "INSERT INTO Reacao SET ?"; 
    return this.executeSQL(sql, novoLink);
  }

  update(updateLink, id) {
    const sql = "UPDATE Reacao SET ? WHERE IdReacao = ?";
    return this.executeSQL(sql, [updateLink, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM Reacao WHERE IdReacao = ?";
    return this.executeSQL(sql, id); 
  }
}

module.exports = new ReacaoModel();
