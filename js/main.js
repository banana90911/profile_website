/* ========================================
   MAIN.JS - Navigation, Scroll, Typing
   ======================================== */

// Typing Effect
const roles = ['Salesforce Developer', 'AI Engineer'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const delayBetweenRoles = 2000;

function typeRole() {
  const typingText = document.querySelector('.typing-text');
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    // Typing
    if (charIndex < currentRole.length) {
      typingText.textContent += currentRole.charAt(charIndex);
      charIndex++;
      setTimeout(typeRole, typingSpeed);
    } else {
      // Finished typing, wait before deleting
      isDeleting = true;
      setTimeout(typeRole, delayBetweenRoles);
    }
  } else {
    // Deleting
    if (charIndex > 0) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeRole, deletingSpeed);
    } else {
      // Finished deleting, move to next role
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeRole, 500);
    }
  }
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
  typeRole();
});

// ========================================
// Navigation Scroll Effect
// ========================================
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  updateActiveNavLink();
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const navLink = document.querySelector(`.nav-link[href="#${section.id}"]`);

    if (rect.top <= 100 && rect.bottom >= 100) {
      navLinks.forEach(link => link.classList.remove('active'));
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  });
}

// ========================================
// Smooth Scroll & Close Menu on Click
// ========================================
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile menu
    const hamburger = document.getElementById('hamburger-checkbox');
    if (hamburger) {
      hamburger.checked = false;
    }
  });
});

// ========================================
// Intersection Observer for Scroll Reveal
// ========================================
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach(element => {
  revealObserver.observe(element);
});

// ========================================
// Scroll Reveal for Timeline
// ========================================
const timelineContainer = document.querySelector('.timeline-container');
const timelineItems = document.querySelectorAll('.timeline-item');

if (timelineContainer) {
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const line = entry.target.querySelector('.timeline-line');
        if (line) {
          line.style.animation = 'drawLine 1.2s ease forwards';
        }

        timelineItems.forEach((item, index) => {
          item.style.opacity = '1';
        });

        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  timelineObserver.observe(timelineContainer);
}

// ========================================
// Mobile Menu Toggle
// ========================================
const hamburgerCheckbox = document.getElementById('hamburger-checkbox');

if (hamburgerCheckbox) {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.hamburger-menu') && !e.target.closest('.nav-menu')) {
      hamburgerCheckbox.checked = false;
    }
  });
}

// ========================================
// Close menu when pressing Escape
// ========================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const hamburger = document.getElementById('hamburger-checkbox');
    if (hamburger) {
      hamburger.checked = false;
    }
  }
});
