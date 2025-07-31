document.addEventListener("DOMContentLoaded", function () {
  const profileImg = document.querySelector(".profile img");
  const contentSections = document.querySelectorAll(
    "header, .intro, .cards, footer"
  );
  const overlay = document.getElementById("overlay");

  profileImg.addEventListener("mouseenter", () => {
    contentSections.forEach((el) => el.classList.add("blurred"));
    overlay.classList.add("active");
  });

  profileImg.addEventListener("mouseleave", () => {
    contentSections.forEach((el) => el.classList.remove("blurred"));
    overlay.classList.remove("active");
  });

  // Formulario
  const btnContacto = document.getElementById("btnContacto");
  const modal = document.getElementById("contactModal");
  const closeBtn = document.querySelector(".close");

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

  // Carrusel (si seguís usándolo)
  const track = document.querySelector(".carousel-track");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  const slides = document.querySelectorAll(".carousel-track img");
  let currentIndex = 0;

  function updateCarousel() {
    const width = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
  }

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
});
