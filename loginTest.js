require('dotenv').config();
const LoginUser = require('./src/domain/use-cases/login-user.use-case');

(async () => {
  try {
    const response = await LoginUser.execute({
      email: 'tucorreo@ejemplo.com',
      password: 'tucontraseña'
    });
    console.log('🎟️ Tu JWT generado:', response.token);
  } catch (error) {
    console.error('❌ Error al loguear:', error.message);
  }
})();
