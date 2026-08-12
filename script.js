const CONFIG = {
  // החלף בכתובת העסקית שלך לפני העלאה לאוויר:
  contactEmail: "",
  // אופציונלי: מספר WhatsApp בפורמט בינלאומי בלי +. לדוגמה 972501234567
  whatsappNumber: ""
};

document.getElementById("year").textContent = new Date().getFullYear();

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
});
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => navLinks.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const form = document.getElementById("leadForm");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const name = data.get("name") || "";
  const company = data.get("company") || "";
  const phone = data.get("phone") || "";
  const email = data.get("email") || "";
  const message = data.get("message") || "";

  const body =
`פנייה חדשה מאתר FleetOps

שם: ${name}
חברה: ${company}
טלפון: ${phone}
אימייל: ${email}

צורך:
${message}`;

  if (CONFIG.contactEmail) {
    const subject = encodeURIComponent(`פנייה חדשה מ-FleetOps | ${company || name}`);
    window.location.href = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
    statusEl.textContent = "פותח את תוכנת המייל לשליחת הפנייה.";
    return;
  }

  if (CONFIG.whatsappNumber) {
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(body)}`, "_blank");
    statusEl.textContent = "פותח WhatsApp לשליחת הפנייה.";
    return;
  }

  statusEl.textContent = "האתר מוכן. יש להגדיר אימייל או WhatsApp בקובץ script.js כדי לקבל פניות.";
});
