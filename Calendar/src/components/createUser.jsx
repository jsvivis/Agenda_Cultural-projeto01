// BIBLIOTECAS
import React, { useState } from "react";
import axios from "axios";

function CreateUser() {
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: ""
    });

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/usuario', formData);
            console.log(response.data);
            setFormData({
                nome: "",
                email: "",
                senha: ""
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <div>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Nome:</label>
                    <input type="text" className="form-control" name="nome"
                    value={formData.nome} onChange={handleChange} placeholder="Digite seu nome:" required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" name="email"
                    value={formData.email} onChange={handleChange} placeholder="Digite seu email:" required />
                </div>
                <div className="form-group">
                    <label>Senha:</label>
                    <input type="password" className="form-control" name="senha"
                    value={formData.senha} onChange={handleChange} placeholder="Digite sua senha:" required />
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
        </>
    )
}
export default CreateUser;