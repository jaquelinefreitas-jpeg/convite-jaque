const CHAVE = "convite:rsvp";

function iniciarRSVP({ form, painel, whatsapp, anfitria }) {
  const salvo = lerSalvo();
  if (salvo) mostrarResposta(painel, form, salvo);

  const blocoPresenca = document.getElementById("bloco-presenca");
  const blocoAcomp = document.getElementById("bloco-acomp");
  const atualizarCampos = () => {
    const vai = form.vai.value === "sim";
    blocoPresenca.toggleAttribute("data-fechado", !vai);
    blocoAcomp.toggleAttribute("data-fechado", !vai || form.companhia.value !== "com");
  };
  form.addEventListener("change", atualizarCampos);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const vai = d.get("vai") === "sim";
    const comAcomp = vai && d.get("companhia") === "com";
    const resposta = {
      nome: d.get("nome").trim(),
      vai,
      acomp: comAcomp ? d.get("acomp").trim() : "",
      restricao: vai ? d.get("restricao").trim() : "",
      recado: d.get("recado").trim(),
    };
    if (!resposta.nome) return form.nome.focus();

    localStorage.setItem(CHAVE, JSON.stringify(resposta));
    mostrarResposta(painel, form, resposta);
    if (vai) chuvaDeConfete();
    window.open(montarLinkWhatsApp(whatsapp, anfitria, resposta), "_blank", "noopener");
  });

  painel.querySelector("[data-alterar]").addEventListener("click", () => {
    localStorage.removeItem(CHAVE);
    painel.hidden = true;
    form.hidden = false;
  });
}

function lerSalvo() {
  try { return JSON.parse(localStorage.getItem(CHAVE)); } catch { return null; }
}

function montarLinkWhatsApp(numero, anfitria, r) {
  const linhas = [
    `Oi ${anfitria}! Aqui é ${r.nome}, ${r.vai ? "confirmo presença 🎉" : "infelizmente não poderei ir 💔"}`,
    r.acomp && `Acompanhante: ${r.acomp}`,
    r.restricao && `Restrição alimentar: ${r.restricao}`,
    r.recado && `"${r.recado}"`,
  ].filter(Boolean);
  return `https://wa.me/${numero}?text=${encodeURIComponent(linhas.join("\n"))}`;
}

function mostrarResposta(painel, form, r) {
  form.hidden = true;
  painel.hidden = false;
  painel.querySelector("[data-msg]").textContent = r.vai
    ? `Presença confirmada, ${r.nome}! Mal posso esperar.`
    : `Que pena, ${r.nome}. Sentiremos sua falta!`;
}

function chuvaDeConfete() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cores = ["#6b1d2f", "#eca3b8", "#6b8062", "#d4af37", "#ffffff"];
  for (let i = 0; i < 70; i++) {
    const p = document.createElement("i");
    p.className = "confete";
    p.style.cssText = `left:${Math.random() * 100}vw;background:${cores[i % 5]};animation-delay:${Math.random() * .6}s;--giro:${Math.random() * 720}deg`;
    document.body.append(p);
    p.addEventListener("animationend", () => p.remove());
  }
}
