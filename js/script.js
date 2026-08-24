/* ==========================================================================
   GANESHRAM — Portfolio JS (vanilla, no dependencies)
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------ Mobile menu ------------------------------ */
  var menuBtn = document.getElementById("menuBtn");
  var navLinks = document.getElementById("navLinks");

  function closeMenu() {
    menuBtn.classList.remove("open");
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("open");
      menuBtn.classList.toggle("open", isOpen);
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    document.querySelectorAll("[data-link]").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  /* --------------------------- Smooth-scroll nav --------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var offset = 70;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: "smooth" });
        history.replaceState(null, "", id);
      }
    });
  });

  /* --------------------------- Active nav highlight ------------------------- */
  var sections = document.querySelectorAll(".section");
  var navItems = document.querySelectorAll(".nav-link");

  function setActive() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (sec) {
      var top = sec.offsetTop;
      var bottom = top + sec.offsetHeight;
      var id = "#" + sec.id;
      if (scrollPos >= top && scrollPos < bottom) {
        navItems.forEach(function (a) {
          a.classList.toggle("active", a.getAttribute("href") === id);
        });
      }
    });
  }
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* ------------------------------- Typing effect ---------------------------- */
  var typedEl = document.getElementById("typed");
  if (typedEl) {
    var phrases = ["Information Technology", "Frontend Developer", "Backend Developer", "Beautiful Thinker","Ai Usage" ];
    var pIndex = 0, cIndex = 0, deleting = false;

    function type() {
      var current = phrases[pIndex];
      if (!deleting) {
        cIndex++;
        typedEl.textContent = current.slice(0, cIndex);
        if (cIndex === current.length) {
          deleting = true;
          setTimeout(type, 1300);
          return;
        }
      } else {
        cIndex--;
        typedEl.textContent = current.slice(0, cIndex);
        if (cIndex === 0) {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
        }
      }
      setTimeout(type, deleting ? 40 : 80);
    }
    type();
  }

  /* ------------------------------ Scroll reveal ----------------------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          entry.target.querySelectorAll(".skill-fill").forEach(function (bar) {
            var pct = bar.getAttribute("data-fill") || "0";
            requestAnimationFrame(function () { bar.style.width = pct + "%"; });
          });
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
      el.querySelectorAll(".skill-fill").forEach(function (bar) {
        bar.style.width = (bar.getAttribute("data-fill") || "0") + "%";
      });
    });
  }

  /* -------------------------------- Back to top ------------------------------ */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 480);
    }, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* --------------------------------- Footer year ------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* -------------------------------- Contact form ------------------------------ */
  var form = document.getElementById("contactForm");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.querySelector("#name").value.trim();
      var email = form.querySelector("#email").value.trim();
      var message = form.querySelector("#message").value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !message) {
        status.textContent = "Please fill in every field with a valid email.";
        return;
      }

      var subject = encodeURIComponent("Portfolio inquiry from " + name);
      var body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
      status.textContent = "Opening your email client…";
      window.location.href = "mailto:hello@ganeshram.dev?subject=" + subject + "&body=" + body;
      form.reset();
    });
  }
})();
