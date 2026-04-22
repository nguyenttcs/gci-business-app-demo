const navItems  = document.querySelectorAll('.nav-item');
const tabPanels = document.querySelectorAll('.tab-panel');
const pageTitle = document.getElementById('page-title');
const backBtn   = document.getElementById('back-btn');

const TAB_TITLES = { home: 'Home', booking: 'Booking', message: 'Message', report: 'Report' };
let activeMainTab = 'home';

function showPanel(id) {
  tabPanels.forEach(p => p.classList.remove('active'));
  const panel = document.getElementById(id);
  if (panel) panel.classList.add('active');
}

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

function goToTab(tabName) {
  navItems.forEach(b => b.classList.remove('active'));
  const btn = document.querySelector(`.nav-item[data-tab="${tabName}"]`);
  if (btn) btn.classList.add('active');
  updateNavIcons(tabName);
  showPanel(`tab-${tabName}`);
  pageTitle.textContent = TAB_TITLES[tabName] || tabName;
  backBtn.classList.add('hidden');
  activeMainTab = tabName;
}

navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    if (!document.getElementById(`tab-${target}`)) return;
    goToTab(target);
  });
});

// Sub-pages
document.querySelectorAll('[data-subpage]').forEach(el => {
  el.addEventListener('click', () => {
    const subpage = el.dataset.subpage;
    const titles  = { 'ai-marketing': 'AI Marketing Report' };
    showPanel(`tab-${subpage}`);
    pageTitle.textContent = titles[subpage] || subpage;
    backBtn.classList.remove('hidden');
  });
});

// Back button → return to last main tab
backBtn.addEventListener('click', () => {
  goToTab(activeMainTab);
});
