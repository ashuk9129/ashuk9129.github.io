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

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        if (!name || !email || !subject || !message) {
            return;
        }

        const emailBody =
            `Hello Ashutosh,%0D%0A%0D%0A` +
            `Name: ${encodeURIComponent(name)}%0D%0A` +
            `Email: ${encodeURIComponent(email)}%0D%0A%0D%0A` +
            `${encodeURIComponent(message)}`;

        const mailtoURL =
            `mailto:info.nexttechlabs@gmail.com` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${emailBody}`;

        window.location.href = mailtoURL;

    });

}