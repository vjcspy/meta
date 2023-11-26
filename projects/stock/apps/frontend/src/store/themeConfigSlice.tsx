import themeValue from '@src/value/theme.value';
import { createSlice } from '@stock/packages-redux';

const initialState = {
  isDarkMode: false,
  sidebar: false,
  theme: themeValue.theme,
  menu: themeValue.menu,
  layout: themeValue.layout,
  rtlClass: themeValue.rtlClass,
  animation: themeValue.animation,
  navbar: themeValue.navbar,
  locale: themeValue.locale,
  semidark: themeValue.semidark,
  languageList: [
    { code: 'zh', name: 'Chinese' },
    { code: 'da', name: 'Danish' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'el', name: 'Greek' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'it', name: 'Italian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'pl', name: 'Polish' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'es', name: 'Spanish' },
    { code: 'sv', name: 'Swedish' },
    { code: 'tr', name: 'Turkish' },
  ],
  themeDemo: '0',
};

const themeValueSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    toggleTheme(state, { payload }) {
      payload = payload || state.theme; // light | dark | system
      localStorage.setItem('theme', payload);
      state.theme = payload;
      if (payload === 'light') {
        state.isDarkMode = false;
      } else if (payload === 'dark') {
        state.isDarkMode = true;
      } else if (payload === 'system') {
        if (
          window.matchMedia &&
          window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
          state.isDarkMode = true;
        } else {
          state.isDarkMode = false;
        }
      }

      if (state.isDarkMode) {
        document.querySelector('body')?.classList.add('dark');
      } else {
        document.querySelector('body')?.classList.remove('dark');
      }
    },
    toggleMenu(state, { payload }) {
      payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
      state.sidebar = false; // reset sidebar state
      localStorage.setItem('menu', payload);
      state.menu = payload;
    },
    toggleLayout(state, { payload }) {
      payload = payload || state.layout; // full, boxed-layout
      localStorage.setItem('layout', payload);
      state.layout = payload;
    },
    toggleRTL(state, { payload }) {
      payload = payload || state.rtlClass; // rtl, ltr
      localStorage.setItem('rtlClass', payload);
      state.rtlClass = payload;
      document
        .querySelector('html')
        ?.setAttribute('dir', state.rtlClass || 'ltr');
    },
    toggleAnimation(state, { payload }) {
      payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
      payload = payload?.trim();
      localStorage.setItem('animation', payload);
      state.animation = payload;
    },
    toggleNavbar(state, { payload }) {
      payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
      localStorage.setItem('navbar', payload);
      state.navbar = payload;
    },
    toggleSemidark(state, { payload }) {
      payload = payload === true || payload === 'true';
      localStorage.setItem('semidark', payload);
      state.semidark = payload;
    },
    toggleLocale(state, { payload }) {
      payload = payload || state.locale;
      localStorage.setItem('i18nextLng', payload);
      state.locale = payload;
    },
    toggleSidebar(state) {
      state.sidebar = !state.sidebar;
    },

    setPageTitle(state, { payload }) {
      document.title = `${payload} | Meta`;
    },

    toggleThemeDemo(
      state,
      {
        payload,
      }: {
        payload: {
          enable: '1' | '0';
        };
      },
    ) {
      const isEnable = payload.enable || '0';
      localStorage.setItem('themeDemo', isEnable);
      state.themeDemo = isEnable;
    },
  },
});

export const {
  toggleTheme,
  toggleMenu,
  toggleLayout,
  toggleRTL,
  toggleAnimation,
  toggleNavbar,
  toggleSemidark,
  toggleSidebar,
  setPageTitle,
  toggleThemeDemo,
} = themeValueSlice.actions;

export default themeValueSlice.reducer;
