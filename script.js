function enviarCodigoRecuperacao() {
    const email = document.getElementById('novo-email').value;
    
    fetch('/enviar-codigo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Código enviado para seu email!');
        } else {
            alert('Erro ao enviar código. Verifique seu email.');
        }
    });
}
