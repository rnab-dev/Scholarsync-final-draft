document.addEventListener('DOMContentLoaded', function() {
    const featuresDropdown = document.getElementById('featuresDropdown');
    const toolsDropdown = document.getElementById('toolsDropdown');
    const featuresMenu = document.getElementById('featuresMenu');
    const toolsMenu = document.getElementById('toolsMenu');
    const hamburger = document.getElementById('hamburger');
    const navCenter = document.querySelector('.nav-center-section');
  
    function toggleDropdown(button, menu) {
      const isOpen = menu.classList.contains('active');
      
      // Close all dropdowns
      document.querySelectorAll('.nav-dropdown-menu').forEach(m => m.classList.remove('active'));
      document.querySelectorAll('.nav-pill-btn').forEach(b => b.classList.remove('active'));
      
      // Open the clicked one if it was closed
      if (!isOpen) {
        menu.classList.add('active');
        button.classList.add('active');
      }
    }
  
    // Features dropdown
    if (featuresDropdown && featuresMenu) {
      featuresDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(featuresDropdown, featuresMenu);
      });
    }
  
    // Tools dropdown
    if (toolsDropdown && toolsMenu) {
      toolsDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(toolsDropdown, toolsMenu);
      });
    }
  
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item-pill')) {
        document.querySelectorAll('.nav-dropdown-menu').forEach(m => m.classList.remove('active'));
        document.querySelectorAll('.nav-pill-btn').forEach(b => b.classList.remove('active'));
      }
    });
  
    // Mobile menu toggle
    if (hamburger && navCenter) {
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navCenter.classList.toggle('mobile-active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navCenter.classList.contains('mobile-active') ? 'hidden' : '';
      });
    }
  
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
          navbar.style.background = 'rgba(255, 255, 255, 0.05)';
          navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        } else {
          navbar.style.background = 'rgba(255, 255, 255, 0.03)';
          navbar.style.boxShadow = 'none';
        }
      });
    }
  
    // Particles animation
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${15 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
      }
    }
  
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            
            // Close mobile menu if open
            if (navCenter && navCenter.classList.contains('mobile-active')) {
              navCenter.classList.remove('mobile-active');
              if (hamburger) hamburger.classList.remove('active');
              document.body.style.overflow = '';
            }
          }
        }
      });
    });
  
    // Scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
  
    document.querySelectorAll('[data-aos]').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(el);
    });
  
    // Hero scroll indicator
    const scrollIndicator = document.querySelector('.hero-scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', () => {
        const featuresSection = document.querySelector('#features');
        if (featuresSection) {
          featuresSection.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    }
  
    // Add magnetic effect to buttons
    document.querySelectorAll('.btn-primary-glass, .icon-btn-glass').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });

    // Video Modal
    const watchDemoBtn = document.getElementById('watchDemoBtn');
    const videoModal = document.getElementById('videoModal');
    const videoModalBackdrop = document.getElementById('videoModalBackdrop');
    const closeVideoModal = document.getElementById('closeVideoModal');
    const demoVideo = document.getElementById('demoVideo');
    const videoUrl = 'https://www.youtube.com/embed/ZfdlO7609Gs?autoplay=1&rel=0';

    function openVideoModal() {
      demoVideo.src = videoUrl;
      videoModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeVideoModalFunc() {
      videoModal.classList.remove('active');
      demoVideo.src = '';
      document.body.style.overflow = '';
    }

    if (watchDemoBtn) {
      watchDemoBtn.addEventListener('click', openVideoModal);
    }

    if (closeVideoModal) {
      closeVideoModal.addEventListener('click', closeVideoModalFunc);
    }

    if (videoModalBackdrop) {
      videoModalBackdrop.addEventListener('click', closeVideoModalFunc);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && videoModal.classList.contains('active')) {
        closeVideoModalFunc();
      }
    });
  });
  