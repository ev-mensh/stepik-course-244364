window.addEventListener("DOMContentLoaded", () => {
  let nav = document.querySelector(".nav");
  document.fonts.ready.then(() => {
    initNav(nav);
  });
});

function initNav(nav) {
  let links = [...nav.querySelectorAll("a")];
  let sections = links.map((link) =>
    document.querySelector(link.getAttribute("href"))
  );
  let active = [];
  let navHeight = nav.getBoundingClientRect().height;
  let screenHeight = document.documentElement.clientHeight;

  // scroll to the relevant section when clicking on the link in the navigation
  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      let sectionY = sections[index].getBoundingClientRect().y;

      window.scrollTo({
        behavior: "smooth",
        top: window.scrollY + sectionY - navHeight,
      });
    });
  });

  // highlight an active navigation link
  // >>>>>> START HERE <<<<<<

  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        let id = entry.target.getAttribute("id");
        let index = active.findIndex((item) => item[0] === id);
        active[index] = [id, entry.isIntersecting];
      });
      links.forEach((link) => link.classList.remove("active"));
      let activeIndex = active.findIndex(([id, value]) => value);
      links[activeIndex].classList.add("active");
    },
    {
      root: null,
      rootMargin: `-${navHeight}px 0px -${screenHeight - navHeight - 1}px 0px`,
      threshold: 0,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
    active.push([section.getAttribute("id"), false]);
  });
}
