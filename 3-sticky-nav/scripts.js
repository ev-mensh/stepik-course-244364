document.addEventListener("DOMContentLoaded", () => {
  initSectionScrolling("section2");
});

function initSectionScrolling(sectionId) {
  let section = document.getElementById(sectionId);
  if (!section) return;

  let subnav = section.querySelector(".subnav");
  let subnavHeight = subnav.getBoundingClientRect().height;
  let navLinks = subnav.querySelectorAll("a");
  let pairs = [];
  navLinks.forEach((link) => {
    let subsection = section.querySelector(
      `.subsection${link.getAttribute("href")}`
    );
    if (subsection) {
      pairs.push([link, subsection]);
    }
  });

  pairs.forEach(([link, subsection]) => {
    link.addEventListener("click", (evt) => {
      evt.preventDefault();

      window.scrollTo({
        top:
          window.scrollY + subsection.getBoundingClientRect().y - subnavHeight,
        behavior: "smooth",
      });
    });
  });

  let navClassToggle = () => {
    pairs.forEach(([link, subsection]) => {
      let rect = subsection.getBoundingClientRect();
      let isActive =
        rect.y <= subnavHeight && rect.y + rect.height > subnavHeight;
      link.classList.toggle("active", isActive);
    });
  };

  window.addEventListener("scroll", throttle(navClassToggle, 200));
}

function throttle(fn, delay) {
  var time = Date.now();
  return function () {
    if (time + delay - Date.now() < 0) {
      fn();
      time = Date.now();
    }
  };
}
