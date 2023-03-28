export const AMASTY_XLANDING_PAGE_UI_CONFIG = {
  uiId: 'DEFAULT_ROOT',
  extensionDataConfigs: [
    {
      forHookId: 'header',
      extensionDataConfigs: [
        {
          uiId: 'PERFORMANCE_TESTING_STACK',
          extensionDataConfigs: [
            {
              uiId: 'CMS_BLOCKS',
              additionalData: [
                {
                  key: 'cms_block_id',
                  value: 'pwa_welcome_to_bed_king_dom',
                },
              ],
            },
          ],
        },
        {
          uiId: 'HEADER',
          additionalData: [
            {
              key: 'megamenu_id',
              value: '1',
            },
          ],
        },
      ],
    },
    {
      forHookId: 'main',
      extensionDataConfigs: [
        {
          uiId: 'AMASTY_LANDING_PAGE_CONTAINER',
          extensionDataConfigs: [
            {
              uiId: 'PRODUCTS',
              extensionDataConfigs: [
                {
                  forHookId: 'products',
                  extensionDataConfigs: [
                    {
                      uiId: 'KINGDOMBED_SERVICES',
                    },
                    {
                      uiId: 'AMASTY_LANDING_PAGE_BREADCRUMBS',
                    },
                    {
                      uiId: 'AMASTY_LANDING_PAGEL_INFO',
                    },
                    {
                      uiId: 'PRODUCTS_AGGREGATIONS',
                    },
                    {
                      uiId: 'PRODUCTS_FILTERS',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      forHookId: 'footer',
      extensionDataConfigs: [
        {
          uiId: 'PERFORMANCE_TESTING_STACK',
          extensionDataConfigs: [
            {
              uiId: 'FOOTER_DESKTOP_STACK',
              extensionDataConfigs: [
                {
                  uiId: 'CMS_BLOCKS',
                  additionalData: [
                    {
                      key: 'cms_block_id',
                      value: 'pwa_footer_desktop',
                    },
                  ],
                },
              ],
            },
            {
              uiId: 'FOOTER_MOBILE_STACK',
              extensionDataConfigs: [
                {
                  uiId: 'CMS_BLOCKS',
                  additionalData: [
                    {
                      key: 'cms_block_id',
                      value: 'pwa_footer_social',
                    },
                  ],
                },
                {
                  uiId: 'BEDKINGDOM_TRUST_PILOT_START_AND_REVIEW',
                },
                {
                  uiId: 'CMS_BLOCKS',
                  additionalData: [
                    {
                      key: 'cms_block_id',
                      value: 'pwa_footer_mobile',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
