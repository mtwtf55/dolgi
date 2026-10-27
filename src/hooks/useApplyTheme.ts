import { useSettingsStore } from '@/stores/use-settings-store';
import { useEffect } from 'react';

const DARK_MEDIA_QUERY = '(prefers-color-scheme: dark)';
const LIGHT_THEME_COLOR = '#ffffff';
const DARK_THEME_COLOR = '#141414';

export const useApplyTheme = () => {
  const theme = useSettingsStore((state) => state.theme);

  useEffect(() => {
    const mediaQuery = window.matchMedia(DARK_MEDIA_QUERY);

    const apply = () => {
      const isDark = theme === 'dark' || (theme === 'system' && mediaQuery.matches);
      const root = document.documentElement;

      root.classList.toggle('dark', isDark);
      root.style.colorScheme = isDark ? 'dark' : 'light';
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute('content', isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
    };

    apply();
    mediaQuery.addEventListener('change', apply);

    return () => mediaQuery.removeEventListener('change', apply);
  }, [theme]);
};
