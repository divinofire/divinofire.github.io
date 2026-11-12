/* Product pages: picture gallery (click or swipe) and the phone buy bar */
(function () {
  "use strict";
  var g = document.querySelector("[data-gallery]");
  if (g) {
    var main = g.querySelector("[data-gallery-main]");
    var thumbs = [].slice.call(g.querySelectorAll("[data-src]"));
    var cur = 0;
    var show = function (i) {
      if (!thumbs.length) return;
      cur = (i + thumbs.length) % thumbs.length;
      var t = thumbs[cur];
      main.src = t.dataset.src;
      main.alt = t.dataset.alt || "";
      thumbs.forEach(function (b) { b.classList.toggle("is-on", b === t); });
    };
    thumbs.forEach(function (b, i) { b.addEventListener("click", function () { show(i); }); });
    // Swipe left/right on the big picture
    var x0 = null;
    main.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    main.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1));
      x0 = null;
    });
  }
  // Phones: keep the buy button at the bottom once the buy box scrolls away
  var box = document.querySelector("[data-buybox]"), bar = document.querySelector("[data-buybar]");
  if (box && bar && "IntersectionObserver" in window) {
    new IntersectionObserver(function (es) {
      bar.classList.toggle("show", !es[0].isIntersecting && es[0].boundingClientRect.top < 0);
    }).observe(box);
  }
})();
