import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function UserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/usuario");
        setUsers(response.data);
        setError(null);
      } catch (error) {
        console.error(error);
        setUsers([]);
        setError("Erro ao carregar usuários");
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/usuario/${searchTerm}`);
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
              <th>Id</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.IdUsuario}>
                <td>{user.IdUsuario}</td>
                <td>{user.Nome}</td>
                <td>{user.Email}</td>
                <td>
                  <Link to={`/update-user/${user.IdUsuario}`} className="btn btn-warning">Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserSearch;
