window.onload = function() {
    const form = document.getElementById('editarUsuarioForm');
    const userIdInput = document.getElementById('userId');
    const userId = obterIdUsuarioDaUrl(); // Obter o ID do usuário da URL
    const pessoa = getPessoaById(userId); // Obter os dados do usuário pelo ID

    // Preencher o formulário com os dados do usuário
    preencherFormulario(pessoa);

    // Adicionar evento de submissão do formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede a submissão automática do formulário
        salvarAlteracoes(); // Chama a função para salvar as alterações
    });

    // Função para obter o ID do usuário da URL
    function obterIdUsuarioDaUrl() {
        const params = new URLSearchParams(window.location.search);
        return parseInt(params.get('id'));
    }

    // Função para buscar uma pessoa pelo ID
    function getPessoaById(id) {
        const pessoas = pegaPessoasCadastradas();
        return pessoas.find(pessoa => pessoa.id == id);
    }

    // Função para preencher os campos do formulário com os dados da pessoa
    function preencherFormulario(pessoa) {
        if (pessoa) {
            userIdInput.value = pessoa.id;
            document.getElementById('nome').value = pessoa.nome;
            document.getElementById('idade').value = pessoa.idade;
            document.getElementById('cpf').value = pessoa.cpf;
            document.getElementById('cnpj').value = pessoa.cnpj;
            document.getElementById('email').value = pessoa.email;
            document.getElementById('genero').value = pessoa.genero;
            document.getElementById('foto').value = pessoa.foto;
        } else {
            alert("Usuário não encontrado!");
        }
    }

    // Função para salvar as alterações no usuário
    function salvarAlteracoes() {
        const id = parseInt(userIdInput.value); // Obter o ID do usuário
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        const cpf = document.getElementById('cpf').value;
        const cnpj = document.getElementById('cnpj').value;
        const email = document.getElementById('email').value;
        const genero = document.getElementById('genero').value;
        const foto = document.getElementById('foto').value;

        let pessoasLocalStorage = pegaPessoasCadastradas();

        // Encontre o índice do usuário com o ID correspondente
        const index = pessoasLocalStorage.findIndex(pessoa => pessoa.id == id);
        if (index !== -1) {
            // Atualize as informações do usuário no array
            pessoasLocalStorage[index] = {
                id: id,
                nome: nome,
                idade: idade,
                cpf: cpf,
                cnpj: cnpj,
                email: email,
                genero: genero,
                foto: foto
            };

            // Atualize o localStorage com o array atualizado
            localStorage.setItem('pessoasCadastro', JSON.stringify(pessoasLocalStorage));

            // Informe ao usuário que as alterações foram salvas com sucesso
            alert("Alterações salvas com sucesso!");

            // Redirecionar o usuário de volta para a página de consulta após salvar as alterações
            redirecionarParaConsulta();
        } else {
            // Se o usuário não foi encontrado, exiba uma mensagem de erro
            alert("Usuário não encontrado!");
        }
    }

   // Função para redirecionar o usuário de volta para a página de consulta após salvar as alterações
   function redirecionarParaConsulta() {
    window.location.href = "../consultas/consultaUsuarios.html";
}


    // Função auxiliar para obter as pessoas cadastradas
    function pegaPessoasCadastradas() {
        let pessoasLocalStorage = JSON.parse(localStorage.getItem("pessoasCadastro"));
        if (!pessoasLocalStorage) {
            pessoasLocalStorage = [];
        }
        return pessoasLocalStorage;
    }
};
