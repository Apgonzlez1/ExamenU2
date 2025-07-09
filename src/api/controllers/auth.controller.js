// src/api/controllers/auth.controller.js

const RegisterUser = require('../../domain/use-cases/register-user.use-case');
const LoginUser = require('../../domain/use-cases/login-user.use-case');

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await RegisterUser.execute({ email, password });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await LoginUser.execute({ email, password });
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
