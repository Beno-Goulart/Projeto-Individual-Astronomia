var historia = document.getElementById("historia");
var escolha = document.getElementById("escolha");
var final = document.getElementById("final");

var etapa = "inicio";

var finais = {
  final1: "Missão Cumprida - Você repara a nave e chega ao planeta habitável.",
  final2: "Missão Fracassada - A nave é perdida e você perece.",
  final3: "Civilização Alienígena - Você é acolhido por alienígenas avançados.",
  final4: "Sobrevivente Solitário - Você foge e sobrevive, mas trai tudo.",
  final5: "Sacrifício Heróico - Você morre salvando a missão."
};

var usuario_id = 1;
var escolhas = [];
var ordem = 1;
var proximaEscolha = "";
var textoOpcao = "";
var opcoesAtuais = [];

var perfil = {
  cauteloso: 0,
  impulsivo: 0,
  analitico: 0,
  emocional: 0,
  explorador: 0
};

function registrarEscolha() {
  escolhas.push({
    decisao_id: proximaEscolha,
    ordem_etapa: ordem
  });
  ordem++;
}

function pontuarPerfil() {
  var mapaDePerfil = {
    "2a": { cauteloso: 2, analitico: 2 },
    "2b": { cauteloso: 1, emocional: 2, explorador: 1 },
    "2c": { impulsivo: 1, emocional: 1, explorador: 2 },
    "3a_sucesso": { cauteloso: 3, impulsivo: 1, analitico: 2 },
    "3b": { cauteloso: 1, analitico: 1, emocional: 2 },
    "3c_colabora": { cauteloso: 1, emocional: 3, explorador: 1 },
    "3d_sim": { impulsivo: 2, emocional: 2, explorador: 3 },
    "4a": { explorador: 3, emocional: 1, impulsivo: 1 },
    "final1": { cauteloso: 3, analitico: 2 },
    "final5": { cauteloso: 1, impulsivo: 3, analitico: 1 },
    "final4": { impulsivo: 2, emocional: 1, explorador: 2 }
  };

  var pontos = mapaDePerfil[proximaEscolha];
  if (pontos) {
    var {
      cauteloso = 0,
      impulsivo = 0,
      analitico = 0,
      emocional = 0,
      explorador = 0
    } = pontos;

    perfil.cauteloso += cauteloso;
    perfil.impulsivo += impulsivo;
    perfil.analitico += analitico;
    perfil.emocional += emocional;
    perfil.explorador += explorador;
  }
}

function exibirTexto() {
  historia.textContent = textoOpcao;
  final.textContent = "";
  escolha.innerHTML = "";
}

function mostrarOpcoes() {
  final.textContent = "";
  var html = "";
  for (var i = 0; i < opcoesAtuais.length; i++) {
    var op = opcoesAtuais[i];
    html += `<button onclick="escolherOpcao('${op.proxima}')">${op.texto}</button>`;
  }
  escolha.innerHTML = html;
}

function escolherOpcao(etapaEscolhida) {
  proximaEscolha = etapaEscolhida;
  registrarEscolha();
  pontuarPerfil();
  etapa = etapaEscolhida;
  executarEtapa();
}

function salvarSessao() {
  const usuario_id = sessionStorage.ID_USUARIO;

  if (!usuario_id) {
    alert("Usuário não identificado. Faça login novamente.");
    window.location.href = "index.html";
    return;
  }

  const dadosSessao = {
    usuario_id: Number(usuario_id),
    final_id: Number(etapa.replace("final", "")),
    escolhas: escolhas,
    perfil: perfil
  };

  console.log("Enviando dados da sessão:", dadosSessao);

  fetch("http://localhost:3333/sessoesJogo/salvar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dadosSessao)
  })

    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Erro ao salvar sessão");
      }
    })
    .then(data => {
      console.log("Sessão salva no banco com sucesso:", data);
    })
    .catch(erro => {
      console.error("Erro ao salvar sessão:", erro);
    });
}


