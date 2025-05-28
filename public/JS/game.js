const story = document.getElementById("story");
const choices = document.getElementById("choices");
const ending = document.getElementById("ending");

let etapa = "inicio";

const finais = {
  final1: "🏁 Final 1: Missão Cumprida - Você repara a nave e chega ao planeta habitável.",
  final2: "💀 Final 2: Missão Fracassada - A nave é perdida e você perece.",
  final3: "👽 Final 3: Civilização Alienígena - Você é acolhido por alienígenas avançados.",
  final4: "🚀 Final 4: Sobrevivente Solitário - Você foge e sobrevive, mas trai tudo.",
  final5: "🧬 Final 5: Sacrifício Heróico - Você morre salvando a missão."
};

function escreverTextoGradualmente(texto, callback) {
  story.textContent = "";
  ending.textContent = "";
  choices.innerHTML = "";
  let i = 0;
  const intervalo = setInterval(() => {
    story.textContent += texto.charAt(i);
    i++;
    if (i >= texto.length) {
      clearInterval(intervalo);
      setTimeout(callback, 500);
    }
  }, 25);
}

function mostrarOpcoes(opcoes) {
  choices.innerHTML = "";
  ending.textContent = "";

  opcoes.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op.texto;
    btn.type = "button";
    btn.onclick = () => {
      etapa = op.proxima;
      executarEtapa();
    };
    choices.appendChild(btn);
  });
}

function executarEtapa() {
  switch (etapa) {
    case "inicio":
      escreverTextoGradualmente("🌌 Você acorda sozinho após uma falha na hibernação. A nave está silenciosa... o que fazer agora?", () => {
        mostrarOpcoes([
          { texto: "Verificar sistemas da nave", proxima: "2a" },
          { texto: "Procurar por outros tripulantes", proxima: "2b" },
          { texto: "Mandar sinal para Terra ou responder sinal", proxima: "2c" }
        ]);
      });
      break;

    case "2a":
      escreverTextoGradualmente("Você se dirige ao painel de comando. Os sistemas estão falhando em cascata...", () => {
        mostrarOpcoes([
          { texto: "Tentar consertar sozinho", proxima: "3a_sucesso" },
          { texto: "Pedir ajuda por rádio", proxima: "3b" }
        ]);
      });
      break;

    case "2b":
      escreverTextoGradualmente("Você caminha pelos corredores vazios da nave. Ecos... corpos em criogenia silenciosa.", () => {
        mostrarOpcoes([
          { texto: "Acordar um tripulante instável", proxima: "3c_colabora" },
          { texto: "Ignorar e continuar sozinho", proxima: "3a_sucesso" }
        ]);
      });
      break;

    case "2c":
      escreverTextoGradualmente("Você detecta um sinal alienígena desconhecido, pulsando nos monitores.", () => {
        mostrarOpcoes([
          { texto: "Responder", proxima: "3d_sim" },
          { texto: "Ignorar", proxima: "3a_sucesso" }
        ]);
      });
      break;

    case "3a_sucesso":
      escreverTextoGradualmente("Você abre o painel de manutenção e começa a trabalhar com as ferramentas da nave.", () => {
        mostrarOpcoes([
          { texto: "Sucesso", proxima: "final1" },
          { texto: "Fracasso", proxima: "final2" }
        ]);
      });
      break;

    case "3b":
      escreverTextoGradualmente("Você envia um sinal de socorro... mas sabe que pode ter revelado sua posição.", () => {
        mostrarOpcoes([
          { texto: "Alienígenas chegam", proxima: "4a" },
          { texto: "Ninguém responde", proxima: "final2" }
        ]);
      });
      break;

    case "3c_colabora":
      escreverTextoGradualmente("O tripulante acorda confuso.\n\n— ...hnng... onde estou? A missão... você é... humano?\n— Ok... eu lembro do protocolo de emergência. Me passa o estado dos sistemas.\n— Não vamos deixar que essa missão morra no silêncio do espaço.", () => {
        mostrarOpcoes([
          { texto: "Se sacrificar para salvar tudo", proxima: "final5" },
          { texto: "Fugir sozinho", proxima: "final4" },
          { texto: "Consertar juntos", proxima: "final1" }
        ]);
      });
      break;

    case "3d_sim":
      escreverTextoGradualmente("Uma transmissão chega... seres desconhecidos oferecem ajuda.\n\n(voz sintetizada) — Entidade consciente identificada. Medo detectado. Comunicação iniciada.", () => {
        mostrarOpcoes([
          { texto: "Sim", proxima: "final3" },
          { texto: "Não", proxima: "3a_sucesso" }
        ]);
      });
      break;

    case "4a":
      escreverTextoGradualmente("A nave estremece. Uma forma gigantesca se aproxima do casco... são eles.\n\n— Você busca ajuda. Nós observamos. Sua espécie ainda sonha. Isso é... raro.\n— Você escolheu confiar. Não terá respostas — apenas revelações.", () => {
        mostrarOpcoes([
          { texto: "Ir com eles", proxima: "final3" },
          { texto: "Lutar", proxima: "final2" },
          { texto: "Fugir sozinho", proxima: "final4" }
        ]);
      });
      break;

    case "final1":
    case "final2":
    case "final3":
    case "final4":
    case "final5":
      escreverTextoGradualmente("Fim da jornada.", () => {
        ending.innerHTML = `<strong>${finais[etapa]}</strong>`;
      });
      break;
  }
}