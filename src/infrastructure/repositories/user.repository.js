const User = require('../../domain/models/user.model');

class UserRepository {
  async create(userData) {
    const user = new User(userData);
    return user.save();
  }
  async findByEmail(email) {
    return User.findOne({ email });
  }
}
module.exports = new UserRepository();
