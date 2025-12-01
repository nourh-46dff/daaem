// Form switching functionality
function switchForm(formType) {
  // Remove active class from all tabs and forms
  document
    .querySelectorAll(".form-tab")
    .forEach((tab) => tab.classList.remove("active"));
  document
    .querySelectorAll(".form-section")
    .forEach((section) => section.classList.remove("active"));

  // Add active class to selected tab and form
  event.target.classList.add("active");
  document.getElementById(formType + "-form").classList.add("active");
}

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Mobile menu toggle
const mobileToggle = document.getElementById("mobileToggle");
const mobileMenu = document.getElementById("mobileMenu");

mobileToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("active");
  const icon = mobileToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-times");
});

// Close mobile menu when clicking on links
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    const icon = mobileToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-times");
  });
});

// Scroll Animation
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animate");
    }
  });
}

// Counter Animation
function animateCounters() {
  const counters = document.querySelectorAll(".statistics .number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    // Check if statistics section is visible
    const statisticsSection = document.querySelector(".statistics");
    const sectionTop = statisticsSection.getBoundingClientRect().top;

    if (
      sectionTop < window.innerHeight - 200 &&
      !counter.classList.contains("animated")
    ) {
      counter.classList.add("animated");
      updateCounter();
    }
  });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Service cards hover effect enhancement
document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Add parallax effect to header
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const header = document.querySelector(".header");
  const rate = scrolled * -0.5;

  if (header) {
    header.style.transform = `translateY(${rate}px)`;
  }

  // Run animations
  animateOnScroll();
  animateCounters();
});

// Initial load animations
window.addEventListener("load", () => {
  animateOnScroll();

  // Add stagger effect to service cards
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.classList.add("animate");
  });
});

// Add intersection observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");

      // Special handling for statistics section
      if (entry.target.classList.contains("statistics")) {
        setTimeout(() => {
          animateCounters();
        }, 500);
      }
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Add dynamic background patterns
function createFloatingElements() {
  const header = document.querySelector(".header");

  for (let i = 0; i < 20; i++) {
    const element = document.createElement("div");
    element.style.position = "absolute";
    element.style.width = Math.random() * 10 + 5 + "px";
    element.style.height = element.style.width;
    element.style.background = "rgba(255, 255, 255, 0.1)";
    element.style.borderRadius = "50%";
    element.style.left = Math.random() * 100 + "%";
    element.style.top = Math.random() * 100 + "%";
    element.style.animation = `float ${
      Math.random() * 10 + 10
    }s infinite linear`;
    header.appendChild(element);
  }
}

// Add floating animation keyframes
const style = document.createElement("style");
style.textContent = `
                  @keyframes float {
                      0% {
                          transform: translateY(0px) rotate(0deg);
                          opacity: 0;
                      }
                      50% {
                          opacity: 1;
                      }
                      100% {
                          transform: translateY(-100vh) rotate(360deg);
                          opacity: 0;
                      }
                  }
              `;
document.head.appendChild(style);

// Initialize floating elements
createFloatingElements();
// --------------------------------------------------
// partner section
// partner section
function initPartnersSlider() {
  const partnersTrack = document.getElementById("partnersTrack");
  const totalPartners = 19;

  // Clear existing content
  partnersTrack.innerHTML = "";

  // Create partner cards with images
  for (let i = 1; i <= totalPartners; i++) {
    const partnerCard = document.createElement("div");
    partnerCard.className = "partner-card";

    const partnerImage = document.createElement("img");
    partnerImage.className = "partner-image";
    partnerImage.src = `./images/partner${i}.PNG`;
    partnerImage.alt = `شريك ${i}`;

    partnerCard.appendChild(partnerImage);
    partnersTrack.appendChild(partnerCard);
  }

  // Duplicate the entire set for seamless looping
  const originalCards = partnersTrack.innerHTML;
  partnersTrack.innerHTML += originalCards;

  // Add scroll animation observer
  initScrollAnimation();
}

// Initialize scroll animation
function initScrollAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
        }
      });
    }
    // { threshold: 0.1 }
  );

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

// Pause animation when tab is not visible
document.addEventListener("visibilitychange", function () {
  const partnersTrack = document.getElementById("partnersTrack");
  if (partnersTrack) {
    partnersTrack.style.animationPlayState = document.hidden
      ? "paused"
      : "running";
  }
});

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initPartnersSlider();
});

// Handle window resize
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const partnersTrack = document.getElementById("partnersTrack");
    if (partnersTrack) {
      partnersTrack.style.animation = "none";
      setTimeout(() => {
        partnersTrack.style.animation = "";
      }, 10);
    }
  }, 2500);
});
// --------------------------------------------------
// scroll to top
const scrollBtn = document.getElementById("scrollTopBtn");

// Show button when user scrolls down 200px
window.addEventListener("scroll", () => {
  if (
    document.body.scrollTop > 200 ||
    document.documentElement.scrollTop > 200
  ) {
    scrollBtn.style.left = "20px";
  } else {
    scrollBtn.style.left = "-60px";
  }
});

// Scroll smoothly to top when clicked
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
// --------------------------------------------------

// Form submission handlers
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const formType = this.closest(".form-section").id;

    // Show success message
    alert("تم إرسال طلبك بنجاح! سنتواصل معك قريباً.");

    // Reset form
    this.reset();
  });
});


let index = 0;
const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".message");
const total = slides.length;

document.querySelector(".next").onclick = () => {
    index = (index + 1) % total;
    updateSlider();
};

document.querySelector(".prev").onclick = () => {
    index = (index - 1 + total) % total;
    updateSlider();
};

function updateSlider() {
    track.style.transform = `translateX(+${index * 100}%)`;
}

// Reset when window resizes
window.addEventListener("resize", () => {
   
        index = 0;
        updateSlider();
   
});


