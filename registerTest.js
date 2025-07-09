// registerTest.js
require('dotenv').config();
const RegisterUser = require('./src/domain/use-cases/register-user.use-case');

(async () => {
  try {
    const user = await RegisterUser.execute({
      email: 'adriana@example.com',   // cambia este email si ya existe
      password: '123456'              // cambia la clave si deseas
    });

    console.log('✅ Usuario registrado con éxito:');
    console.log('🆔 ID:', user._id);
    console.log('📧 Email:', user.email);
  } catch (error) {
    console.error('❌ Error al registrar usuario:', error.message);
  }
})();
