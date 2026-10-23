// Mobile menu and design-process tabs for the home page.
(function () {
  var btn = document.getElementById('menu-btn');
  var label = document.getElementById('menu-label');
  var panel = document.getElementById('mobile-menu');

  function setMenu(open) {
    panel.hidden = !open;
    btn.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Close' : 'Menu';
  }

  btn.addEventListener('click', function () { setMenu(panel.hidden); });
  panel.addEventListener('click', function (e) {
    if (e.target.closest('a')) setMenu(false);
  });

  var steps = [
    { n: '01', summary: 'Understand the people, the business and the constraints before touching pixels.', output: 'Research plan · interview notes · opportunity map', activities: ['Stakeholder conversations', 'User interviews', 'Competitive audit', 'Analytics & support-ticket review'] },
    { n: '02', summary: 'Turn raw findings into one sharp problem the whole team can rally around.', output: 'Problem statement · persona · success metrics', activities: ['Affinity mapping', 'Personas', 'Journey maps', 'How-might-we framing'] },
    { n: '03', summary: 'Shape the information and the paths through it before deciding how anything looks.', output: 'Sitemap · task flows · wireframes', activities: ['Information architecture', 'Card sorting', 'User flows', 'Low-fidelity wireframes'] },
    { n: '04', summary: 'Build the system first, then the screens — so every state is consistent and easy to hand off.', output: 'Design system · hi-fi screens · prototype', activities: ['Tokens & components', 'High-fidelity UI', 'Interactive prototypes', 'Accessibility checks'] },
    { n: '05', summary: 'Test with real users, iterate, and work alongside developers until it is live and measured.', output: 'Test report · annotated specs · release notes', activities: ['Usability testing', 'Iteration', 'Dev handoff & QA', 'Post-launch metrics'] }
  ];

  var tabs = document.querySelectorAll('#process-tabs .step-tab');
  var panelEl = document.getElementById('process-panel');
  var acts = document.getElementById('ps-acts');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var s = steps[Number(tab.dataset.step)];
      tabs.forEach(function (t) {
        var on = t === tab;
        t.classList.toggle('on', on);
        t.setAttribute('aria-pressed', String(on));
      });
      document.getElementById('ps-n').textContent = s.n;
      document.getElementById('ps-summary').textContent = s.summary;
      document.getElementById('ps-output').textContent = s.output;
      acts.replaceChildren.apply(acts, s.activities.map(function (a) {
        var li = document.createElement('li');
        li.textContent = a;
        return li;
      }));
      // Replay the panel's entrance animation.
      panelEl.style.animation = 'none';
      void panelEl.offsetWidth;
      panelEl.style.animation = '';
    });
  });
})();
