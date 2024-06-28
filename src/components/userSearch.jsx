import React, { useState } from "react";
import axios from "axios";

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/usuarios?search=${searchTerm}`);
      setUsers(response.data);
      setError(null);
    } catch (error) {
      console.error(error);
      setUsers([]);
      setError("Nenhum usuário encontrado");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Pesquisar Usuário:</label>
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Digite o nome ou email do usuário"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
      {error && <div className="error">{error}</div>}
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.senha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserSearch;
