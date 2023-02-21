import reduce from 'lodash/reduce';
import reverse from 'lodash/reverse';

export function withAdapter<T>(
  PageComponent: T,
  adapterOptions: any = {},
  adapters: any[] = []
): T {
  return reduce(
    reverse(adapters),
    (page, adapter) => {
      return adapter(page, adapterOptions);
    },
    PageComponent
  );
}
