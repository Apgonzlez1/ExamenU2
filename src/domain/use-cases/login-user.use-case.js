const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepo = require('../../infrastructure/repositories/user.repository');

class LoginUser {
  async execute({ email, password }) {
    const user = await userRepo.findByEmail(email);
    if (!user) throw Error('Credenciales inválidas');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw Error('Credenciales inválidas');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '8h' });
    return { token };
  }
}
module.exports = new LoginUser();
