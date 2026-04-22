const navItems  = document.querySelectorAll('.nav-item');
const tabPanels = document.querySelectorAll('.tab-panel');
const pageTitle = document.getElementById('page-title');
const backBtn   = document.getElementById('back-btn');

const TAB_TITLES = { home: 'Home', booking: 'Booking', message: 'Message', report: 'Report' };
let activeMainTab = 'home';
let isAnimating   = false;

// ── Funnel bars: start at 0, animate to data-w on Report entry ──
const funnelBars = document.querySelectorAll('.r-fstep-fill');
funnelBars.forEach(el => { el.style.width = '0'; });

function animateFunnelBars() {
  funnelBars.forEach((el, i) => {
    setTimeout(() => { el.style.width = el.dataset.w; }, i * 130);
  });
}

function resetFunnelBars() {
  funnelBars.forEach(el => { el.style.width = '0'; });
}

// ── Add animation class, remove after it finishes ──
function animatePanel(panel, cls) {
  panel.classList.add(cls);
  panel.addEventListener('animationend', () => panel.classList.remove(cls), { once: true });
}

// ── Nav icon swap ──
function updateNavIcons(activeTab) {
  navItems.forEach(btn => {
    const tab = btn.dataset.tab;
    const img = btn.querySelector('.nav-icon img');
    if (!img) return;
    img.src = tab === activeTab
      ? `assets/icons/icon-${tab}-active.svg`
      : `assets/icons/icon-${tab}.svg`;
  });
}

// ── Navigate to a main tab (with fade-in) ──
function goToTab(tabName) {
  navItems.forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
  if (btn) btn.classList.add('active');
  updateNavIcons(tabName);

  tabPanels.forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(`tab-${tabName}`);
  if (panel) {
    panel.classList.add('active');
    animatePanel(panel, 'anim-fade');
  }

  pageTitle.textContent = TAB_TITLES[tabName] || tabName;
  backBtn.classList.add('hidden');
  activeMainTab = tabName;

  if (tabName === 'report') {
    resetFunnelBars();
    setTimeout(animateFunnelBars, 80);
  }
}

// ── Period filter ──
document.querySelectorAll('.r-period-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.closest('.r-period').querySelectorAll('.r-period-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── Bottom nav clicks ──
navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    if (!document.getElementById(`tab-${target}`)) return;
    goToTab(target);
  });
});

// ── Sub-pages ──
const SUBPAGE_TITLES = {
  'ai-marketing': 'AI Marketing Report',
  'go-pos':       'Go POS',
  'go-checkin':   'Go Checkin',
  'bamboo':       'Bamboo Dot',
  'manage':       'GCI Ecosystem',
};

const COMING_SOON = new Set(['go-pos', 'go-checkin', 'bamboo', 'manage']);

document.querySelectorAll('[data-subpage]').forEach(el => {
  el.addEventListener('click', () => {
    if (isAnimating) return;

    const subpage = el.dataset.subpage;
    const title   = SUBPAGE_TITLES[subpage] || subpage;
    let panelId;

    if (COMING_SOON.has(subpage)) {
      document.getElementById('cs-app-name').textContent = title;
      panelId = 'tab-coming-soon';
    } else {
      panelId = `tab-${subpage}`;
    }

    tabPanels.forEach(p => p.classList.remove('active'));
    const panel = document.getElementById(panelId);
    if (panel) {
      panel.classList.add('active');
      animatePanel(panel, 'anim-enter');
    }

    pageTitle.textContent = title;
    backBtn.classList.remove('hidden');
  });
});

// ── Back button: slide out current sub-page, fade in main tab ──
backBtn.addEventListener('click', () => {
  if (isAnimating) return;

  const currentPanel = document.querySelector('.tab-panel.active');

  // Update header immediately so it feels responsive
  navItems.forEach(b => b.classList.remove('active'));
  const navBtn = document.querySelector(`.nav-item[data-tab="${activeMainTab}"]`);
  if (navBtn) navBtn.classList.add('active');
  updateNavIcons(activeMainTab);
  pageTitle.textContent = TAB_TITLES[activeMainTab] || activeMainTab;
  backBtn.classList.add('hidden');

  if (currentPanel) {
    isAnimating = true;
    currentPanel.classList.add('anim-exit');
    currentPanel.addEventListener('animationend', () => {
      currentPanel.classList.remove('anim-exit');
      isAnimating = false;
      goToTab(activeMainTab);
    }, { once: true });
  } else {
    goToTab(activeMainTab);
  }
});
