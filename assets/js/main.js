/* Divine Enow · site behaviour (no libraries needed) */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");
  var cfg = window.SITE_CONFIG || {};

  /* ---- Contact links from site-config.js ---- */
  document.querySelectorAll("[data-link]").forEach(function (el) {
    var key = el.getAttribute("data-link");
    var value = cfg[key];
    if (!value) { el.hidden = true; return; }
    if (key === "email") {
      el.href = "mailto:" + value;
      var label = el.querySelector("[data-label]");
      if (label) label.textContent = value;
    } else {
      el.href = value;
      var l = el.querySelector("[data-label]");
      if (l) l.textContent = value.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    }
    el.hidden = false;
  });

  /* ---- CV button: shown only if the PDF actually exists ---- */
  var cvButtons = document.querySelectorAll("[data-cv]");
  if (cfg.cv && cvButtons.length && window.fetch && location.protocol !== "file:") {
    fetch(cfg.cv, { method: "HEAD", cache: "no-store" }).then(function (r) {
      if (r.ok) cvButtons.forEach(function (b) { b.href = cfg.cv; b.hidden = false; });
    }).catch(function () {});
  }

  /* ---- Images: if a picture is missing, keep the branded placeholder ---- */
  document.querySelectorAll(".media img").forEach(function (img) {
    function drop() { img.remove(); }
    if (img.complete && img.naturalWidth === 0) drop();
    else img.addEventListener("error", drop);
  });

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  function closeNav() { doc.classList.remove("nav-open"); if (toggle) toggle.setAttribute("aria-expanded", "false"); }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = doc.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.querySelectorAll(".site-nav a").forEach(function (a) { a.addEventListener("click", closeNav); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });
    window.addEventListener("resize", function () { if (window.innerWidth > 900) closeNav(); });
  }

  /* ---- Header shadow on scroll ---- */
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Highlight the current section in the menu ---- */
  var links = Array.prototype.slice.call(document.querySelectorAll(".nav-list a[href^='#']"));
  if ("IntersectionObserver" in window && links.length) {
    var map = {};
    links.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && map[en.target.id]) {
          links.forEach(function (a) { a.classList.remove("active"); });
          map[en.target.id].classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
  }

  /* ---- Gentle reveal on scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Footer year ---- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
