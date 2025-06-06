const container = document.getElementById('container');
document.getElementById('signUp').addEventListener('click', () => {
    container.classList.add('right-panel-active');
});
document.getElementById('signIn').addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

if (window.location.hash === "#login") {
    document.getElementById('signIn').click();
}

function cadastrar() {
    const nome = document.querySelector('input[name="nome"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const senha = document.querySelector('input[name="senha"]').value;

    fetch("http://localhost:3333/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome, email, senha })
    })
        .then(res => {
            if (res.ok) {
                alert("Cadastro realizado com sucesso!");
                window.location.href = "index.html";
            } else {
                alert("Erro no cadastro");
            }
        });
}

function login() {
    const email = document.querySelector('.sign-in-container input[name="email"]').value;
    const senha = document.querySelector('.sign-in-container input[name="senha"]').value;

    fetch("http://localhost:3333/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, senha })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error("Email e/ou senha inválidos");
            }
        })
        .then(data => {
            sessionStorage.ID_USUARIO = data.id;
            sessionStorage.NOME_USUARIO = data.nome;
            sessionStorage.EMAIL_USUARIO = data.email;

            alert(`Bem-vindo, ${data.nome}!`);
            window.location.href = "game.html";
        })

        .catch(erro => {
            alert(erro.message);
        });
}