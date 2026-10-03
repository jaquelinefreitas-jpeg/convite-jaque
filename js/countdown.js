const UNIDADES = [["dias", 864e5], ["horas", 36e5], ["min", 6e4], ["seg", 1e3]];

function iniciarContagem(el, dataISO) {
  const alvo = new Date(dataISO).getTime();
  const render = () => {
    let resto = Math.max(0, alvo - Date.now());
    el.innerHTML = UNIDADES.map(([rotulo, ms]) => {
      const valor = Math.floor(resto / ms);
      resto -= valor * ms;
      return `<div><strong>${String(valor).padStart(2, "0")}</strong><span>${rotulo}</span></div>`;
    }).join("");
  };
  render();
  setInterval(render, 1000);
}
