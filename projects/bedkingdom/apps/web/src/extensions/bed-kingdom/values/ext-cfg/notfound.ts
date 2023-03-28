export const NOT_FOUND_UI_CFG = {
  uiId: 'DEFAULT_ROOT',
  extensionDataConfigs: [
    {
      forHookId: 'header',
      extensionDataConfigs: [
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
          uiId: '404',
          extensionDataConfigs: [],
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
