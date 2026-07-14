const header = document.querySelector("[data-header]");
const nav = document.querySelector(".nav");
const toggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const form = document.querySelector("[data-contact-form]");
const formNote = document.querySelector("[data-form-note]");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

window.addEventListener(
  "scroll",
  () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  },
  { passive: true }
);

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("is-open"));
  });
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );
  revealItems.forEach((el) => observer.observe(el));
} else {
  revealItems.forEach((el) => el.classList.add("is-visible"));
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const organisation = String(data.get("organisation") || "").trim();
    const country = String(data.get("country") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = `Portfolio enquiry from ${name}`;
    const body = `Name: ${name}\nOrganisation: ${organisation}\nCountry: ${country}\n\n${message}`;
    const mailto = `mailto:malihamasud128@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    if (formNote) {
      formNote.hidden = false;
    }
    window.location.href = mailto;
    form.reset();
  });
}
