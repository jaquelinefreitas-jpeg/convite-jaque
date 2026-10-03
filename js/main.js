const $ = (s) => document.querySelector(s);
const data = new Date(CONFIG.dataISO);
const fmt = (opts) => data.toLocaleString("pt-BR", { timeZone: "America/Fortaleza", ...opts });

function preencherConteudo() {
  document.title = `${CONFIG.anfitria} faz ${CONFIG.idade}`;
  $("#titulo").textContent = `${CONFIG.anfitria} faz ${CONFIG.idade}!`;
  $("#frase").textContent = `"${CONFIG.frase}"`;
  $("#legenda").textContent = `Parabéns, ${CONFIG.idade} anos!`;
  $("#data").textContent = fmt({ weekday: "long", day: "numeric", month: "long", year: "numeric" });
  $("#semana").textContent = `Às ${fmt({ hour: "2-digit", minute: "2-digit" }).replace(":", "h")}`;
  $("#traje").textContent = CONFIG.traje;
  $("#local-nome").textContent = CONFIG.local.nome;
  $("#local-end").textContent = CONFIG.local.endereco;
  $("#link-playlist").href = CONFIG.playlistUrl;
  $("#prazo").textContent = CONFIG.prazoConfirmacao;
  $("#rodape-nome").textContent = CONFIG.anfitria;
  
}


function iniciarBotaoCopiar() {
  const btn = $("#copiar-end");
  btn.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(CONFIG.local.endereco); } catch { return; }
    const rotulo = btn.querySelector("span");
    rotulo.textContent = "Copiado!";
    setTimeout(() => (rotulo.textContent = "Copiar"), 2200);
  });
}

preencherConteudo();
iniciarBotaoCopiar();
iniciarContagem($("#contagem"), CONFIG.dataISO);
iniciarEfeitosDeRolagem();
iniciarRSVP({ form: $("#form-rsvp"), painel: $("#resposta"), whatsapp: CONFIG.whatsapp, anfitria: CONFIG.anfitria });
