/* ============================================================
   Mackenzie Li — main.js
   ============================================================ */

(function () {
  'use strict';

  /* ---- Splash screen — typewriter + glitch ---- */
  var splash = document.getElementById('splash');
  if (splash) {
    document.body.style.overflow = 'hidden';

    var glitchEl  = splash.querySelector('.splash-glitch');
    var typedEl   = splash.querySelector('.splash-typed');
    var subEl     = splash.querySelector('.splash-sub');
    var fullText  = 'Mackenzie Li';
    var i = 0;

    function typeNext() {
      if (i < fullText.length) {
        typedEl.textContent += fullText[i];
        glitchEl.setAttribute('data-text', typedEl.textContent);
        i++;
        setTimeout(typeNext, 80);
      } else {
        // Typing done — show subtitle, pause, then glitch
        subEl.classList.add('visible');
        setTimeout(function () {
          glitchEl.classList.add('glitching');
        }, 450);
      }
    }

    setTimeout(typeNext, 350);

    // Exit after typing (~1260ms) + pause (450ms) + glitch (1300ms) + buffer
    setTimeout(function () {
      splash.classList.add('hide');
      setTimeout(function () {
        document.body.style.overflow = '';
        splash.remove();
      }, 600);
    }, 3200);
  }

  /* ---- Nav: add .scrolled class on scroll ---- */
  const nav = document.getElementById('nav');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

})();
