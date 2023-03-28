import { generateAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CONTENT_CMS_PAGES';
const getCmsPages = generateAction<{}, { cmsPages: any[] }>(
  'GET_CMS_PAGES',
  PREFIX
);

export const getCmsPageAction = getCmsPages.ACTION;
export const getCmsPageAfterAction = getCmsPages.AFTER;
export const getCmsPageErrorAction = getCmsPages.ERROR;
