document.addEventListener('DOMContentLoaded', function() {
    const featuresDropdown = document.getElementById('featuresDropdown');
    const toolsDropdown = document.getElementById('toolsDropdown');
    const featuresMenu = document.getElementById('featuresMenu');
    const toolsMenu = document.getElementById('toolsMenu');
    const hamburger = document.getElementById('hamburger');
    const navCenter = document.querySelector('.nav-center-section');
  
    // Get current page name
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  
    // Set active state
    document.querySelectorAll('[data-page]').forEach(el => {
      if (el.dataset.page === currentPage) {
        el.classList.add('active');
        // If it's in a dropdown, also mark the dropdown button as active
        const dropdown = el.closest('.nav-dropdown-menu');
        if (dropdown) {
          const dropdownBtn = dropdown.previousElementSibling;
          if (dropdownBtn) dropdownBtn.classList.add('active');
        }
      }
    });
  
    function toggleDropdown(button, menu) {
      const isOpen = menu.classList.contains('active');
      
      document.querySelectorAll('.nav-dropdown-menu').forEach(m => m.classList.remove('active'));
      document.querySelectorAll('.nav-pill-btn').forEach(b => {
        if (!b.classList.contains('active') || b === button) {
          b.classList.remove('active');
        }
      });
      
      if (!isOpen) {
        menu.classList.add('active');
        button.classList.add('active');
      }
    }
  
    if (featuresDropdown && featuresMenu) {
      featuresDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(featuresDropdown, featuresMenu);
      });
    }
  
    if (toolsDropdown && toolsMenu) {
      toolsDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(toolsDropdown, toolsMenu);
      });
    }
  
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav-item-pill')) {
        document.querySelectorAll('.nav-dropdown-menu').forEach(m => m.classList.remove('active'));
        document.querySelectorAll('.nav-pill-btn').forEach(b => {
          // Keep active if it's the current page's dropdown
          const hasActivePage = b.nextElementSibling?.querySelector('.active');
          if (!hasActivePage) {
            b.classList.remove('active');
          }
        });
      }
    });
  
    if (hamburger && navCenter) {
      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navCenter.classList.toggle('mobile-active');
        hamburger.classList.toggle('active');
        document.body.style.overflow = navCenter.classList.contains('mobile-active') ? 'hidden' : '';
      });
    }
  
    const navbar = document.getElementById('navbar');
    if (navbar) {
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 50) {
          navbar.style.background = 'rgba(255, 255, 255, 0.05)';
          navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        } else {
          navbar.style.background = 'rgba(255, 255, 255, 0.03)';
          navbar.style.boxShadow = 'none';
        }
      });
    }
  });
  