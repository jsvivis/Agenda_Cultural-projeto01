
const dbConnection = require("../db/dbConnection");


class UsuarioModel {

  
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
      const sql = `SELECT Usuario.IdUsuario, Usuario.Nome, Usuario.Email, Usuario.Ativo, Usuario.IdPerfil, Perfil.PerfilUsuario FROM  Usuario 
      JOIN Perfil ON Usuario.IdPerfil = Perfil.IdPerfil
    `;
    return this.executeSQL(sql); 
  }

  read(id) {
    const sql = "SELECT Usuario.IdUsuario, Usuario.Nome, Usuario.Email, Usuario.Ativo, Usuario.IdPerfil, Perfil.PerfilUsuario FROM  Usuario JOIN Perfil ON Usuario.IdPerfil = Perfil.IdPerfil WHERE Usuario.IdUsuario = ?"; 
    return this.executeSQL(sql, id); 
  }

  create(novoUsuario) {
    const sql = "INSERT INTO Usuario SET ?"; 
    return this.executeSQL(sql, novoUsuario);
  }

  update(updateUsuario, id) {
    const sql = "UPDATE Usuario SET ? WHERE IdUsuario = ?";
    return this.executeSQL(sql, [updateUsuario, id]); 
  }

  delete(id) {
    const sql = "DELETE FROM Usuario WHERE IdUsuario = ?"
    return this.executeSQL(sql, id); 
  }

}

module.exports = new UsuarioModel();
