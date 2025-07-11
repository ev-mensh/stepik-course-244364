let navHeight = 107;

document.addEventListener("DOMContentLoaded", () => {
  let navLinks = document.querySelectorAll("nav a");
  let pairs = [];
  navLinks.forEach((link) => {
    let subsection = document.querySelector(
      `.subsection${link.getAttribute("href")}`
    );
    if (subsection) {
      pairs.push([link, subsection]);
    }
  });

  pairs.forEach(([link, subsection]) => {
    link.addEventListener("click", (evt) => {
      evt.preventDefault();

      subsection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  window.addEventListener("scroll", () => {
    pairs.forEach(([link, subsection]) => {
      let rect = subsection.getBoundingClientRect();
      let isActive = rect.y <= navHeight && rect.y + rect.height > navHeight;
      link.classList.toggle("active", isActive);
    });
  });
});
