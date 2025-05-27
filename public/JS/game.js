const backstoryText = `🌌 Ano 2187. A Terra está à beira do colapso ambiental. A última esperança da humanidade está nas estrelas.

Após décadas de pesquisa e guerras geopolíticas, a missão Éden 7 foi lançada rumo a um planeta recém-descoberto, Epsilon Prime, localizado a 42 anos-luz da Terra.

A bordo da nave Aurora, os melhores cientistas, engenheiros e exploradores da humanidade foram colocados em hibernação profunda, enquanto a inteligência artificial da nave mantinha o curso.

A jornada deveria durar décadas...

Mas algo deu errado.

Um erro de sistema interrompe sua hibernação prematuramente.
Você acorda desorientado, sozinho...

E agora, a sobrevivência da missão — e da própria humanidade — pode depender apenas de você.\n`;

const backstoryElement = document.getElementById("backstory");
const gameElement = document.getElementById("game");

let index = 0;

function typeBackstory() {
    if (index < backstoryText.length) {
        backstoryElement.innerHTML += backstoryText.charAt(index);
        index++;
        setTimeout(typeBackstory, 40); // velocidade da digitação
    } else {
        setTimeout(() => {
            gameElement.style.display = "block";
            window.scrollTo(0, document.body.scrollHeight);
        }, 1000);
    }
}

function choose(option) {
    alert("Você escolheu: " + option + "\n(continuação do jogo ainda será implementada)");
    // Aqui você pode carregar a próxima parte da história ou lógica do jogo
}

window.onload = typeBackstory;