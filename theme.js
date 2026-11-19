(() => {
  const storageKey = 'fucjetc-theme';
  const root = document.documentElement;
  const themeColor = document.querySelector('meta[name="theme-color"]');
  let theme = 'dark';

  try {
    if (localStorage.getItem(storageKey) === 'light') theme = 'light';
  } catch {
    // The theme still works when storage is unavailable.
  }

  function applyTheme() {
    root.dataset.theme = theme;
    themeColor.content = theme === 'light' ? '#f5f8ff' : '#080f20';
  }

  applyTheme();

  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-theme-toggle]');
    const label = toggle.querySelector('[data-theme-label]');

    function updateToggle() {
      label.textContent = label.dataset[theme === 'dark' ? 'light' : 'dark'];
    }

    updateToggle();
    toggle.hidden = false;

    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      applyTheme();
      updateToggle();
      try {
        localStorage.setItem(storageKey, theme);
      } catch {
        // Keep the current selection for this page session.
      }
    });
  }, { once: true });
})();
