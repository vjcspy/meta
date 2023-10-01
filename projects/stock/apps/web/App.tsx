import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import type { IRootState } from './store';
import {
    toggleAnimation,
    toggleLayout,
    toggleMenu,
    toggleNavbar,
    toggleRTL,
    toggleSemidark,
    toggleTheme,
} from './store/themeConfigSlice';

function App({ children }: PropsWithChildren) {
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const dispatch = useDispatch();

    // Default theme config
    useEffect(() => {
        dispatch(
            toggleTheme(localStorage.getItem('theme') || themeConfig.theme),
        );
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
            toggleSemidark(
                localStorage.getItem('semidark') || themeConfig.semidark,
            ),
        );

        dispatch(
            toggleNavbar(
                localStorage.getItem('themeDemo') || themeConfig.themeDemo,
            ),
        );
    }, []);

    return (
        <div
            className={`${(themeConfig.sidebar && 'toggle-sidebar') || ''} ${
                themeConfig.menu
            } ${themeConfig.layout} ${
                themeConfig.rtlClass
            } main-section relative font-nunito text-sm font-normal antialiased`}
        >
            {children}
        </div>
    );
}

export default App;
