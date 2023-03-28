import { MegamenuItemsOutput } from '@vjcspy/apollo-bed-kingdom/build/graphql/generated/_generated-types';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

const MegaMenuItemLevel2: React.FC<{
  item: MegamenuItemsOutput;
  goToCat: (cat: any) => void;
  activeMenu: boolean;
  closeMenu?: () => void;
}> = React.memo((props) => {
  const { asPath } = useRouter();
  if (
    props?.item?.show_content !== '1' ||
    props?.item?.children?.length === 0
  ) {
    return null;
  }

  const activeMenuByLink = useCallback(
    (item: any) => {
      if (item?.url_path?.includes(asPath) && asPath !== '/') {
        return true;
      } else if (item?.link?.includes(asPath) && asPath !== '/') {
        return true;
      }

      return false;
    },
    [asPath]
  );

  return (
    <>
      <UiExtension uiId="ONLY_DESKTOP">
        <div className="pt-3">
          {props?.item?.children?.map((c) => {
            if (!c) {
              return null;
            }
            return (
              <div
                className={clsx(
                  'nav-item nav-2',
                  c?.classes,
                  activeMenuByLink(c) && 'item-active'
                )}
                key={c?.id}
              >
                {props?.item?.url_path ? (
                  <div onClick={() => props?.goToCat(c)}>
                    <span>{c?.name}</span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      RouterSingleton.replace(c?.link);
                    }}
                  >
                    <span>{c?.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </UiExtension>
      <UiExtension uiId="ONLY_MOBILE">
        <div className="pl-3">
          {props?.item?.children?.map((c) => {
            if (!c) {
              return null;
            }
            return (
              <li
                className={clsx(
                  'nav-item nav-2 dropdown ',
                  c?.classes,
                  activeMenuByLink(c) && 'item-active'
                )}
                key={c?.id}
              >
                {props?.item?.url_path ? (
                  <div onClick={() => props?.goToCat(c)}>
                    <span>{c?.name}</span>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      RouterSingleton.replace(c?.link);
                    }}
                  >
                    <span>{c?.name}</span>
                  </div>
                )}
              </li>
            );
          })}
        </div>
      </UiExtension>
    </>
  );
});

MegaMenuItemLevel2.displayName = 'MegaMenuItemLevel2';

export default MegaMenuItemLevel2;
