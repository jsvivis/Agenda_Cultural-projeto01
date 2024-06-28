import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function UpdateUser() {
  const { id } = useParams();
  const [user, setUser] = useState({ Nome: '', Email: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/usuario/${id}`);
        const userData = response.data[0]; // Acessa o primeiro objeto no array
        setUser({
          Nome: userData.Nome,
          Email: userData.Email
        });
        setError(null);
      } catch (error) {
        setError("Erro ao carregar usuário");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/usuario/${id}`, user);
      setError(null);
      alert("Usuário atualizado com sucesso!");
    } catch (error) {
      setError("Erro ao atualizar usuário");
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Atualizar Usuário</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="Nome"
            className="form-control"
            value={user.Nome || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            className="form-control"
            value={user.Email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar</button>
      </form>
    </div>
  );
}

export default UpdateUser;
