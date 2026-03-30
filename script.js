// 1. Seleciona o formulário no HTML
const form = document.getElementById('clientForm');

// 2. Escuta o evento de "submit" (quando o usuário clica no botão)
form.addEventListener('submit', function(event) {
    // Impede a página de recarregar (comportamento padrão do form)
    event.preventDefault();

    // 3. Captura os dados dos campos
    const nome = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;

    // 4. Exibe uma mensagem de sucesso (ou você poderia enviar para uma API aqui)
    if (nome && email && cpf) {
        alert(`Sucesso! 🎉\n\nCliente: ${nome}\nE-mail: ${email}\nCadastro realizado com sucesso.`);
        
        // Limpa o formulário após o cadastro
        form.reset();
    } else {
        alert("Por favor, preencha todos os campos obrigatórios.");
    }
});

/* DICA PARA PORTFÓLIO: 
   Você pode adicionar uma máscara de CPF aqui futuramente 
   usando bibliotecas como 'IMask' ou Vanilla JS puro.
*/