(() => {
  const htmlEl = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');

  // 1) On load: check saved, else system
  const saved = localStorage.getItem('theme');
  const systemPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const currentTheme = saved || systemPref;
  htmlEl.setAttribute('data-bs-theme', currentTheme);
  toggleBtn.innerHTML = currentTheme === 'dark' ? '<i class="bi bi-moon-stars-fill"></i>' : '<i class="bi bi-brightness-high-fill"></i>';

  // 2) Toggle handler
  toggleBtn.addEventListener('click', () => {
    const next = htmlEl.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
    htmlEl.setAttribute('data-bs-theme', next);
    localStorage.setItem('theme', next);
    toggleBtn.innerHTML = next === 'dark' ? '<i class="bi bi-moon-stars-fill"></i>' : '<i class="bi bi-brightness-high-fill"></i>';
  });
})();
