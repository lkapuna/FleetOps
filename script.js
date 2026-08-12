document.getElementById("year").textContent = new Date().getFullYear();

const WA_NUMBER = "972524332333";
const GENERIC_MESSAGE = "היי, הגעתי דרך אתר FleetOps ואני רוצה לשמוע פרטים לגבי פתרון למשלוחים גדולים.";

function whatsappUrl(message) {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});

document.querySelectorAll(".nav-links a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll(".generic-wa").forEach(link => {
  link.href = whatsappUrl(GENERIC_MESSAGE);
  link.target = "_blank";
  link.rel = "noopener";
});

document.getElementById("leadForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const name = form.querySelector('[name="name"]').value.trim();
  const company = form.querySelector('[name="company"]').value.trim();
  const phone = form.querySelector('[name="phone"]').value.trim();
  const message = form.querySelector('[name="message"]').value.trim();

  const waMessage = `היי, הגעתי דרך אתר FleetOps ואני רוצה לשמוע פרטים לגבי פתרון למשלוחים גדולים.

שם: ${name}
חברה: ${company || "לא צוין"}
טלפון: ${phone}
פרטי הצורך: ${message || "אשמח לקבל פרטים נוספים"}`;

  window.open(whatsappUrl(waMessage), "_blank", "noopener");
});
