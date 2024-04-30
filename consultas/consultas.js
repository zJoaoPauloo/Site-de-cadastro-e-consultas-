const tabelaCadastro = document.getElementById('tabelaCadastro');
const pessoas = pegaPessoasCadastradas();

for (const pessoa of pessoas) {
    mostraPessoa(pessoa);
}

function pegaPessoasCadastradas() {
    let pessoasLocalStorage = JSON.parse(localStorage.getItem("pessoasCadastro"));
    if (!pessoasLocalStorage) {
        pessoasLocalStorage = [];
    }
    return pessoasLocalStorage;
}

function mostraPessoa(pessoa) {
    const paragrafo = document.createElement('p');
    paragrafo.innerHTML += `
        <span>ID: ${pessoa.id}</span>
        <span>Nome: ${pessoa.nome}</span>
        <span>Idade: ${pessoa.idade}</span>
        <span>CPF: ${pessoa.cpf}</span>
        <span>CNPJ: ${pessoa.cnpj}</span>
        <span>E-mail: ${pessoa.email}</span>
        <span>Gênero: ${pessoa.genero}</span>
        <img src="${pessoa.foto}" alt="Foto de perfil">
        <button onclick="editarUsuario(${pessoa.id})">Editar</button>
        <button onclick="excluirUsuario(this)">Excluir</button>
        <br><br>
    `;
    tabelaCadastro.appendChild(paragrafo);
}

function editarUsuario(id) {
    window.location.href = `../editar/editarUsuario.html?id=${id}`;
}

function excluirUsuario(botaoExcluir) {
    const confirmacao = confirm("Tem certeza que deseja excluir este usuário?");
    if (confirmacao) {
        const linhaUsuario = botaoExcluir.parentNode;
        const idUsuario = linhaUsuario.querySelector('span').innerText.split(': ')[1]; // Obter o ID do usuário
        linhaUsuario.remove();

        // Aqui você pode adicionar a lógica para excluir o usuário do localStorage
        let pessoasLocalStorage = JSON.parse(localStorage.getItem("pessoasCadastro"));
        const index = pessoasLocalStorage.findIndex(pessoa => pessoa.id == idUsuario); // Encontrar o índice do usuário no array
        if (index !== -1) {
            pessoasLocalStorage.splice(index, 1); // Remover o usuário do array
            localStorage.setItem("pessoasCadastro", JSON.stringify(pessoasLocalStorage)); // Atualizar o localStorage
        }

        alert("Usuário excluído com sucesso!");
    } else {
        alert("Operação de exclusão cancelada.");
    }
}
