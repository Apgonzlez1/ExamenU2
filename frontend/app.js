const API_URL = 'http://localhost:3000/api/auth'; // Ajusta si usas otro puerto
let socket = null;
let token = null;

const registerEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
const btnRegister = document.getElementById('btnRegister');
const registerMsg = document.getElementById('registerMsg');

const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const btnLogin = document.getElementById('btnLogin');
const loginMsg = document.getElementById('loginMsg');

const chatDiv = document.getElementById('chat');
const messagesDiv = document.getElementById('messages');
const msgInput = document.getElementById('msgInput');
const btnSend = document.getElementById('btnSend');
const btnLogout = document.getElementById('btnLogout');

btnRegister.onclick = async () => {
  const email = registerEmail.value.trim();
  const password = registerPassword.value.trim();
  if (!email || !password) {
    registerMsg.textContent = 'Completa email y contraseña.';
    return;
  }
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      registerMsg.style.color = 'green';
      registerMsg.textContent = `Usuario registrado: ${data.email}`;
    } else {
      registerMsg.style.color = 'red';
      registerMsg.textContent = data.message || 'Error al registrar';
    }
  } catch (e) {
    registerMsg.style.color = 'red';
    registerMsg.textContent = 'Error de conexión';
  }
};

btnLogin.onclick = async () => {
  const email = loginEmail.value.trim();
  const password = loginPassword.value.trim();
  if (!email || !password) {
    loginMsg.textContent = 'Completa email y contraseña.';
    return;
  }
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      loginMsg.textContent = '';
      token = data.token;
      loginDiv.style.display = 'none';
      registerDiv.style.display = 'none';
      chatDiv.style.display = 'block';
      startSocket();
    } else {
      loginMsg.style.color = 'red';
      loginMsg.textContent = data.message || 'Credenciales inválidas';
    }
  } catch (e) {
    loginMsg.style.color = 'red';
    loginMsg.textContent = 'Error de conexión';
  }
};

function startSocket() {
  socket = io('http://localhost:3000', {
    auth: { token }
  });

  socket.on('connect', () => {
    addMessage('Sistema', 'Conectado al chat');
  });

  socket.on('message', (msg) => {
    addMessage(msg.user.email, msg.text);
  });

  socket.on('disconnect', () => {
    addMessage('Sistema', 'Desconectado del chat');
  });

  socket.on('connect_error', (err) => {
    addMessage('Error', err.message);
  });
}

btnSend.onclick = () => {
  const text = msgInput.value.trim();
  if (!text) return;
  socket.emit('sendMessage', text);
  msgInput.value = '';
};

btnLogout.onclick = () => {
  token = null;
  socket.disconnect();
  chatDiv.style.display = 'none';
  loginDiv.style.display = 'block';
  registerDiv.style.display = 'block';
  messagesDiv.innerHTML = '';
};

function addMessage(user, text) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `<strong>${user}:</strong> ${text}`;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Mostrar u ocultar formularios al inicio
const loginDiv = document.getElementById('login');
const registerDiv = document.getElementById('register');
loginDiv.style.display = 'block';
registerDiv.style.display = 'block';
chatDiv.style.display = 'none';
