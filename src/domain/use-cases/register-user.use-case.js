const bcrypt = require('bcryptjs');
const userRepo = require('../../infrastructure/repositories/user.repository');

class RegisterUser {
  async execute({ email, password }) {
    const hashed = await bcrypt.hash(password, 10);
    return userRepo.create({ email, password: hashed });
  }
}
module.exports = new RegisterUser();
