import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const UI_STOREFRONT_CONTENT_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'NAVIGATOR',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/navigator/Navigator'
        )
    ),
    priorityFn: () => 99,
  },
  {
    uiId: 'NAVIGATOR_FLYOUT',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/navigator/NavigatorFlyout'
        )
    ),
    priorityFn: () => 99,
  },
  {
    uiId: 'NAVIGATOR_SELECTION',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/navigator/NavigatorSelection'
        )
    ),
    hoc: ['withNavigatorSelection'],
    priorityFn: () => 99,
  },
  {
    uiId: 'NAVIGATOR_SELECTION_TEXT',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/navigator/selection-type/NavigatorSelectionText'
        )
    ),
    hoc: ['WithNavigatorSelectionActionProps'],
    priorityFn: () => 99,
  },
  {
    uiId: 'NAVIGATOR_SELECTION_ATTRIBUTE',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/navigator/selection-type/NavigatorSelectionAttribute'
        )
    ),
    hoc: ['WithNavigatorSelectionActionProps'],
    priorityFn: () => 99,
  },
  {
    uiId: 'NAVIGATOR_SELECTION_LINK',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/navigator/selection-type/NavigatorSelectionLink'
        )
    ),
    hoc: ['WithNavigatorSelectionActionProps'],
    priorityFn: () => 99,
  },
  // HEADER_FOOTER
  {
    uiId: 'HEADER',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/header/Header'
        )
    ),
  },
  {
    uiId: 'HEADER_LOGO',
    component: dynamic(
      () =>
        import('@main/ui-storefront/src/modules/content/components/header/Logo')
    ),
  },
  {
    uiId: 'HEADER_ACCOUNT',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/header/Account'
        )
    ),
  },
  {
    uiId: 'HEADER_SEARCH_BAR',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/header/seachbar/SearchBar'
        )
    ),
  },
  {
    uiId: 'HEADER_SEARCH_BAR_SEARCH_FIELD',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/header/seachbar/SearchField'
        )
    ),
  },
  {
    uiId: 'HEADER_SEARCH_BAR_AUTO_COMPLETE',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/header/seachbar/SearchField'
        )
    ),
  },
  {
    uiId: 'FOOTER',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/footer/Footer'
        )
    ),
  },

  // SWIPER
  {
    uiId: 'SIMPLE_SLIDER',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/swiper/SimpleSlider'
        )
    ),
  },

  {
    uiId: 'LOADING_INDICATOR',
    component: dynamic(
      () =>
        import(
          '@main/ui-storefront/src/modules/content/components/loading-indicator/indicator'
        )
    ),
    priority: 1,
  },
];
