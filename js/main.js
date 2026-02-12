// Prevent browser scroll restoration and force top
if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
window.scrollTo(0, 0);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Enhanced typing animation
const text = "David!";
const span = document.querySelector("#hero span");
let i = 0;
span.textContent = "";

function type() {
  if (i < text.length) {
    span.textContent += text.charAt(i);
    i++;
    setTimeout(type, 150);
  } else {
    span.style.animation = "pulse 2s infinite";
  }
}
setTimeout(type, 500);

// Add pulse animation
const style = document.createElement("style");
style.textContent = `
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
`;
document.head.appendChild(style);

// Enhanced scroll animations with stagger effect
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("fade-in");
        }, index * 100);
      }
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll("section").forEach((section) => {
  section.classList.add("fade-out");
  observer.observe(section);
});

// Dark mode toggle with enhanced transition
const toggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Add loading animation for project cards
document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = "slideInUp 0.6s ease forwards";
  });
});

// Add slide in up animation
const slideStyle = document.createElement("style");
slideStyle.textContent = `
  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(slideStyle);

// Add floating particles effect
function createParticle() {
  const particle = document.createElement("div");
  particle.style.cssText = `
    position: fixed;
    pointer-events: none;
    opacity: 0.3;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border-radius: 50%;
    z-index: 1;
    animation: float-particle 10s infinite linear;
  `;

  const size = Math.random() * 4 + 2;
  particle.style.width = size + "px";
  particle.style.height = size + "px";
  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = window.innerHeight + "px";

  document.body.appendChild(particle);

  const duration = Math.random() * 10000 + 10000;
  const horizontalMovement = (Math.random() - 0.5) * 200;

  particle.animate(
    [
      { transform: "translateY(0) translateX(0)", opacity: 0.3 },
      {
        transform: `translateY(-${window.innerHeight + 100}px) translateX(${horizontalMovement}px)`,
        opacity: 0,
      },
    ],
    {
      duration: duration,
      easing: "linear",
    },
  ).onfinish = () => particle.remove();
}

// Create particles periodically
setInterval(createParticle, 800);

// Add floating particle animation
const particleStyle = document.createElement("style");
particleStyle.textContent = `
  @keyframes float-particle {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(-100vh) rotate(360deg); }
  }
`;
document.head.appendChild(particleStyle);
