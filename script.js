let modo = 'cadastro'; // pode ser 'cadastro' ou 'login'

function alternarModo() {
  modo = modo === 'cadastro' ? 'login' : 'cadastro';
  atualizarModal();
}

function atualizarModal() {
  const titulo = document.getElementById('modal-title');
  const inputNome = document.getElementById('novo-usuario');
  const botaoTexto = document.getElementById('botao-texto');
  const linkTexto = document.getElementById('alternar-login');

  if (modo === 'login') {
    titulo.innerText = 'Fazer login';
    inputNome.style.display = 'none';
    botaoTexto.innerText = 'Entrar';
    linkTexto.innerText = 'Não possui uma conta? Criar agora';
  } else {
    titulo.innerText = 'Fazer cadastro';
    inputNome.style.display = 'block';
    botaoTexto.innerText = 'Continuar';
    linkTexto.innerText = 'Já possui uma conta? Fazer login';
  }
}

function fazerCadastroOuLogin() {
  const nome = document.getElementById('novo-usuario').value;
  const email = document.getElementById('novo-email').value;
  const senha = document.getElementById('nova-senha').value;

  if (!email || !senha || (modo === 'cadastro' && !nome)) {
    alert("Preencha todos os campos!");
    return;
  }

  if (modo === 'cadastro') {
    // Validação simples de senha
    if (senha.length < 6 || !/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
      alert("A senha deve ter pelo menos 6 caracteres e um símbolo.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    if (usuarios.some(u => u.email === email)) {
      alert("E-mail já cadastrado.");
      return;
    }

    usuarios.push({ nome, email, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    localStorage.setItem('logado', nome);
    alert("Cadastro feito com sucesso!");
    fecharModal();
    location.reload();
  } else {
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      alert("E-mail ou senha incorretos.");
      return;
    }

    localStorage.setItem('logado', usuario.nome);
    alert("Login feito com sucesso!");
    fecharModal();
    location.reload();
  }
}
