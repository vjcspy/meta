export interface CoreConfig {
  checkout: {
    'checkout/options/guest_checkout': '0';
  };
}

export const CoreConfigFactory = (): CoreConfig => ({
  checkout: {
    'checkout/options/guest_checkout': '0',
  },
});
