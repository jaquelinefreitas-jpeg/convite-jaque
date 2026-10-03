/** Efeitos de rolagem: entrada suave das seções e polaroide que desinclina. */
function iniciarEfeitosDeRolagem() {
  const itens = document.querySelectorAll("[data-reveal]");
  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("visivel"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  itens.forEach((el) => obs.observe(el));

  const polaroide = document.getElementById("polaroide");
  if (!polaroide || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let pendente = false;
  addEventListener("scroll", () => {
    if (pendente) return;
    pendente = true;
    requestAnimationFrame(() => {
      const p = Math.min(scrollY / 500, 1);
      polaroide.style.setProperty("--giro", `${-3 + p * 5}deg`);
      pendente = false;
    });
  }, { passive: true });
}
