// MOBILE MENU
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (toggle) {
  toggle.addEventListener("click", () => {
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
  });
}
// FAQ ACCORDION
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(q => {
  q.addEventListener("click", () => {
    const answer = q.nextElementSibling;

    answer.style.display =
      answer.style.display === "block" ? "none" : "block";
  });
});
// LIGHTBOX
const images = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close");

images.forEach(img => {
  img.addEventListener("click", () => {
    lightbox.style.display = "flex";
    lightboxImg.src = img.src;
  });
});

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

lightbox?.addEventListener("click", (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = "none";
  }
});
// CONTACT FORM VALIDATION
const form = document.getElementById("contactForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const rodo = document.getElementById("rodo").checked;
    const output = document.getElementById("formMsg");

    if (firstName.length < 2) {
      output.textContent = "Podaj poprawne imię ❗";
      return;
    }

    if (lastName.length < 2) {
      output.textContent = "Podaj nazwisko ❗";
      return;
    }

    if (phone.length < 9) {
      output.textContent = "Podaj poprawny numer telefonu ❗";
      return;
    }

    if (!email.includes("@")) {
      output.textContent = "Niepoprawny email ❗";
      return;
    }

    if (message.length < 10) {
      output.textContent = "Wiadomość za krótka ❗";
      return;
    }

    if (!rodo) {
      output.textContent = "Musisz zaakceptować zgodę ❗";
      return;
    }

    output.textContent = "Wiadomość wysłana ✔️";
    form.reset();
  });
}