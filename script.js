const form = document.getElementById('clientForm');
const clientIdInput = document.getElementById('clientId');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const formMessage = document.getElementById('formMessage');
const clientsBody = document.getElementById('clientsBody');
const emptyState = document.getElementById('emptyState');
const clientsCount = document.getElementById('clientsCount');
const detailsPanel = document.getElementById('detailsPanel');
const detailsContent = document.getElementById('detailsContent');

let clients = JSON.parse(localStorage.getItem('clients')) || [];
let editingId = null;

function saveClients() {
    localStorage.setItem('clients', JSON.stringify(clients));
}

function resetForm() {
    form.reset();
    clientIdInput.value = '';
    editingId = null;
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    cancelEditBtn.classList.add('hidden');
    document.querySelector('.btn-submit').textContent = 'Finalizar Cadastro';
}

function renderClients() {
    clientsBody.innerHTML = '';
    clientsCount.textContent = `${clients.length} cliente${clients.length === 1 ? '' : 's'}`;

    if (!clients.length) {
        emptyState.classList.remove('hidden');
        return;
    }

    emptyState.classList.add('hidden');

    clients.forEach((client) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${client.fullname}</td>
            <td>${client.email}</td>
            <td>${client.cpf}</td>
            <td>
                <div class="actions">
                    <button type="button" class="action-btn view" data-action="view" data-id="${client.id}">Visualizar</button>
                    <button type="button" class="action-btn edit" data-action="edit" data-id="${client.id}">Editar</button>
                    <button type="button" class="action-btn delete" data-action="delete" data-id="${client.id}">Excluir</button>
                </div>
            </td>
        `;
        clientsBody.appendChild(row);
    });
}

function showClientDetails(client) {
    detailsContent.innerHTML = `
        <p><strong>Nome:</strong> ${client.fullname}</p>
        <p><strong>E-mail:</strong> ${client.email}</p>
        <p><strong>Telefone:</strong> ${client.phone || 'Não informado'}</p>
        <p><strong>CPF:</strong> ${client.cpf}</p>
    `;
    detailsPanel.classList.remove('hidden');
}

function fillForm(client) {
    editingId = client.id;
    clientIdInput.value = client.id;
    document.getElementById('fullname').value = client.fullname;
    document.getElementById('email').value = client.email;
    document.getElementById('phone').value = client.phone;
    document.getElementById('cpf').value = client.cpf;
    document.querySelector('.btn-submit').textContent = 'Salvar Alterações';
    cancelEditBtn.classList.remove('hidden');
    formMessage.textContent = 'Edite os dados e salve as alterações.';
    formMessage.className = 'form-message';
    document.getElementById('fullname').focus();
}

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const cpf = document.getElementById('cpf').value.trim();

    if (!fullname || !email || !cpf) {
        formMessage.textContent = 'Preencha nome, e-mail e CPF para continuar.';
        formMessage.className = 'form-message error';
        return;
    }

    const clientData = {
        id: editingId || `client-${Date.now()}`,
        fullname,
        email,
        phone: document.getElementById('phone').value.trim(),
        cpf
    };

    if (editingId) {
        clients = clients.map((client) => client.id === editingId ? clientData : client);
        formMessage.textContent = 'Cliente atualizado com sucesso!';
    } else {
        clients.unshift(clientData);
        formMessage.textContent = 'Cliente cadastrado com sucesso!';
    }

    saveClients();
    renderClients();
    resetForm();
});

cancelEditBtn.addEventListener('click', function () {
    resetForm();
    formMessage.textContent = 'Edição cancelada.';
    formMessage.className = 'form-message';
});

clientsBody.addEventListener('click', function (event) {
    const button = event.target.closest('button[data-action]');

    if (!button) {
        return;
    }

    const action = button.dataset.action;
    const clientId = button.dataset.id;
    const client = clients.find((item) => item.id === clientId);

    if (!client) {
        return;
    }

    if (action === 'view') {
        showClientDetails(client);
    }

    if (action === 'edit') {
        fillForm(client);
    }

    if (action === 'delete') {
        const shouldDelete = window.confirm(`Deseja excluir o cliente ${client.fullname}?`);
        if (shouldDelete) {
            clients = clients.filter((item) => item.id !== clientId);
            saveClients();
            renderClients();
            detailsPanel.classList.add('hidden');
            formMessage.textContent = 'Cliente excluído com sucesso.';
            formMessage.className = 'form-message';
        }
    }
});

renderClients();