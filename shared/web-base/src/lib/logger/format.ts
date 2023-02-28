import { formatContext } from './console-template/format-content';
import { formatProcessingSSR } from './console-template/format-fetch-data-ssr';
import { formatImportant } from './console-template/format-important';

export const format = {
  important: formatImportant,
  context: formatContext,
  processSSR: formatProcessingSSR,
};
