const baseURL = 'http://localhost:3000';

// Seleciona as caixas (telas) de login e cadastro
const boxLogin = document.querySelector(".box-login");
const boxCadastro = document.querySelector(".box-cadastro");

// Seleciona o formulário de cadastro e os campos
const cadastroForm = document.querySelector("#cadastro-form");
const inputNome = cadastroForm.querySelector(".input_nome");
const inputSenha = cadastroForm.querySelector('input[name="senha"]');

async function validarCadastro(event) {
    event.preventDefault();

    const usuario = inputNome.value.trim();
    const senha = inputSenha.value.trim();
    const perfilSelecionado = cadastroForm.querySelector('input[name="perfil"]:checked');
    const funcao = perfilSelecionado ? perfilSelecionado.value : "";

    if (usuario === "" || funcao === "" || senha === "") {
        alert("Por favor, preencha todos os campos do cadastro!");
        return;
    }

    try {
        // 1. Verifica se o usuário já existe
        const buscaUsuario = await fetch(`${baseURL}/usuarios?usuario=${encodeURIComponent(usuario)}`);
        const usuariosExistentes = await buscaUsuario.json();

        if (usuariosExistentes.length > 0) {
            alert("Esse nome de usuário já está cadastrado! Escolha outro.");
            return;
        }

        // 2. Cadastra no db.json
        const response = await fetch(`${baseURL}/usuarios`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario: usuario,
                senha: senha,
                funcao: funcao
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao cadastrar no servidor.");
        }

        // 3. Tudo deu certo! Mostra o aviso, limpa o formulário e troca as telas:
        alert("Conta criada com sucesso! Agora faça o login.");
        cadastroForm.reset();

        boxCadastro.classList.add("escondido"); // Esconde a tela de cadastro
        boxLogin.classList.remove("escondido"); // Mostra a tela de login

    } catch (error) {
        console.error(error);
        alert("Erro: " + error.message);
    }
}

cadastroForm.addEventListener("submit", validarCadastro);

const loginForm = document.querySelector("#login-form");

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const inputUsuario = loginForm.querySelector("input[name='usuario']");
        const inputSenha = loginForm.querySelector("input[name='senha']");

        const usuarioDigitado = inputUsuario ? inputUsuario.value.trim() : "";
        const senhaDigitada = inputSenha ? inputSenha.value.trim() : "";

        if (!usuarioDigitado || !senhaDigitada) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            // Busca todos os usuários cadastrados no JSON Server
            const resposta = await fetch("http://localhost:3000/usuarios");
            const usuarios = await resposta.json();

            // Procura se existe algum usuário com o mesmo nome e senha
            const usuarioEncontrado = usuarios.find(
                (u) => u.usuario === usuarioDigitado && u.senha === senhaDigitada
            );

            if (usuarioEncontrado) {
                alert(`Bem-vindo de volta, ${usuarioEncontrado.usuario}! (${usuarioEncontrado.funcao})`);
                window.location.href = "painel.html";
                // Aqui você pode redirecionar para a página principal do sistema
                // window.location.href = "painel.html"; 
            } else {
                alert("Usuário ou senha incorretos!");
            }
        } catch (erro) {
            console.error("Erro ao tentar fazer login:", erro);
            alert("Não foi possível conectar ao servidor.");
        }
    });
}

const linkCadastro = document.querySelector("#link-cadastro");
const linkLogin = document.querySelector("#link-login");

// Quando clicar em "Cadastre-se"
if (linkCadastro) {
    linkCadastro.addEventListener("click", (event) => {

        boxLogin.classList.add("escondido");
        boxCadastro.classList.remove("escondido");
    });
}

// Quando clicar em "Fazer Login" (para voltar)
if (linkLogin) {
    linkLogin.addEventListener("click", (event) => {
      
        boxCadastro.classList.add("escondido");
        boxLogin.classList.remove("escondido");
    });
}