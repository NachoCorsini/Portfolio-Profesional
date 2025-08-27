document.addEventListener("DOMContentLoaded", function () {
  // ===== Modal de contacto =====
  const btnContacto = document.getElementById("btnContacto");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.querySelector(".close");

  if (btnContacto && modal && closeBtn) {
    btnContacto.addEventListener("click", () => {
      modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // ===== Carrusel de certificados =====
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const slides = document.querySelectorAll(".carousel-track img");
  let currentIndex = 0;

  function updateCarousel() {
    if (!slides.length || !track) return;
    const width = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }

  if (track && prevBtn && nextBtn && slides.length) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    });

    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  }
});
