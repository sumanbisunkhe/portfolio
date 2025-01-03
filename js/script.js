// Constants and DOM Elements
const DOM = {
    themeSwitch: document.getElementById('theme-switch'),
    body: document.body,
    loader: document.querySelector('.loader'),
    nav: {
      container: document.querySelector('.nav-container'),
      links: document.querySelectorAll('.nav-link'),
      menuToggle: document.querySelector('.menu-toggle'),
      linksList: document.querySelector('.nav-links')
    },
    skills: document.querySelectorAll('.skill-progress'),
    cursor: {
      main: document.querySelector('.custom-cursor'),
      trail: document.querySelector('.cursor-trail')
    },
    contactForm: document.querySelector('.contact-form'),
    typing: {
      textSpan: document.querySelector('.typed-text'),
      cursorSpan: document.querySelector('.cursor')
    },
    fadeElements: document.querySelectorAll('.project-card, .skill-item, .education-item')
  };

// menu-toggle

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  const navLinks = document.querySelectorAll(".sidebar .nav-link"); // Select all nav-links inside the sidebar
  const overlay = document.querySelector(".sidebar-overlay"); // Optional overlay if you want to click outside to close

  // Toggle the sidebar when the menu icon is clicked
  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the click event from propagating to the document
    sidebar.classList.toggle("open");
  });

  // Close the sidebar when any nav-link is clicked
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  });

  // Close the sidebar when clicking anywhere outside of it
  document.addEventListener("click", (event) => {
    // If the click happens outside the sidebar and the menu toggle, close the sidebar
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
      sidebar.classList.remove("open");
    }
  });

  // Prevent the sidebar from closing when clicking inside the sidebar
  sidebar.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent event propagation to the document
  });

  // Close the sidebar if an overlay is present (optional)
  if (overlay) {
    overlay.addEventListener("click", () => {
      sidebar.classList.remove("open");
    });
  }
});

  
  
  // Configuration
  const CONFIG = {
    typingTexts: ['Java Developer', 'Tech Enthusiast', 'B.Sc.CSIT Student (4th.Sem)', 'Problem Solver'],
    typingSpeed: 100,
    eraseSpeed: 50,
    pauseDuration: 2000,
    loaderDuration: 2000,
    scrollThreshold: 50,
    navOffset: 100,
    fadeThreshold: 0.3,
    fadeMargin: '0px 0px -50px 0px'
  };
  
  // Theme Management
  class ThemeManager {
    static init() {
      const darkMode = localStorage.getItem('darkMode') === 'true';
      DOM.themeSwitch.checked = darkMode;
      this.setTheme(darkMode);
      
      DOM.themeSwitch.addEventListener('change', () => {
        this.setTheme(DOM.themeSwitch.checked);
      });
    }
  
    static setTheme(isDark) {
      DOM.body.className = isDark ? 'dark-mode' : 'light-mode';
      localStorage.setItem('darkMode', isDark);
    }
  }
  
  // Typing Animation
  class TypingAnimation {
    constructor() {
      this.textArrayIndex = 0;
      this.charIndex = 0;
    }
  
    start() {
      setTimeout(() => this.type(), CONFIG.pauseDuration);
    }
  
    type() {
      const currentText = CONFIG.typingTexts[this.textArrayIndex];
      if (this.charIndex < currentText.length) {
        DOM.typing.textSpan.textContent += currentText.charAt(this.charIndex);
        this.charIndex++;
        setTimeout(() => this.type(), CONFIG.typingSpeed);
      } else {
        setTimeout(() => this.erase(), CONFIG.pauseDuration);
      }
    }
  
    erase() {
      const currentText = CONFIG.typingTexts[this.textArrayIndex];
      if (this.charIndex > 0) {
        DOM.typing.textSpan.textContent = currentText.substring(0, this.charIndex - 1);
        this.charIndex--;
        setTimeout(() => this.erase(), CONFIG.eraseSpeed);
      } else {
        this.textArrayIndex = (this.textArrayIndex + 1) % CONFIG.typingTexts.length;
        setTimeout(() => this.type(), CONFIG.typingSpeed);
      }
    }
  }
  
  // Navigation Handler
  class Navigation {
    static init() {
      this.initScrollEvents();
      this.initSmoothScroll();
      this.initMobileMenu();
    }
  
    static initScrollEvents() {
      window.addEventListener('scroll', () => {
        this.updateNavStyle();
        this.updateActiveLink();
      });
    }
  
    static updateNavStyle() {
      DOM.nav.container.classList.toggle('scrolled', window.scrollY > CONFIG.scrollThreshold);
    }
  
    static updateActiveLink() {
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Adjusted for better section targeting
      document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
    
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          DOM.nav.links.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
          });
        }
      });
    }
    
  
    static initSmoothScroll() {
      DOM.nav.links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetSection = document.querySelector(link.getAttribute('href'));
          targetSection.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }
  
    static initMobileMenu() {
      DOM.nav.menuToggle.addEventListener('click', () => {
        DOM.nav.menuToggle.classList.toggle('active');
        DOM.nav.linksList.classList.toggle('show');
      });
    }
  }
  
  // Custom Cursor
  class Cursor {
    static init() {
      document.addEventListener('mousemove', (e) => {
        const { clientX: x, clientY: y } = e;
        
        DOM.cursor.main.style.transform = `translate(${x}px, ${y}px)`;
        setTimeout(() => {
          DOM.cursor.trail.style.transform = `translate(${x}px, ${y}px)`;
        }, 100);
      });
    }
  }
  
  // Skills Animation
  class SkillsAnimation {
    static init() {
      window.addEventListener('scroll', () => this.animateSkillBars());
    }
  
    static isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    static animateSkillBars() {
      DOM.skills.forEach(bar => {
        if (this.isElementInViewport(bar)) {
          bar.style.width = `${bar.getAttribute('data-progress')}%`;
        }
      });
    }
  }
  
  // Contact Form Handler
  class ContactForm {
    static init() {
      DOM.contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = DOM.contactForm.querySelector('.submit-btn');
        
        try {
          await this.handleSubmission(submitBtn);
          alert('Message sent successfully!');
          DOM.contactForm.reset();
        } catch (error) {
          alert('Failed to send message. Please try again.');
        }
      });
    }
  
    static async handleSubmission(submitBtn) {
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
  
      try {
        // Replace with actual API endpoint
        await new Promise(resolve => setTimeout(resolve, 2000));
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    }
  }
  
  // Fade Animation
  class FadeAnimation {
    static init() {
      const options = {
        threshold: CONFIG.fadeThreshold,
        rootMargin: CONFIG.fadeMargin
      };
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
          }
        });
      }, options);
  
      DOM.fadeElements.forEach(element => observer.observe(element));
    }
  }
  
  // Page Initialization
  class App {
    static init() {
      // Initialize theme before anything else
      ThemeManager.init();
  
      // Show loader
      window.addEventListener('load', () => {
        setTimeout(() => {
          DOM.loader.classList.add('hidden');
          DOM.body.style.overflow = 'visible';
          
          // Initialize all components
          const typing = new TypingAnimation();
          typing.start();
          
          Navigation.init();
          Cursor.init();
          SkillsAnimation.init();
          ContactForm.init();
          FadeAnimation.init();
        }, CONFIG.loaderDuration);
      });
    }
  }
  
  // Initialize the application
  App.init();

  