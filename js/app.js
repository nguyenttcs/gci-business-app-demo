const navItems  = document.querySelectorAll('.nav-item');
const tabPanels = document.querySelectorAll('.tab-panel');

navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;

    navItems.forEach(b => b.classList.remove('active'));
    tabPanels.forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    const panel = document.getElementById(`tab-${target}`);
    if (panel) panel.classList.add('active');
  });
});
