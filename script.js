let codigoRecuperacao = null;
let tentativas = 0;

function enviarCodigo() {
  const email = document.getElementById('reset-email').value;
  const erroElement = document.getElementById('erro-reset');

  if (!email) {
    erroElement.textContent = "Por favor, preencha o email";
    erroElement.style.display = 'block';
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    erroElement.textContent = "Email não encontrado";
    erroElement.style.display = 'block';
    return;
  }

  // Gera código de 6 dígitos
  codigoRecuperacao = Math.floor(100000 + Math.random() * 900000).toString();

  // Em um sistema real, enviaria o email
  console.log("Código:", codigoRecuperacao);
  alert(`Código enviado para ${email}`);

  document.getElementById('codigo-container').style.display = 'block';
  erroElement.style.display = 'none';
}

function mostrarErro(mensagem) {
  const erro = document.getElementById('erro-codigo');
  erro.textContent = mensagem;
  erro.style.display = 'block';
  setTimeout(() => {
    erro.style.display = 'none';
  }, 3000);
}

document.querySelector('.botao-principal').onclick = () => {
  abrirModal();
};

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

function mostrarCadastro() {
  document.getElementById('form-cadastro').style.display = 'flex';
  document.getElementById('form-login').style.display = 'none';
  document.getElementById('form-recuperar').style.display = 'none';
}

function mostrarLogin() {
  document.getElementById('form-cadastro').style.display = 'none';
  document.getElementById('form-login').style.display = 'flex';
  document.getElementById('form-recuperar').style.display = 'none';
}

function mostrarRecuperar() {
  document.getElementById('form-cadastro').style.display = 'none';
  document.getElementById('form-login').style.display = 'none';
  document.getElementById('form-recuperar').style.display = 'flex';
}

function mostrarRecuperacao() {
  document.getElementById('reset-container').style.display = 'block';
  document.getElementById('novo-usuario').style.display = 'none';
  document.getElementById('nova-senha').style.display = 'none';
  document.getElementById('novo-email').style.display = 'none';
  document.getElementById('recuperacao-container').style.display = 'none';
  document.querySelector('.botao-principal').style.display = 'none';
  document.getElementById('alternar-login').style.display = 'none';
}








window.onload = () => {
  const logado = localStorage.getItem('logado');
  const botao = document.querySelector('.botao-principal');

  if (logado && botao) {
    botao.innerHTML = `<span>${logado}</span>`;
    botao.onclick = () => {
      alert(`Você já está logado como ${logado}`);
    };
  }
};
