// Gerenciamento de usuários
let usuarioAtual = JSON.parse(localStorage.getItem("usuarioAtual") || "null");
let usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
let codigosRecuperacao = {};

function gerarCodigoRecuperacao() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function enviarCodigoRecuperacao(email) {
  const usuario = usuarios.find(u => u.email === email);
  if (!usuario) {
    return false;
  }
  const codigo = gerarCodigoRecuperacao();
  codigosRecuperacao[email] = codigo;
  alert(`Código de recuperação enviado para ${email}: ${codigo}`);
  return true;
}

function verificarLogin() {
  if (usuarioAtual) {
    document.querySelector(".actions").innerHTML = `
      <span>Bem-vindo, ${usuarioAtual.nome}</span>
      <button class="botao-principal" onclick="logout()"><span>Sair</span></button>
      <button class="cart-button">
        <span><img src="imagens/carrinho.png" class="cart-icon" /></span>
      </button>
    `;
  }
}

function login(email, senha) {
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);
  if (usuario) {
    usuarioAtual = usuario;
    localStorage.setItem("usuarioAtual", JSON.stringify(usuario));
    verificarLogin();
    return true;
  }
  return false;
}

function logout() {
  usuarioAtual = null;
  localStorage.removeItem("usuarioAtual");
  location.reload();
}

// Executar verificação de login ao carregar a página
document.addEventListener('DOMContentLoaded', verificarLogin);
