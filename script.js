const baseURL = 'http://localhost:3000';

const cadastroForm = document.querySelector(".cadastro-form");
const inputNome = document.querySelector(".input_nome");

//Não funciona ainda:
async function validarCadastro(event) {
    event.preventDefault(); 

    const nome = titularInput.value.trim();
    const funcao = funcao.value.trim
    const senha = senhaCadastroInput.value.trim(); 

    if (nome === "" || funcao === "" || senha === "") {
        alert("Por favor, preencha todos os campos do cadastro, incluindo a senha!");
        return; 
    }
  
    try {
        
        const response = await fetch(`${BASE_URL}/Conta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titular: nome, 
                numero: numero, 
                saldo: saldo, 
                senha: senha, 
                historico: []
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar a conta no servidor.");
        }

        alert("Conta criada com sucesso! Agora faça o login.");
        cadastroForm.reset(); 

    } catch (error) {
        alert(error.message);
    }
}
