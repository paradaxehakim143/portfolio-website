document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // JS Feature #1: Reading Progress Bar
    // ----------------------------------------------------
    const progressBar = document.getElementById("progress-bar");
    window.addEventListener("scroll", () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentProgress = (window.scrollY / totalHeight) * 100;
        progressBar.style.width = `${currentProgress}%`;
    });

    // ----------------------------------------------------
    // JS Feature #2: Dark / Light Mode Toggle with LocalStorage
    // ----------------------------------------------------
    const themeBtn = document.getElementById("theme-toggle");
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    themeBtn.textContent = savedTheme === "dark" ? "🌙" : "☀️";

    themeBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        themeBtn.textContent = newTheme === "dark" ? "🌙" : "☀️";
    });

    // ----------------------------------------------------
    // JS Feature #3: Mobile Hamburger Navigation Toggle
    // ----------------------------------------------------
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        navLinks.classList.toggle("show");
    });

    // Close mobile menu when a nav link is clicked
    document.querySelectorAll(".nav-item").forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });

    // ----------------------------------------------------
    // JS Feature #4: Dynamic Typing & Deleting Effect
    // ----------------------------------------------------
    const typingElement = document.getElementById("typing-text");
    const roles = ["Software Programmer", "UI/UX Designer", "Game Developer","Database Architect"];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex--);
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex++);
        }

        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentRole.length + 1) {
            speed = 1800; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // ----------------------------------------------------
    // JS Feature #5: Interactive Project Category Filter
    // ----------------------------------------------------
    const filterBtns = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filter === "all" || category === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // ----------------------------------------------------
    // JS Feature #6: Dynamic Skill Bars on Scroll (IntersectionObserver)
    // ----------------------------------------------------
    const skillBars = document.querySelectorAll(".progress-bar-fill");
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.getAttribute("data-progress");
                entry.target.style.width = progress;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));

    // ----------------------------------------------------
    // JS Feature #7: Form Input Validation & Submission Handler
    // ----------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll(".error-msg").forEach(el => el.textContent = "");

        if (!nameInput.value.trim()) {
            document.getElementById("name-error").textContent = "Name is required.";
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+\$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            document.getElementById("email-error").textContent = "Enter a valid email address.";
            isValid = false;
        }

        if (!messageInput.value.trim()) {
            document.getElementById("message-error").textContent = "Message cannot be empty.";
            isValid = false;
        }

        if (isValid) {
            formStatus.style.color = "#22c55e";
            formStatus.textContent = "Thank you! Your message has been sent successfully.";
            contactForm.reset();
        } else {
            formStatus.style.color = "#ef4444";
            formStatus.textContent = "Please fix the errors above.";
        }
    });

    // ----------------------------------------------------
    // JS Feature #8: Back to Top Button
    // ----------------------------------------------------
    const backToTopBtn = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // ----------------------------------------------------
    // JS Feature #9: Active Navigation Highlight on Scroll
    // ----------------------------------------------------
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-item");

    window.addEventListener("scroll", () => {
        let currentSection = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSection}`) {
                item.classList.add("active");
            }
        });
    });

    // ----------------------------------------------------
    // JS Feature #10: Dynamic Copyright Year
    // ----------------------------------------------------
    document.getElementById("year").textContent = new Date().getFullYear();

    // ----------------------------------------------------
// ----------------------------------------------------
// Multi-Image Gallery & Fullscreen Lightbox with Navigation
// ----------------------------------------------------
const previewBtns = document.querySelectorAll(".preview-btn");
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const modalCaption = document.getElementById("modal-caption");
const modalClose = document.getElementById("modal-close");
const modalPrev = document.getElementById("modal-prev");
const modalNext = document.getElementById("modal-next");

let currentActiveGalleryImages = [];
let currentModalIndex = 0;

// Toggle Preview Gallery Visibility
previewBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        const wrapper = btn.closest(".card-image-wrapper");
        const gallery = wrapper.querySelector(".gallery-container");
        const isHidden = gallery.classList.contains("hidden-gallery");

        if (isHidden) {
            gallery.classList.remove("hidden-gallery");
            btn.style.display = "none";
            btn.setAttribute("aria-expanded", "true");
        }
    });
});

// Setup Gallery Navigation & Zoom Lightbox
document.querySelectorAll(".gallery-container").forEach(gallery => {
    const images = Array.from(gallery.querySelectorAll(".gallery-img"));
    const prevBtn = gallery.querySelector(".prev-btn");
    const nextBtn = gallery.querySelector(".next-btn");
    const counter = gallery.querySelector(".slide-counter");
    let currentIndex = 0;

    function updateCardGallery(index) {
        images.forEach((img, i) => {
            img.classList.toggle("active", i === index);
        });
        if (counter) counter.textContent = `${index + 1} / ${images.length}`;
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % images.length;
            updateCardGallery(currentIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCardGallery(currentIndex);
        });
    }

    // Click active image to enter Fullscreen Modal Lightbox
    images.forEach((img, idx) => {
        img.addEventListener("click", () => {
            currentActiveGalleryImages = images;
            currentModalIndex = idx;
            openModalImage(currentModalIndex);
        });
    });
});

// Display Specific Image in Modal
function openModalImage(index) {
    if (!currentActiveGalleryImages.length) return;
    const targetImg = currentActiveGalleryImages[index];
    modalImg.src = targetImg.src;
    modalCaption.textContent = targetImg.alt;
    modal.classList.add("show-modal");
    modal.setAttribute("aria-hidden", "false");
}

// Modal Next / Previous Navigation Controls
function nextModalImage() {
    if (!currentActiveGalleryImages.length) return;
    currentModalIndex = (currentModalIndex + 1) % currentActiveGalleryImages.length;
    openModalImage(currentModalIndex);
}

function prevModalImage() {
    if (!currentActiveGalleryImages.length) return;
    currentModalIndex = (currentModalIndex - 1 + currentActiveGalleryImages.length) % currentActiveGalleryImages.length;
    openModalImage(currentModalIndex);
}

if (modalNext) modalNext.addEventListener("click", (e) => { e.stopPropagation(); nextModalImage(); });
if (modalPrev) modalPrev.addEventListener("click", (e) => { e.stopPropagation(); prevModalImage(); });

// Keyboard Arrow Key Navigation
document.addEventListener("keydown", (e) => {
    if (modal.classList.contains("show-modal")) {
        if (e.key === "ArrowRight") nextModalImage();
        if (e.key === "ArrowLeft") prevModalImage();
        if (e.key === "Escape") closeModal();
    }
});

// Modal Close Controls
if (modalClose) modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.remove("show-modal");
    modal.setAttribute("aria-hidden", "true");
}
});