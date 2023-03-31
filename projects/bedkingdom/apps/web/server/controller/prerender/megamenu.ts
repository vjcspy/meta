import { Registry } from 'chitility';
import { CliLogger } from 'chitility/dist/lib/logger/CliLogger';
import { CacheFile } from 'chitility/dist/util/cache-file';

const logger = new CliLogger({
  context: 'API: Prerender Megamenu',
  file: true,
});
const CACHE_PREFIX = 'PRERENDER_MEAGEMENU_ID_';
export default async function megamenuController(req: any, res: any) {
  const { body, method } = req;
  if (method === 'POST') {
    try {
      const { megamenu, origin } = body;
      if (origin && Array.isArray(megamenu) && megamenu.length > 0) {
        Registry.getInstance().register('PRERENDER_ORIGIN', origin);
        setTimeout(() => {
          resolve(megamenu);
        });
      }
    } catch (e) {
      //EMPTY
      logger.error(e);
    }
  }

  return res.status(200).json({ status: 'processing' });
}

const resolve = async (megamenu: any[]) => {
  for (const menuItem of megamenu) {
    await resolveItem(menuItem);
  }
};

const resolveItem = async (menuItem: any) => {
  await triggerRenderItem(menuItem);
  if (Array.isArray(menuItem.children) && menuItem.children.length > 0) {
    await resolve(menuItem.children);
  }
};

const triggerRenderItem = async (menuItem: any) => {
  if (menuItem?.id) {
    const CACHE_KEY = CACHE_PREFIX + menuItem.id;
    const cachedMegamenu = (await CacheFile.get(CACHE_KEY)) ?? {
      retry: 0,
    };
    if (
      cachedMegamenu &&
      (cachedMegamenu?.success === true ||
        (cachedMegamenu?.retry && cachedMegamenu.retry > 5))
    ) {
      return;
    } else {
      cachedMegamenu.retry = cachedMegamenu.retry + 1;

      switch (menuItem.link_type) {
        case 'category_link':
          if (typeof menuItem.link === 'string' && menuItem.link) {
            const link =
              menuItem.link.charAt(0) === '/'
                ? menuItem.link
                : `/${menuItem.link}`;
            const url = `${Registry.getInstance().registry(
              'PRERENDER_ORIGIN'
            )}${link}`;

            cachedMegamenu.type = 'category_link';
            cachedMegamenu.url = url;
            try {
              await fetch(url);
              logger.info(
                `pre-rendered menu ${menuItem.name} category_link ${url}`
              );
              cachedMegamenu.success = true;
            } catch (e) {
              logger.error(
                `Error: prerender menu ${menuItem.name} category_link ${url}`
              );
            }
          }
          break;
        case 'custom_link':
          if (menuItem?.link) {
            cachedMegamenu.type = 'custom_link';
            cachedMegamenu.link = menuItem?.link;
            try {
              await fetch(menuItem?.link);
              logger.info(
                `pre-rendered menu ${menuItem.name} custom_link ${menuItem.link}`
              );
              cachedMegamenu.success = true;
            } catch (e) {
              logger.error(
                `Error: pre-render menu ${menuItem.name} custom_link ${menuItem.link}`
              );
            }
          }
      }

      await CacheFile.save(CACHE_KEY, cachedMegamenu);
    }
  }
};
