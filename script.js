let codigoRecuperacao = null;
let tentativas = 0;

function mostrarRecuperacao() {
  const email = document.getElementById('novo-email').value;
  if (!email) {
    mostrarErro("Digite seu email primeiro");
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    mostrarErro("Email não encontrado");
    return;
  }

  // Gera código de 6 dígitos
  codigoRecuperacao = Math.floor(100000 + Math.random() * 900000).toString();

  // Em um sistema real, enviaria o email
  console.log("Código:", codigoRecuperacao);
  alert(`Código enviado para ${email}`);

  document.getElementById('codigo-container').style.display = 'block';
  document.getElementById('novo-usuario').style.display = 'none';
  document.getElementById('nova-senha').style.display = 'none';
  document.getElementById('recuperacao-container').style.display = 'none';
}

function mostrarErro(mensagem) {
  const erro = document.getElementById('erro-codigo');
  erro.textContent = mensagem;
  erro.style.display = 'block';
  setTimeout(() => {
    erro.style.display = 'none';
  }, 3000);
}

function verificarCodigo() {
  const codigoDigitado = document.getElementById('codigo-recuperacao').value;
  const novaSenha = document.getElementById('nova-senha-recuperacao').value;

  if (codigoDigitado !== codigoRecuperacao) {
    tentativas++;
    if (tentativas >= 3) {
      mostrarErro("Muitas tentativas. Tente novamente mais tarde.");
      setTimeout(() => {
        document.getElementById('codigo-container').style.display = 'none';
        tentativas = 0;
      }, 1800000); // 30 minutos
      return;
    }
    mostrarErro("Código inválido");
    return false;
  }

  if (novaSenha.length < 6) {
    mostrarErro("A senha deve ter pelo menos 6 caracteres");
    return false;
  }

  const email = document.getElementById('novo-email').value;
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const usuarioIndex = usuarios.findIndex(u => u.email === email);

  usuarios[usuarioIndex].senha = novaSenha;
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert("Senha alterada com sucesso!");
  document.getElementById('codigo-container').style.display = 'none';
  document.getElementById('novo-usuario').style.display = 'block';
  document.getElementById('nova-senha').style.display = 'block';
  document.getElementById('recuperacao-container').style.display = 'block';
  codigoRecuperacao = null;
  tentativas = 0;
  return true;
}

function fazerCadastroOuLogin() {
  if (document.getElementById('codigo-container').style.display === 'block') {
    if (verificarCodigo()) {
      location.reload();
    }
    return;
  }

  const nome = document.getElementById('novo-usuario').value;
  const email = document.getElementById('novo-email').value;
  const senha = document.getElementById('nova-senha').value;

  if (!email || !senha || (modo === 'cadastro' && !nome)) {
    mostrarErro("Preencha todos os campos!");
    return;
  }

  if (modo === 'cadastro') {
    if (senha.length < 6) {
      mostrarErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.some(u => u.email === email)) {
      mostrarErro("Email já cadastrado");
      return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('logado', nome);
    alert("Cadastro realizado com sucesso!");
    location.reload();
  } else {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      mostrarErro("Email ou senha incorretos");
      return;
    }

    localStorage.setItem('logado', usuario.nome);
    alert("Login realizado com sucesso!");
    location.reload();
  }
}

let modo = 'cadastro';

function alternarModo() {
  modo = modo === 'cadastro' ? 'login' : 'cadastro';
  atualizarModal();
}

function atualizarModal() {
  const titulo = document.getElementById('modal-title');
  const inputNome = document.getElementById('novo-usuario');
  const botaoTexto = document.querySelector('.modal .botao-principal span');
  const linkTexto = document.getElementById('alternar-login');
  const termosTexto = document.querySelector('.termos');
  const recuperacaoContainer = document.getElementById('recuperacao-container');

  if (modo === 'login') {
    titulo.innerText = 'Fazer login';
    inputNome.style.display = 'none';
    botaoTexto.innerText = 'Entrar';
    linkTexto.innerHTML = 'Não possui uma conta? <span class="link-login">Fazer cadastro</span>';
    termosTexto.style.display = 'none';
    recuperacaoContainer.style.display = 'block';
  } else {
    titulo.innerText = 'Fazer cadastro';
    inputNome.style.display = 'block';
    botaoTexto.innerText = 'Continuar';
    linkTexto.innerHTML = 'Já possui uma conta? <span class="link-login">Fazer login</span>';
    termosTexto.style.display = 'block';
    recuperacaoContainer.style.display = 'none';
  }
}

function abrirModal() {
  const modal = document.getElementById("modal-login");
  const overlay = document.getElementById("overlay");
  modal.style.display = "block";
  overlay.style.display = "block";
}

function verificarLogin() {
  const logado = localStorage.getItem('logado');
  if (!logado) {
    abrirModal(); // Se não estiver logado, abre o modal
    return;
  }
  // Se estiver logado, não faz nada
}


window.onload = () => {
  const logado = localStorage.getItem('logado');
  if (logado) {
    document.getElementById('botao-texto-header').innerText = logado;
  }
};
