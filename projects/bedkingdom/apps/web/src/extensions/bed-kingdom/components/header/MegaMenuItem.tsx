/* eslint-disable unused-imports/no-unused-vars */
import type { MegamenuItemsOutput } from '@vjcspy/apollo-bed-kingdom/build/graphql/generated/_generated-types';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const MegaMenuItem: React.FC<{
  item: MegamenuItemsOutput;
  goToCat: (cat: any) => void;
  activeMenu: boolean;
  closeMenu?: () => void;
}> = React.memo((props) => {
  const { asPath } = useRouter();
  const [hover, setHover] = useState<boolean>(true);
  const [hoverLevel2, setHoverLevel2] = useState<boolean>(true);
  const [activeLevel2, setActiveLevel2] = useState<any>(null);
  const [dropDownMobile, setDropDownMobile] = useState<boolean>(false);
  const [dropDownMobileLevel2, setDropDownMobileLevel2] = useState<any>(null);

  const dataCheckCanShow = useMemo(() => {
    return (
      (props?.item?.show_content === '1' &&
        (props?.item?.content_html ||
          (props?.item?.children && props?.item?.children?.length > 0))) ||
      props?.item?.show_header === '1' ||
      props?.item?.show_footer === '1'
    );
  }, [props?.item]);

  const isShowDropDown = useMemo(() => {
    return (
      (hover &&
        props?.item?.show_content === '1' &&
        (props?.item?.content_html ||
          (props?.item?.children && props?.item?.children?.length > 0))) ||
      props?.item?.show_header === '1' ||
      props?.item?.show_footer === '1'
    );
  }, [props?.item, hover]);

  const onClickMenuMobile = useCallback(() => {
    setHover(!hover);
    setDropDownMobile(!dropDownMobile);
  }, [hover, dropDownMobile]);

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

  const showSubMenuInner = useMemo(() => {
    return (
      <div className="submenu-inner">
        {/*HEADER HTML*/}
        {props?.item?.show_header === '1' && (
          <div className="item-header">
            <UiExtension uiId="HTML_PARSE" html={props?.item?.header_html} />
          </div>
        )}

        <div className="content-wrapper">
          {props?.item?.content_width && props?.item?.show_content === '1' && (
            <div
              className="item-content"
              style={{ width: props?.item?.content_width }}
            >
              {/*CONTENT HTML*/}
              {props?.item?.content_html && (
                <UiExtension
                  uiId="HTML_PARSE"
                  html={props?.item?.content_html}
                />
              )}

              {/* Nếu có child*/}
              <div
                className={clsx(
                  'level1 nav-dropdown',
                  props?.item?.child_col === '1' && 'column-1',
                  props?.item?.child_col === '2' && 'column-2',
                  props?.item?.child_col === '3' && 'column-3',
                  props?.item?.child_col === '4' && 'column-4',
                  props?.item?.child_col === '5' && 'column-4',
                  props?.item?.child_col === '6' && 'column-4'
                )}
              >
                <div
                  className={clsx(
                    'grid ',
                    props?.item?.child_col === '1' &&
                      'grid-cols-1 gap-1 md:grid-cols-1',
                    props?.item?.child_col === '2' &&
                      'grid-cols-1 gap-2 md:grid-cols-2',
                    props?.item?.child_col === '3' &&
                      'grid-cols-1 gap-3 md:grid-cols-3',
                    props?.item?.child_col === '4' &&
                      'grid-cols-1 gap-3 md:grid-cols-4',
                    props?.item?.child_col === '5' &&
                      'grid-cols-1 gap-3 md:grid-cols-5',
                    props?.item?.child_col === '6' &&
                      'grid-cols-1 gap-3 md:grid-cols-6'
                  )}
                >
                  {/*neu column 1 thi add grid-cols-1*/}
                  {props?.item?.children?.map((c) => {
                    if (!c) {
                      return null;
                    }
                    return (
                      <div key={c.id}>
                        <div
                          className={clsx(
                            'nav-item level1 nav-1-1 category-item p-3 ' +
                              c?.classes,
                            activeMenuByLink(c) && 'item-active'
                          )}
                          onClick={() => {
                            props?.goToCat(c);
                            if (props?.closeMenu) {
                              props?.closeMenu();
                            }
                          }}
                          onMouseEnter={() => {
                            setHoverLevel2(true);
                            setActiveLevel2(c.id);
                          }}
                          onMouseLeave={() => {
                            setHoverLevel2(false);
                            setActiveLevel2(null);
                          }}
                        >
                          <span
                            className="b-sub_title mb-2 block text-15px font-bold"
                            onClick={() => {
                              props?.goToCat(c);
                              if (props?.closeMenu) {
                                props?.closeMenu();
                              }
                            }}
                          >
                            {c.name}
                          </span>
                          {c.id && (
                            <UiExtension
                              id="MEGA_MENU_ITEM_LEVEL2"
                              uiId="MEGA_MENU_ITEM_LEVEL2"
                              goToCat={props?.goToCat}
                              item={c}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {props?.item?.right_sidebar_width &&
            props?.item?.show_right_sidebar === '1' && (
              <div
                className="item-sidebar"
                style={{ width: props?.item?.right_sidebar_width }}
              >
                <UiExtension
                  uiId="HTML_PARSE"
                  html={props?.item?.right_sidebar_html}
                />
              </div>
            )}
        </div>
      </div>
    );
  }, [props?.item, hoverLevel2]);

  const showSubMenuInnerMobile = useMemo(() => {
    return (
      <div className="submenu-inner">
        {/*HEADER HTML*/}
        {props?.item?.show_header === '1' && (
          <div className="item-header">
            <UiExtension uiId="HTML_PARSE" html={props?.item?.header_html} />
          </div>
        )}

        <div className="content-wrapper">
          {props?.item?.content_width && props?.item?.show_content === '1' && (
            <div
              className="item-content"
              style={{ width: props?.item?.content_width }}
            >
              {/*CONTENT HTML*/}
              {props?.item?.content_html && (
                <UiExtension
                  uiId="HTML_PARSE"
                  html={props?.item?.content_html}
                />
              )}

              {/* Nếu có child*/}
              <div
                className={clsx(
                  'level1 nav-dropdown',
                  props?.item?.child_col === '1' && 'column-1',
                  props?.item?.child_col === '2' && 'column-2',
                  props?.item?.child_col === '3' && 'column-3',
                  props?.item?.child_col === '4' && 'column-4',
                  props?.item?.child_col === '5' && 'column-5',
                  props?.item?.child_col === '6' && 'column-6'
                )}
              >
                <div
                  className={clsx(
                    'grid ',
                    props?.item?.child_col === '1' &&
                      'grid-cols-1 gap-1 md:grid-cols-1',
                    props?.item?.child_col === '2' &&
                      'grid-cols-1 gap-2 md:grid-cols-2',
                    props?.item?.child_col === '3' &&
                      'grid-cols-1 gap-3 md:grid-cols-3',
                    props?.item?.child_col === '4' &&
                      'grid-cols-1 gap-3 md:grid-cols-4',
                    props?.item?.child_col === '5' &&
                      'grid-cols-1 gap-3 md:grid-cols-5',
                    props?.item?.child_col === '6' &&
                      'grid-cols-1 gap-3 md:grid-cols-6'
                  )}
                >
                  {/*neu column 1 thi add grid-cols-1*/}
                  {props?.item?.children?.map((c) => {
                    if (!c) {
                      return null;
                    }

                    if (!c?.name) {
                      return (
                        <div key={c.id}>
                          <div
                            className={clsx(
                              'nav-item level1 nav-1-1 category-item p-3 mdm:flex mdm:justify-between ',
                              c?.classes,
                              activeMenuByLink(c) && 'item-active'
                            )}
                          >
                            <span>------</span>
                          </div>
                          <UiExtension
                            id="MEGA_MENU_ITEM_LEVEL2"
                            uiId="MEGA_MENU_ITEM_LEVEL2"
                            goToCat={props?.goToCat}
                            item={c}
                          />
                        </div>
                      );
                    }
                    return (
                      <div key={c.id}>
                        <div
                          className={
                            'nav-item level1 nav-1-1 category-item p-3 mdm:flex mdm:justify-between ' +
                            c?.classes
                          }
                        >
                          <span
                            onClick={() => {
                              props?.goToCat(c);
                              if (props?.closeMenu) {
                                props?.closeMenu();
                              }
                            }}
                          >
                            {c.name}
                          </span>
                          {dropDownMobileLevel2 === c.id ? (
                            <i
                              className="b-caret fa fa-angle-up"
                              onClick={() => {
                                setDropDownMobileLevel2(null);
                                setHoverLevel2(false);
                              }}
                            />
                          ) : (
                            <i
                              className="b-caret fa fa-angle-down"
                              onClick={() => {
                                setDropDownMobileLevel2(c.id);
                                setHoverLevel2(true);
                              }}
                            />
                          )}
                        </div>
                        {hoverLevel2 && dropDownMobileLevel2 === c.id && (
                          <UiExtension
                            id="MEGA_MENU_ITEM_LEVEL2"
                            uiId="MEGA_MENU_ITEM_LEVEL2"
                            goToCat={props?.goToCat}
                            item={c}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          {props?.item?.right_sidebar_width &&
            props?.item?.show_right_sidebar === '1' && (
              <div
                className="item-sidebar"
                style={{ width: props?.item?.right_sidebar_width }}
              >
                <UiExtension
                  uiId="HTML_PARSE"
                  html={props?.item?.right_sidebar_html}
                />
              </div>
            )}
        </div>
      </div>
    );
  }, [props?.item, hoverLevel2, dropDownMobileLevel2]);

  useEffect(() => {
    if (!props?.activeMenu) {
      setHover(false);
      setDropDownMobile(false);
    }
  }, [props?.activeMenu]);

  return (
    <>
      <UiExtension uiId="ONLY_DESKTOP">
        <li
          className={clsx(
            'nav-item nav-1 dropdown',
            props?.item?.classes,
            activeMenuByLink(props?.item) && 'item-active'
          )}
          onMouseEnter={() => setHover(true)}
          // onMouseLeave={() => setHover(false)}
        >
          {props?.item?.url_path ? (
            <div onClick={() => props?.goToCat(props?.item)}>
              <span>{props?.item?.name}</span>
            </div>
          ) : (
            <div
              onClick={() => {
                RouterSingleton.replace(props?.item?.link);
              }}
            >
              <span>{props?.item?.name}</span>
            </div>
          )}

          {isShowDropDown && (
            <div className="submenu dropdown-menu">{showSubMenuInner}</div>
          )}
        </li>
      </UiExtension>
      <UiExtension uiId="ONLY_MOBILE">
        {/*Add class active*/}
        <li
          className={clsx(
            'nav-item nav-1 dropdown ',
            props?.item?.classes,
            activeMenuByLink(props?.item) && 'item-active'
          )}
        >
          <div>
            {props?.item?.url_path ? (
              <div
                onClick={() => {
                  props?.goToCat(props?.item);
                  if (props?.closeMenu) {
                    props?.closeMenu();
                  }
                }}
              >
                <div className="flex items-center">
                  {props?.item?.icon && (
                    <span className="pr-2">
                      {props?.item?.icon && (
                        <img
                          className="icon"
                          src={props?.item?.icon}
                          alt={props?.item?.name ?? ''}
                        />
                      )}
                      {props?.item?.hover_icon && (
                        <img
                          className="icon icon-hover"
                          src={props?.item?.hover_icon}
                          alt={props?.item?.name ?? ''}
                        />
                      )}
                    </span>
                  )}
                  <span>{props?.item?.name} </span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  RouterSingleton.replace(props?.item?.link);
                }}
              >
                <span>{props?.item?.name}</span>
              </div>
            )}

            {dataCheckCanShow && (
              <>
                {dropDownMobile ? (
                  <i
                    className="b-caret fa fa-angle-up"
                    onClick={() => {
                      onClickMenuMobile();
                    }}
                  />
                ) : (
                  <i
                    className="b-caret fa fa-angle-down"
                    onClick={() => {
                      onClickMenuMobile();
                    }}
                  />
                )}
              </>
            )}
          </div>
          <div
            className={`submenu dropdown-menu ${dropDownMobile && 'is-active'}`}
          >
            {showSubMenuInnerMobile}
          </div>
        </li>
      </UiExtension>
    </>
  );
});

MegaMenuItem.displayName = 'MegaMenuItem';

export default MegaMenuItem;
