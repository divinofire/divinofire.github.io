/* Posts: share buttons, tag filter on /posts/, click-to-play YouTube */
(function () {
  "use strict";

  /* ---- Share ---- */
  var toast;
  function say(msg) {
    if (!toast) { toast = document.createElement("div"); toast.className = "share-toast"; toast.setAttribute("role", "status"); document.body.appendChild(toast); }
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(say.t);
    say.t = setTimeout(function () { toast.classList.remove("show"); }, 1800);
  }
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { say("Link copied"); }, function () { fallback(text); });
    } else { fallback(text); }
  }
  function fallback(text) {
    var a = document.createElement("textarea");
    a.value = text; a.setAttribute("readonly", ""); a.style.position = "absolute"; a.style.left = "-9999px";
    document.body.appendChild(a); a.select();
    try { document.execCommand("copy"); say("Link copied"); } catch (e) { window.prompt("Copy this link:", text); }
    a.remove();
  }
  function closeAll(except) {
    document.querySelectorAll(".share-menu").forEach(function (m) {
      if (m !== except) { m.hidden = true; var b = m.parentNode.querySelector(".share-btn"); if (b) b.setAttribute("aria-expanded", "false"); }
    });
  }
  // Phones and tablets get the device's own share sheet (WhatsApp, Telegram, ...)
  var touch = window.matchMedia && window.matchMedia("(pointer: coarse)").matches;

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".share-btn");
    if (btn) {
      var data = { title: btn.dataset.title, text: btn.dataset.text, url: btn.dataset.url };
      if (touch && navigator.share) {
        navigator.share(data).catch(function () {});
        return;
      }
      var menu = btn.parentNode.querySelector(".share-menu");
      closeAll(menu);
      menu.hidden = !menu.hidden;
      btn.setAttribute("aria-expanded", menu.hidden ? "false" : "true");
      return;
    }
    var c = e.target.closest("[data-copy]");
    if (c) {
      var b = c.closest(".share").querySelector(".share-btn");
      copy(b.dataset.url);
      closeAll();
      return;
    }
    if (!e.target.closest(".share-menu")) closeAll();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });

  /* ---- Tag filter on /posts/ ---- */
  var filters = document.querySelector(".post-filters");
  if (filters) {
    var rows = document.querySelectorAll(".post-row");
    var empty = document.querySelector("[data-empty]");
    var apply = function (tag) {
      var shown = 0;
      filters.querySelectorAll("[data-tag]").forEach(function (b) { b.classList.toggle("is-on", b.dataset.tag === tag); });
      rows.forEach(function (r) {
        var ok = !tag || (r.dataset.tags || "").split("|").indexOf(tag) > -1;
        r.hidden = !ok; if (ok) shown++;
      });
      if (empty) empty.hidden = shown > 0;
    };
    filters.addEventListener("click", function (e) {
      var b = e.target.closest("[data-tag]");
      if (!b) return;
      apply(b.dataset.tag);
      var u = new URL(location.href);
      if (b.dataset.tag) u.searchParams.set("tag", b.dataset.tag); else u.searchParams.delete("tag");
      history.replaceState(null, "", u);
    });
    var start = new URLSearchParams(location.search).get("tag");
    if (start) apply(start);
  }

  /* ---- YouTube: load the player only when asked ---- */
  document.querySelectorAll(".yt").forEach(function (box) {
    var link = box.querySelector(".yt-start");
    link.addEventListener("click", function (e) {
      e.preventDefault();
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + encodeURIComponent(box.dataset.id) + "?autoplay=1&rel=0";
      f.title = link.querySelector(".yt-title").textContent;
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      f.allowFullscreen = true;
      box.innerHTML = "";
      box.appendChild(f);
    });
  });
})();
