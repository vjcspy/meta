'use client';
import type { IRootState } from '@src/store';
import {
  toggleAnimation,
  toggleLayout,
  toggleMenu,
  toggleNavbar,
  toggleRTL,
  toggleSemidark,
  toggleTheme,
  toggleThemeDemo,
} from '@src/store/themeConfigSlice';
import { useDispatch, useSelector } from '@stock/packages-redux';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';

export default function ThemeConfig({ children }: PropsWithChildren) {
  const themeConfig = useSelector((state: IRootState) => state.themeConfig);
  const dispatch = useDispatch();

  // Default theme config
  useEffect(() => {
    dispatch(toggleTheme(localStorage.getItem('theme') || themeConfig.theme));
    dispatch(toggleMenu(localStorage.getItem('menu') || themeConfig.menu));
    dispatch(
      toggleLayout(localStorage.getItem('layout') || themeConfig.layout),
    );
    dispatch(
      toggleRTL(localStorage.getItem('rtlClass') || themeConfig.rtlClass),
    );
    dispatch(
      toggleAnimation(
        localStorage.getItem('animation') || themeConfig.animation,
      ),
    );
    dispatch(
      toggleNavbar(localStorage.getItem('navbar') || themeConfig.navbar),
    );
    dispatch(
      toggleSemidark(localStorage.getItem('semidark') || themeConfig.semidark),
    );

    dispatch(
      toggleThemeDemo({
        enable: (localStorage.getItem('themeDemo') ||
          themeConfig.themeDemo) as any,
      }),
    );
  }, []);
  return (
    <>
      <div
        className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${
          themeConfig.menu
        } ${themeConfig.layout} ${
          themeConfig.rtlClass
        } main-section relative font-nunito text-sm font-normal antialiased`}
      >
        {children}
      </div>
    </>
  );
}
