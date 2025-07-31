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
});
