(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    // Toggle the main state class on the body
    document.querySelector('body').classList.toggle('mobile-nav-active');

    // Manually sync the hamburger's checkbox state with the menu's state
    const hamburgerCheckbox = mobileNavToggleBtn.querySelector('input[type="checkbox"]');
    if (hamburgerCheckbox) {
      hamburgerCheckbox.checked = document.body.classList.contains('mobile-nav-active');
    }
  }

  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', function(event) {
      // Prevent the label's default behavior from interfering
      event.preventDefault(); 
      mobileNavToogle();
    });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Close mobile nav on overlay click
   */
  const navmenu = document.querySelector('#navmenu');
  if (navmenu) {
    navmenu.addEventListener('click', (e) => {
      if (e.target === navmenu) {
        mobileNavToogle();
      }
    });
  }
  
  /**
 * Animated Logo Text using Typed.js
 */
document.addEventListener('DOMContentLoaded', () => {

  // Add this new Typed instance for the logo
  new Typed('#animated-logo-text', {
    strings: ['Nightshade', 'Michael Neiketien'],
    typeSpeed: 80,   // Speed of typing
    backSpeed: 70,   // Speed of deleting
    backDelay: 2000, // Pause for 3 seconds after typing is complete
    startDelay: 100, // Small delay before the animation starts
    loop: true,      // Loop the animation indefinitely
    showCursor: false // Display the blinking cursor
  });

});

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Light/Dark Mode Toggle & Persistence
   */
  (function() {
    const themeToggle = document.querySelector('#toggle');
    if (!themeToggle) {
      return;
    }

    const body = document.querySelector('body');
    const savedTheme = localStorage.getItem('theme');

    // Apply saved theme on page load
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
      themeToggle.checked = true;
    }

    // Save theme preference on change
    themeToggle.addEventListener('change', function() {
      if (this.checked) {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
      } else {
        body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
      }
    });
  })();

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 3000); // Let the animation play for 3 seconds
      setTimeout(() => {
        preloader.remove();
      }, 3500); // Remove it after the 0.5s fade-out animation
    });
  }
  
  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
  
  
  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);
  
  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();

/**
   * New Web3Forms Contact Form with Custom Validation and Multi-Stage Loader
   */
  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    const alertContainer = document.getElementById('alert-container');

    // Function to show a slide-in alert
    const showAlert = (message, type = 'success') => {
      const alertDiv = document.createElement('div');
      alertDiv.className = `alert-toast alert-${type}`;
      const iconSvg = `<svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path></svg>`;
      alertDiv.innerHTML = `${iconSvg} <p>${message}</p>`;
      alertContainer.appendChild(alertDiv);
      setTimeout(() => alertDiv.classList.add('show'), 100);
      setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => alertDiv.remove(), 500);
      }, 5000);
    };

    // Form validation logic (remains the same)
    const validateForm = () => {
      let isValid = true;
      const fields = [
        { id: 'name_field', errorId: 'name-error', message: 'Please enter your full name.' },
        { id: 'email_field', errorId: 'email-error', message: 'Please enter a valid email address.' },
        { id: 'subject_field', errorId: 'subject-error', message: 'Please enter a subject.' },
        { id: 'message_field', errorId: 'message-error', message: 'Please enter your message.' }
      ];
      fields.forEach(field => {
        document.getElementById(field.errorId).style.display = 'none';
        document.getElementById(field.errorId).textContent = '';
      });
      fields.forEach(field => {
        const input = document.getElementById(field.id);
        const errorElement = document.getElementById(field.errorId);
        if (!input.value.trim()) {
          errorElement.textContent = field.message;
          errorElement.style.display = 'block';
          isValid = false;
        } else if (field.id === 'email_field' && !/^\S+@\S+\.\S+$/.test(input.value)) {
          errorElement.textContent = 'Please enter a valid email format.';
          errorElement.style.display = 'block';
          isValid = false;
        }
      });
      return isValid;
    };

    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (!validateForm()) {
        return; // Stop if validation fails
      }

      const formData = new FormData(contactForm);
      const object = {};
      formData.forEach((value, key) => { object[key] = value; });
      const json = JSON.stringify(object);
      
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const buttonText = submitButton.querySelector('.button-text');
      const sendingLoader = submitButton.querySelector('.button-loader-sending');
      const mailLoader = submitButton.querySelector('.button-loader-mail'); // <-- THIS LINE IS UPDATED

      // --- Start of Animation Sequence ---

      submitButton.disabled = true;
      buttonText.style.display = 'none';
      
      // Stage 1: Show <SENDING/> loader for 2 seconds
      sendingLoader.style.display = 'block';

      // Start the API call in the background.
      const apiPromise = fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      }).then(response => response.json());

      // Stage 2: Switch to Mail loader after 2 seconds
      setTimeout(() => {
        sendingLoader.style.display = 'none';
        mailLoader.style.display = 'flex'; // Use flex to enable centering
      }, 1500);

      // Stage 3: After another 3 seconds (total 5s), process the result
      setTimeout(() => {
        mailLoader.style.display = 'none';
        buttonText.style.display = 'block';
        submitButton.disabled = false;
        
        // Now, check the result of the API call
        apiPromise.then(data => {
          if (data.success) {
            showAlert('Your message has been sent successfully!', 'success');
            contactForm.reset();
          } else {
            console.log(data);
            showAlert(data.message || 'Something went wrong.', 'error');
          }
        }).catch(error => {
          console.log(error);
          showAlert('An error occurred. Please try again later.', 'error');
        });

      }, 5000); // 2000ms for stage 1 + 3000ms for stage 2
    });
  });
