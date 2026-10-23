// Reading progress bar and active-chapter highlighting for case study pages.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  var chapters = links.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  var barFill = document.querySelector('.bar-fill');
  var barTrack = document.querySelector('.bar-track');
  var tocFill = document.querySelector('.toc-fill');
  var tocPct = document.querySelector('.toc-pct');
  var nowN = document.querySelector('.bar-now .mono');
  var nowLabel = document.querySelector('.bar-now-label');
  var last = { pct: -1, active: -1 };

  function update() {
    var doc = document.scrollingElement || document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    var pct = max > 0 ? Math.min(100, Math.max(0, Math.round((doc.scrollTop / max) * 100))) : 0;
    var lim = window.innerHeight * 0.35;
    var active = 0;
    chapters.forEach(function (el, i) {
      if (el && el.getBoundingClientRect().top < lim) active = i;
    });

    if (pct !== last.pct) {
      barFill.style.width = pct + '%';
      tocFill.style.width = pct + '%';
      barTrack.setAttribute('aria-valuenow', pct);
      tocPct.textContent = pct + '% read';
    }
    if (active !== last.active) {
      links.forEach(function (a, i) {
        a.classList.toggle('on', i === active);
        if (i === active) a.setAttribute('aria-current', 'location');
        else a.removeAttribute('aria-current');
      });
      nowN.textContent = links[active].querySelector('.mono').textContent;
      nowLabel.textContent = links[active].lastChild.textContent;
    }
    last = { pct: pct, active: active };
  }

  var queued = false;
  function onScroll() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; update(); });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
