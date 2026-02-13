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
  
  // Stop and clear particles
  stopParticles();
  
  // Add or remove meteors
  if (isDark) {
    createMeteors();
  } else {
    removeMeteors();
    startParticles();
  }
});

// Create meteors for dark mode
function createMeteors() {
  // Remove existing meteors first
  removeMeteors();
  
  // Create 4 meteors
  for (let i = 0; i < 4; i++) {
    const meteor = document.createElement("div");
    meteor.className = "meteor";
    document.body.appendChild(meteor);
  }
}

function removeMeteors() {
  document.querySelectorAll(".meteor").forEach(m => m.remove());
}

// Initialize meteors if dark mode is already active
if (document.body.classList.contains("dark-mode")) {
  createMeteors();
}

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
    opacity: 0.6;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
    border-radius: 50%;
    z-index: 1;
    animation: float-particle 10s infinite linear;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  `;

  const size = Math.random() * 8 + 4;
  particle.style.width = size + "px";
  particle.style.height = size + "px";
  particle.style.left = Math.random() * window.innerWidth + "px";
  particle.style.top = window.innerHeight + "px";

  document.body.appendChild(particle);

  const duration = Math.random() * 10000 + 10000;
  const horizontalMovement = (Math.random() - 0.5) * 200;

  particle.animate(
    [
      { transform: "translateY(0) translateX(0)", opacity: 0.6 },
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

// Create particles periodically - only in light mode
let particleInterval;

function startParticles() {
  if (particleInterval) clearInterval(particleInterval);
  particleInterval = setInterval(() => {
    if (!document.body.classList.contains("dark-mode")) {
      createParticle();
    }
  }, 400);
}

function stopParticles() {
  if (particleInterval) {
    clearInterval(particleInterval);
    particleInterval = null;
  }
  // Remove all particles
  document.querySelectorAll('div').forEach(el => {
    const style = el.getAttribute('style');
    if (style && style.includes('position: fixed') && style.includes('pointer-events: none')) {
      el.remove();
    }
  });
}

startParticles();

// Add floating particle animation
const particleStyle = document.createElement("style");
particleStyle.textContent = `
  @keyframes float-particle {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(-100vh) rotate(360deg); }
  }
`;
document.head.appendChild(particleStyle);

// Contact form functionality
document.addEventListener("DOMContentLoaded", () => {
  // Debug image loading
  const heroImage = document.querySelector(".hero-image img");
  if (heroImage) {
    heroImage.addEventListener("error", function () {
      console.error("Image failed to load:", this.src);
      this.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
      this.style.display = "flex";
      this.style.alignItems = "center";
      this.style.justifyContent = "center";
      this.innerHTML =
        '<div style="color: white; text-align: center; padding: 2rem;">📷<br>Profile Picture<br><small>Image not found</small></div>';
    });

    heroImage.addEventListener("load", function () {
      console.log("Image loaded successfully:", this.src);
    });
  }

  const form = document.querySelector(".form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const name = form.querySelector('input[type="text"]').value;
      const email = form.querySelector('input[type="email"]').value;
      const subject = form.querySelector('input[placeholder="Subject"]').value;
      const message = form.querySelector("textarea").value;

      // Show loading state
      const submitBtn = form.querySelector(".form-btn");
      const originalText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      // Simulate sending (in production, this would be a real API call)
      setTimeout(() => {
        // Show success state
        submitBtn.textContent = "✓ Message Sent Successfully!";
        submitBtn.style.background =
          "linear-gradient(135deg, #10b981, #059669)";

        // Create success message
        const successMessage = document.createElement("div");
        successMessage.style.cssText = `
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 8px;
          margin-top: 1rem;
          text-align: center;
          animation: slideInUp 0.5s ease;
        `;
        successMessage.innerHTML = `
          <strong>Thank you for your message!</strong><br>
          I'll get back to you within 24 hours.<br>
          <small>Your message has been received and I'm excited to connect with you!</small>
        `;

        form.appendChild(successMessage);

        // Reset form after 3 seconds
        setTimeout(() => {
          form.reset();
          submitBtn.textContent = originalText;
          submitBtn.style.background = "";
          submitBtn.disabled = false;
          successMessage.remove();
        }, 3000);

        // In a real implementation, you would send this data to your backend
        console.log("Form data:", { name, email, subject, message });
      }, 1500); // Simulate network delay
    });
  }
});
