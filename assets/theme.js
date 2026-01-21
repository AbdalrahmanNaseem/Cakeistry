// Theme Management System
const ThemeManager = {
  // Initialize theme system
  init() {
    this.setupColorVariables();
    this.loadSavedTheme();
    this.setupThemeToggle();
    this.setupSystemThemeListener();
  },

  // Setup CSS custom properties for both themes
  setupColorVariables() {
    const themeStyles = document.createElement('style');
    themeStyles.textContent = `
      :root {
        /* Dark Theme (Default) */
        --theme-bg-primary: rgb(15, 23, 42);
        --theme-bg-secondary: rgb(30, 41, 59);
        --theme-text-primary: rgb(255, 255, 255);
        --theme-text-secondary: rgb(203, 213, 225);
        --theme-text-tertiary: rgb(148, 163, 184);
        --theme-border: rgb(51, 65, 85);
        --theme-card-bg: rgba(30, 41, 59, 0.5);
        --theme-hover-bg: rgb(30, 41, 59);
        --theme-input-bg: rgb(30, 41, 59);
        --theme-input-border: rgb(51, 65, 85);
      }

      html.light {
        /* Light Theme */
        --theme-bg-primary: rgb(255, 255, 255);
        --theme-bg-secondary: rgb(248, 250, 252);
        --theme-text-primary: rgb(15, 23, 42);
        --theme-text-secondary: rgb(51, 65, 85);
        --theme-text-tertiary: rgb(100, 116, 139);
        --theme-border: rgb(226, 232, 240);
        --theme-card-bg: rgba(248, 250, 252, 0.8);
        --theme-hover-bg: rgb(248, 250, 252);
        --theme-input-bg: rgb(248, 250, 252);
        --theme-input-border: rgb(226, 232, 240);
      }
    `;
    document.head.appendChild(themeStyles);
  },

  // Load saved theme from localStorage
  loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(prefersDark ? 'dark' : 'light');
    }
  },

  // Set the theme
  setTheme(theme) {
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.classList.remove('light');
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
      localStorage.setItem('theme', 'light');
    }

    // Update button text
    this.updateToggleButton(theme);
    
    // Trigger custom event
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: { theme } }));
  },

  // Toggle between themes
  toggle() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
  },

  // Update toggle button appearance
  updateToggleButton(theme) {
    const buttons = document.querySelectorAll('[data-theme-toggle]');
    buttons.forEach(btn => {
      if (theme === 'dark') {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12a9 9 0 11-18 0 9 9 0 0118 0zm0 0v-2.25m-6.364.386l1.591 1.591M12 21v-2.25m6.364-.386l-1.591-1.591M12 12.75a.75.75 0 100-1.5.75.75 0 000 1.5z" />
          </svg>
        `;
        btn.title = 'Switch to Light Mode';
      } else {
        btn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
          </svg>
        `;
        btn.title = 'Switch to Dark Mode';
      }
    });
  },

  // Setup theme toggle buttons
  setupThemeToggle() {
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-theme-toggle]')) {
        this.toggle();
      }
    });
  },

  // Listen for system theme changes
  setupSystemThemeListener() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', (e) => {
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  },

  // Get current theme
  getCurrentTheme() {
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  }
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
  ThemeManager.init();
}

// Expose to window for external use
window.ThemeManager = ThemeManager;
