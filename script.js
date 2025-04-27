// script.js

// Elementos
const btnLogin = document.getElementById('btnLogin');
const bemVindo = document.getElementById('bemVindo');
const loginText = document.getElementById('loginText');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal-login');
const modalTitle = document.getElementById('modal-title');
const usuarioInput = document.getElementById('usuario');
const emailInput = document.getElementById('email');
const senhaInput = document.getElementById('senha');
const mensagemErro = document.getElementById('mensagem-erro');
const actionBtn = document.getElementById('actionBtn');
const actionText = document.getElementById('actionText');
const toggleLink = document.getElementById('toggleLink');

let modo = 'cadastro'; // ou 'login'
let usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');

// Se já estiver logado, exibe saudação
const logado = localStorage.getItem('logado');
if (logado) onLoginSuccess(logado);

btnLogin.addEventListener('click', abrirModal);
toggleLink.addEventListener('click', () => {
  modo = modo === 'cadastro' ? 'login' : 'cadastro';
  atualizarUI();
});

actionBtn.addEventListener('click', processar);

// Funções
function abrirModal() {
  mensagemErro.textContent = '';
  overlay.style.display = 'block';
  modal.style.display = 'flex';
  modal.classList.add('show');
  atualizarUI();
}
function fecharModal() {
  modal.classList.remove('show');
  modal.style.animation = 'zoomOut 0.3s ease';
  setTimeout(() => {
    modal.style.display = 'none';
    overlay.style.display = 'none';
    modal.style.animation = '';
  }, 300);
}
function atualizarUI() {
  if (modo === 'cadastro') {
    modalTitle.textContent = 'Fazer cadastro';
    actionText.textContent = 'Continuar';
    usuarioInput.style.display = 'block';
    toggleLink.textContent = 'Já possui conta? Fazer login';
  } else {
    modalTitle.textContent = 'Fazer login';
    actionText.textContent = 'Entrar';
    usuarioInput.style.display = 'none';
    toggleLink.textContent = 'Não possui conta? Criar agora';
  }
}
function processar() {
  mensagemErro.textContent = '';
  const nome = usuarioInput.value.trim();
  const email = emailInput.value.trim();
  const senha = senhaInput.value;

  if (!email || !senha || (modo === 'cadastro' && !nome)) {
    mensagemErro.textContent = 'Preencha todos os campos.';
    return;
  }
  if (modo === 'cadastro') {
    if (senha.length < 6 || !/[^a-zA-Z0-9]/.test(senha)) {
      mensagemErro.textContent = 'Senha precisa de 6+ chars e 1 especial.';
      return;
    }
    if (usuarios.find(u => u.email === email)) {
      mensagemErro.textContent = 'E-mail já cadastrado.';
      return;
    }
    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('logado', nome);
    onLoginSuccess(nome);
    fecharModal();
  } else {
    const user = usuarios.find(u => u.email === email && u.senha === senha);
    if (!user) {
      mensagemErro.textContent = 'E-mail ou senha incorretos.';
      return;
    }
    localStorage.setItem('logado', user.nome);
    onLoginSuccess(user.nome);
    fecharModal();
  }
}
function onLoginSuccess(nome) {
  bemVindo.style.display = 'inline';
  bemVindo.textContent = `Olá, ${nome}`;
  loginText.textContent = 'Minha conta';
  btnLogin.removeEventListener('click', abrirModal);
  btnLogin.addEventListener('click', () => {/* futuramente abrir área conta */});
}

// Neve (inalterado)
const container = document.querySelector('.neve-container');
function criarFloco() {
  const floco = document.createElement('div');
  floco.classList.add('floco');
  floco.style.left = Math.random() * 100 + 'vw';
  floco.style.animationDuration = (6 + Math.random() * 4) + 's';
  container.appendChild(floco);
  setTimeout(() => floco.remove(), 10000);
}
setInterval(criarFloco, 200);
