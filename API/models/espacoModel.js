
const dbConnection = require("../db/dbConnection");


class EspacoModel {

  
  executeSQL(sql, parametros = "") {
    
    return new Promise( function (resolve, reject) {
        
       
        dbConnection.query(sql, parametros, function (error, resposta) {
          
          if (error) {
            return reject(error);
          }

          return resolve(resposta);
        });

      }
    );
  }


  readList() {
    const sql = "SELECT IdEspaco, Nome, Cep, Endereco, Numero, Complemento, Cidade, Estado, Telefone, Email FROM Espaco";
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = "SELECT IdEspaco, Nome, Cep, Endereco, Numero, Complemento, Cidade, Estado, Telefone, Email FROM Espaco WHERE IdEspaco = ?"; 
    return this.executeSQL(sql, id); 
  }

  create(novoEspaco) {
    const sql = "INSERT INTO Espaco SET ?"; 
    return this.executeSQL(sql, novoEspaco);
  }

  update(updateEspaco, id) {
    const sql = "UPDATE Espaco SET ? WHERE IdEspaco = ?";
    return this.executeSQL(sql, [updateEspaco, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM Espaco WHERE IdEspaco = ?"
    return this.executeSQL(sql, id); 
  }

}

module.exports = new EspacoModel();
