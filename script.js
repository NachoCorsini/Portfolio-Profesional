document.addEventListener("DOMContentLoaded", function () {

  // ===== Dark mode toggle =====
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = document.getElementById("themeIcon");
  const root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeIcon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
    localStorage.setItem("theme", theme);
  }

  const savedTheme = localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
  });

  // ===== Botón volver arriba =====
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ===== Navbar scroll effect =====
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  });

  // ===== Modal de contacto (botón nav + flotante) =====
  const modal = document.getElementById("contactModal");
  const closeBtn = document.querySelector(".close");

  function openModal() {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  // Botón flotante
  const btnFloat = document.getElementById("btnContacto2");
  if (btnFloat) btnFloat.addEventListener("click", openModal);

  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // ===== Carrusel de proyectos =====
  const projTrack = document.querySelector(".proyectos-track");
  const projPrev = document.querySelector(".proj-btn.prev");
  const projNext = document.querySelector(".proj-btn.next");
  const projDotsWrap = document.querySelector(".proj-dots");

  if (projTrack && projPrev && projNext) {
    const cards = Array.from(projTrack.querySelectorAll(".card"));
    const VISIBLE = 3;
    let projIndex = 0;

    function getCardWidth() {
      const gap = 24;
      const wrapWidth = projTrack.parentElement.offsetWidth;
      return (wrapWidth - gap * (VISIBLE - 1)) / VISIBLE;
    }

    function buildDots() {
      const total = cards.length - VISIBLE + 1;
      projDotsWrap.innerHTML = "";
      for (let i = 0; i < total; i++) {
        const dot = document.createElement("button");
        dot.className = "proj-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", `Ir al proyecto ${i + 1}`);
        dot.addEventListener("click", () => goTo(i));
        projDotsWrap.appendChild(dot);
      }
    }

    function updateDots() {
      document.querySelectorAll(".proj-dot").forEach((d, i) => {
        d.classList.toggle("active", i === projIndex);
      });
    }

    function goTo(index) {
      const cardW = getCardWidth();
      const gap = 24;
      projIndex = index;
      projTrack.style.transform = `translateX(-${projIndex * (cardW + gap)}px)`;
      cards.forEach((c, i) => {
        c.style.minWidth = cardW + "px";
        c.style.maxWidth = cardW + "px";
      });
      projPrev.disabled = projIndex === 0;
      projNext.disabled = projIndex >= cards.length - VISIBLE;
      updateDots();
    }

    function init() {
      const cardW = getCardWidth();
      cards.forEach(c => {
        c.style.minWidth = cardW + "px";
        c.style.maxWidth = cardW + "px";
        c.style.flex = "0 0 auto";
      });
      buildDots();
      goTo(0);
    }

    projNext.addEventListener("click", () => {
      if (projIndex < cards.length - VISIBLE) goTo(projIndex + 1);
    });
    projPrev.addEventListener("click", () => {
      if (projIndex > 0) goTo(projIndex - 1);
    });

    window.addEventListener("resize", () => goTo(projIndex));
    init();
  }

  // ===== Carrusel de certificados =====
  const certTrack = document.querySelector(".cert-track");
  const certPrev = document.querySelector(".cert-btn.prev");
  const certNext = document.querySelector(".cert-btn.next");
  const certDotsWrap = document.querySelector(".cert-dots");

  if (certTrack && certPrev && certNext) {
    const certItems = Array.from(certTrack.querySelectorAll(".cert-thumb"));
    const CERT_VISIBLE = 3;
    let certIndex = 0;

    function getCertWidth() {
      const gap = 24;
      const wrapWidth = certTrack.parentElement.offsetWidth;
      return (wrapWidth - gap * (CERT_VISIBLE - 1)) / CERT_VISIBLE;
    }

    function buildCertDots() {
      const total = Math.max(certItems.length - CERT_VISIBLE + 1, 1);
      certDotsWrap.innerHTML = "";
      for (let i = 0; i < total; i++) {
        const dot = document.createElement("button");
        dot.className = "cert-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", `Certificado ${i + 1}`);
        dot.addEventListener("click", () => goToCert(i));
        certDotsWrap.appendChild(dot);
      }
    }

    function updateCertDots() {
      document.querySelectorAll(".cert-dot").forEach((d, i) => {
        d.classList.toggle("active", i === certIndex);
      });
    }

    function goToCert(index) {
      const w = getCertWidth();
      const gap = 24;
      certIndex = index;
      certTrack.style.transform = `translateX(-${certIndex * (w + gap)}px)`;
      certItems.forEach(c => {
        c.style.minWidth = w + "px";
        c.style.maxWidth = w + "px";
      });
      certPrev.disabled = certIndex === 0;
      certNext.disabled = certIndex >= certItems.length - CERT_VISIBLE;
      updateCertDots();
    }

    function initCert() {
      const w = getCertWidth();
      certItems.forEach(c => {
        c.style.minWidth = w + "px";
        c.style.maxWidth = w + "px";
        c.style.flex = "0 0 auto";
      });
      buildCertDots();
      goToCert(0);
    }

    certNext.addEventListener("click", () => { if (certIndex < certItems.length - CERT_VISIBLE) goToCert(certIndex + 1); });
    certPrev.addEventListener("click", () => { if (certIndex > 0) goToCert(certIndex - 1); });
    window.addEventListener("resize", () => goToCert(certIndex));
    initCert();
  }

  // ===== Grid certificados con modal =====
  const certModal = document.getElementById("certModal");
  const certModalImg = document.querySelector(".cert-modal-img");
  const certModalTitle = document.querySelector(".cert-modal-title");
  const certModalClose = document.querySelector(".cert-modal-close");

  document.querySelectorAll(".cert-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      certModalImg.src = thumb.dataset.img;
      certModalImg.alt = thumb.dataset.title;
      certModalTitle.textContent = thumb.dataset.title;
      certModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeCertModal() {
    certModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (certModalClose) certModalClose.addEventListener("click", closeCertModal);
  certModal?.addEventListener("click", e => { if (e.target === certModal) closeCertModal(); });
  window.addEventListener("keydown", e => { if (e.key === "Escape") closeCertModal(); });

  // ===== Reveal on scroll (secciones y cards) =====
  const revealEls = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  revealEls.forEach(el => observer.observe(el));

});