const nomeInput = document.getElementById('nome');
const idadeInput = document.getElementById('idade');
const cpfInput = document.getElementById('cpf');
const cnpjInput = document.getElementById('cnpj');
const emailInput = document.getElementById('email');
const generoSelect = document.getElementById('genero');
const fotoInput = document.getElementById('foto');

function salvar() {
    const pessoa = {
        id: geraIdUnico(), // Adicionando um ID único
        nome: nomeInput.value,
        idade: idadeInput.value,
        cpf: cpfInput.value,
        cnpj: cnpjInput.value,
        email: emailInput.value,
        genero: generoSelect.value,
        foto: fotoInput.value
    };
    
    const pessoasCadastradas = pegaPessoasCadastradas();
    pessoasCadastradas.push(pessoa);
    localStorage.setItem('pessoasCadastro', JSON.stringify(pessoasCadastradas));
    
    limparCampos(); // Limpa os campos após o cadastro
    
    return false; // para evitar o envio do formulário
}

function pegaPessoasCadastradas() {
    let pessoasLocalStorage = JSON.parse(localStorage.getItem("pessoasCadastro"));
    if (!pessoasLocalStorage) {
        pessoasLocalStorage = [];
    }
    return pessoasLocalStorage;
}

// Função para gerar um ID único
function geraIdUnico() {
    let id = localStorage.getItem('ultimoId') || '0';
    id = parseInt(id) + 1;
    localStorage.setItem('ultimoId', id);
    return id.toString();
}

// Função para limpar os campos
function limparCampos() {
    nomeInput.value = '';
    idadeInput.value = '';
    cpfInput.value = '';
    cnpjInput.value = '';
    emailInput.value = '';
    generoSelect.value = '';
    fotoInput.value = '';
}
