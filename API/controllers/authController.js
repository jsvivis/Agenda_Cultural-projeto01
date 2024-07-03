const User = require('../models/usuarioModel'); // modelo de usuário
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req, res) => {
  const { email , password} = req.body;
  console.log(req.body)
  try {
    const user = await User.findByEmail(email);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado ;-;' });
    }
    console.log(user[0].Senha);
    
    const isMatch = (password == user[0].Senha);
    console.log(isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciais Inválidas!' });
    }

    const token = jwt.sign({ id: user[0].IdUsuario }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token, user: { id: user[0].IdUsuario, email: user[0].Email } });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro no Servidor' });
  }
};