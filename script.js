/* =========================
   PRELOADER
========================= */

window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 700);
});


/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================
   TYPING EFFECT
========================= */

const typingElement = document.querySelector(".typing-text");

const roles = [
    "Software Developer",
    "Web Developer",
    "Automation Builder",
    "Problem Solver"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole = roles[roleIndex];

    if (!deleting) {

        typingElement.textContent =
            currentRole.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentRole.length) {

            deleting = true;

            setTimeout(typeEffect, 1700);

            return;
        }

    } else {

        typingElement.textContent =
            currentRole.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            roleIndex++;

            if (roleIndex >= roles.length) {
                roleIndex = 0;
            }

        }

    }

    const typingSpeed = deleting ? 45 : 80;

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();


/* =========================
   CODE CARD MOUSE EFFECT
========================= */

const codeCard = document.querySelector(".code-card");

if (codeCard && window.innerWidth > 900) {

    document.addEventListener("mousemove", (event) => {

        const x = (window.innerWidth / 2 - event.clientX) / 70;
        const y = (window.innerHeight / 2 - event.clientY) / 70;

        codeCard.style.transform =
            `rotateY(${x}deg) rotateX(${y}deg)`;

    });

}


/* =========================
   ACTIVE NAVIGATION
========================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNav() {

    const scrollPosition = window.scrollY + 180;

    sections.forEach(section => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink =
                document.querySelector(
                    `.nav-link[href="#${sectionId}"]`
                );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        }

    });

}

window.addEventListener("scroll", updateActiveNav);


/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.style.padding = "14px 0";
        navbar.style.background = "rgba(7, 8, 13, 0.82)";

    } else {

        navbar.style.padding = "22px 0";
        navbar.style.background = "rgba(7, 8, 13, 0.55)";

    }

});


/* =========================
   REVEAL ANIMATION
========================= */

const revealElements =
    document.querySelectorAll(".placeholder-section");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(35px)";
    element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    revealObserver.observe(element);

});


/* =========================
   BUTTON TILT EFFECT
========================= */

const buttons = document.querySelectorAll(".btn, .nav-cta");

buttons.forEach(button => {

    button.addEventListener("mousemove", (event) => {

        const rect = button.getBoundingClientRect();

        const x =
            event.clientX - rect.left - rect.width / 2;

        const y =
            event.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translateY(-2px) rotateX(${y / 12}deg) rotateY(${x / 12}deg)`;

    });


    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});// =========================================
// CONTACT FORM
// =========================================

// =========================================
// CONTACT FORM - FORMSUBMIT
// =========================================
const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactFormStatus");
const contactSubmitButton = document.getElementById("contactSubmitButton");

if (contactForm) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const originalButtonHTML = contactSubmitButton
            ? contactSubmitButton.innerHTML
            : "";

        if (contactSubmitButton) {
            contactSubmitButton.disabled = true;
            contactSubmitButton.innerHTML = `
                <span>Sending...</span>
                <i class="fa-solid fa-spinner fa-spin"></i>
            `;
        }

        if (contactStatus) {
            contactStatus.textContent = "Sending your message...";
            contactStatus.style.color = "#a78bfa";
        }

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(
                "https://formsubmit.co/ajax/info.nexttechlabs@gmail.com",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            const result = await response.json();

            if (!response.ok || result.success === false) {
                throw new Error(result.message || "Unable to send message.");
            }

            if (contactStatus) {
                contactStatus.textContent =
                    "✓ Message sent successfully. I'll get back to you soon.";
                contactStatus.style.color = "#4ade80";
            }

            contactForm.reset();

        } catch (error) {
            console.error("Contact form error:", error);

            if (contactStatus) {
                contactStatus.textContent =
                    "Unable to send right now. Please email info.nexttechlabs@gmail.com directly.";
                contactStatus.style.color = "#f87171";
            }
        } finally {
            if (contactSubmitButton) {
                contactSubmitButton.disabled = false;
                contactSubmitButton.innerHTML = originalButtonHTML;
            }
        }
    });
}