function executarEtapa() {
  switch (etapa) {
    case "inicio":
      textoOpcao = "Você acorda sozinho após uma falha na hibernação. A nave está silenciosa... o que fazer agora?";
      exibirTexto();
      opcoesAtuais = [
        { texto: "Verificar sistemas da nave", proxima: "2a" },
        { texto: "Procurar por outros tripulantes", proxima: "2b" },
        { texto: "Mandar sinal para Terra", proxima: "2c" }
      ];
      mostrarOpcoes();
      break;

    case "2a":
      textoOpcao = "Você se dirige ao painel de comando. Os sistemas estão falhando em cascata...";
      exibirTexto();
      opcoesAtuais = [
        { texto: "Tentar consertar sozinho", proxima: "3a_sucesso" },
        { texto: "Pedir ajuda por rádio", proxima: "3b" }
      ];
      mostrarOpcoes();
      break;

    case "2b":
      textoOpcao = "Você caminha pelos corredores vazios da nave. Ecos... corpos em criogenia silenciosa.";
      exibirTexto();
      opcoesAtuais = [
        { texto: "Acordar um tripulante", proxima: "3c_colabora" },
        { texto: "Ignorar e continuar sozinho", proxima: "3a_sucesso" }
      ];
      mostrarOpcoes();
      break;

    case "2c":
      textoOpcao = "Ao invés de mandar você detecta um sinal desconhecido, pulsando nos monitores.";
      exibirTexto();
      opcoesAtuais = [
        { texto: "Responder", proxima: "3d_sim" },
        { texto: "Ignorar", proxima: "3a_sucesso" }
      ];
      mostrarOpcoes();
      break;

    case "3a_sucesso":
      textoOpcao = "Você trabalha incansavelmente nos sistemas. As luzes piscam, alarmes disparam... o tempo está se esgotando.";
      exibirTexto();
      setTimeout(() => {
        var sucesso = Math.random() < 0.75;
        if (sucesso) {
          textoOpcao = "Com um estalo final, os sistemas voltam a funcionar! Sua missão está salva!";
          etapa = "final1";
        } else {
          textoOpcao = "Uma faísca... um curto-circuito... tudo apaga. A nave está perdida.";
          etapa = "final2";
        }
        executarEtapa();
      }, 4000);
      break;

    case "3b":
      textoOpcao = "Você envia um sinal de socorro... e aguarda na esperança. Mas sabe que isso pode ter revelado sua posição.";
      exibirTexto();
      setTimeout(() => {
        var ajudaChega = Math.random() < 0.75;
        if (ajudaChega) {
          textoOpcao = "Uma nave desconhecida se aproxima... não é humana. São alienígenas respondendo ao seu sinal.";
          etapa = "4a";
        } else {
          textoOpcao = "Você espera... mas ninguém responde. O silêncio é absoluto.";
          etapa = "final2";
        }
        executarEtapa();
      }, 4000);
      break;

    case "3c_colabora":
      textoOpcao = "O tripulante acorda confuso.\n\n— ...hnng... onde estou? A missão... você é... humano?\n— Ok... lembro do protocolo de emergência. Me passa o estado dos sistemas.\n— Temos pouco tempo. Precisamos decidir rápido.";
      exibirTexto();
      opcoesAtuais = [
        { texto: "Redirecionar energia dos sistemas auxiliares", proxima: "final1" },
        { texto: "Acessar manualmente o núcleo do reator (arriscado)", proxima: "final5" }
      ];
      mostrarOpcoes();
      break;

    case "3d_sim":
      textoOpcao = "Uma transmissão chega... seres desconhecidos oferecem ajuda.\n\n(voz sintetizada) — Entidade consciente identificada. Medo detectado. Comunicação iniciada.";
      exibirTexto();
      opcoesAtuais = [
        { texto: "Aceitar ajuda", proxima: "final3" },
        { texto: "Recusar e tentar consertar sozinho", proxima: "3a_sucesso" }
      ];
      mostrarOpcoes();
      break;

    case "4a":
      textoOpcao = "A nave estremece. Uma forma gigantesca se aproxima do casco... são eles.\n\n— Você busca ajuda. Nós observamos. Sua espécie ainda sonha. Isso é... raro.\n— Você escolheu confiar. Não terá respostas — apenas revelações.";
      exibirTexto();
      opcoesAtuais = [
        { texto: "Ir com eles", proxima: "final3" },
        { texto: "Lutar", proxima: "final2" }
      ];
      mostrarOpcoes();
      break;

    case "final1":
    case "final2":
    case "final3":
    case "final4":
    case "final5":
      textoOpcao = "Fim da jornada.";
      exibirTexto();
      final.innerHTML = `
        <strong>${finais[etapa]}</strong>
        </div>
      `;
      salvarSessao();
      break;
  }

}