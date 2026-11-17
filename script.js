

//Não funciona ainda:
function validarCadastro(event) {
    event.preventDefault(); 

    const nome = titularInput.value.trim();
    const tipo_usuario = numeroContaInput.value.trim();
    const senha = senhaCadastroInput.value.trim(); 

   
    if (nome === "" || numero === "" || senha === "") {
        alert("Por favor, preencha todos os campos do cadastro, incluindo a senha!");
        return; 
    }

    const contaExistente = listaContas.find(c => c.numero === numero);
    if (contaExistente) {
        alert("Esta conta já está cadastrada!");
        return;
    }

    
    listaContas.push({ nome: nome, nome_usuario: nome_usuario, senha: senha});
    alert("Conta criada com sucesso! Agora faça o login.");
    
    cadastroForm.reset(); 
}