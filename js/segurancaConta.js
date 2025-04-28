document.addEventListener('DOMContentLoaded', function() {
    const clienteId = localStorage.getItem('usuario');
    
    if (!clienteId) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        alterarSenha(clienteId);
    });
});

function alterarSenha(id) {
    const senhaAtual = document.getElementById('senha-atual').value;
    const novaSenha = document.getElementById('nova-senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;
    
    if (!senhaAtual || !novaSenha || !confirmarSenha) {
        exibirMensagem('Por favor, preencha todos os campos.', 'error');
        return;
    }
    
    if (novaSenha !== confirmarSenha) {
        exibirMensagem('A nova senha e a confirmação de senha não coincidem.', 'error');
        return;
    }
    
    fetch(`http://localhost:8081/cliente/${id}/alterar-senha`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            senhaAtual: senhaAtual,
            novaSenha: novaSenha
        })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text || 'Erro ao alterar senha');
            });
        }
        return response.text();
    })
    .then(data => {
        exibirMensagem('Senha alterada com sucesso!', 'success');
        document.getElementById('senha-atual').value = '';
        document.getElementById('nova-senha').value = '';
        document.getElementById('confirmar-senha').value = '';
    })
    .catch(error => {
        console.error('Erro ao alterar senha:', error);
        
        if (error.message.includes('Senha atual incorreta')) {
            exibirMensagem('Senha atual incorreta.', 'error');
        } else {
            exibirMensagem('Erro ao alterar senha. Por favor, tente novamente.', 'error');
        }
    });
}

function exibirMensagem(texto, tipo) {
    let mensagemExistente = document.querySelector('.mensagem-feedback');
    if (mensagemExistente) {
        mensagemExistente.remove();
    }
    
    const mensagem = document.createElement('div');
    mensagem.classList.add('mensagem-feedback', tipo);
    mensagem.textContent = texto;
    
    const form = document.querySelector('form');
    form.parentNode.insertBefore(mensagem, form);
    
    setTimeout(() => {
        mensagem.remove();
    }, 3000);
}