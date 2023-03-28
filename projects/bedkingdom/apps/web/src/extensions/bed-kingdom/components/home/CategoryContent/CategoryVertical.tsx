import category1 from '@extensions/bed-kingdom/assets/images/category-1.svg';
import category1Active from '@extensions/bed-kingdom/assets/images/category-1_active.svg';
import category2 from '@extensions/bed-kingdom/assets/images/category-2.svg';
import category2Active from '@extensions/bed-kingdom/assets/images/category-2_active.svg';
import category3 from '@extensions/bed-kingdom/assets/images/category-3.svg';
import category3Active from '@extensions/bed-kingdom/assets/images/category-3_active.svg';
import category4 from '@extensions/bed-kingdom/assets/images/category-4.svg';
import category4Active from '@extensions/bed-kingdom/assets/images/category-4_active.svg';
import category5 from '@extensions/bed-kingdom/assets/images/category-5.svg';
import category5Active from '@extensions/bed-kingdom/assets/images/category-5_active.svg';
import withHomePageCategoryData from '@extensions/bed-kingdom/hoc/home-category/withHomePageCategoryData';
import { SLIDER_PRODUCT_VERTICAL_ITEM_HOME } from '@extensions/bed-kingdom/values/BED_KINGDOM_SETTING_SLIDER';
import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useMemo, useState } from 'react';
import Slider from 'react-slick';

const CategoryVertical: React.FC = combineHOC(
  withHomePageCategoryData,
    withRouterWithStoreActions
)(
  React.memo((props) => {
    const [activeTab, setActiveTab] = useState('tab1');
    const iconTabVertical = useCallback((index: number) => {
      const icon = (
        <span>
          <UiExtension uiId="ONLY_DESKTOP">
            <img
              className="b-categoryRole__iconLink"
              src={category1}
              alt=""
              width="46px"
              height="45px"
              loading="lazy"
            />
            <img
              className="b-categoryRole__iconLink white"
              src={category1Active}
              alt=""
              width="46px"
              height="45px"
              loading="lazy"
            />
          </UiExtension>
          <UiExtension uiId="ONLY_MOBILE">
            <img
              className="b-categoryRole__iconLink"
              src={category1}
              alt=""
              width="40px"
              height="45px"
              loading="lazy"
            />
            <img
              className="b-categoryRole__iconLink white"
              src={category1Active}
              alt=""
              width="40px"
              height="45px"
              loading="lazy"
            />
          </UiExtension>
        </span>
      );

      switch (index) {
        case 1:
          return icon;
        case 2:
          return (
            <span>
              <UiExtension uiId="ONLY_DESKTOP">
                <img
                  className="b-categoryRole__iconLink"
                  src={category2}
                  alt=""
                  width="47px"
                  height="47px"
                  loading="lazy"
                />
                <img
                  className="b-categoryRole__iconLink white"
                  src={category2Active}
                  alt=""
                  width="47px"
                  height="47px"
                  loading="lazy"
                />
              </UiExtension>
              <UiExtension uiId="ONLY_MOBILE">
                <img
                  className="b-categoryRole__iconLink"
                  src={category2}
                  alt=""
                  width="40px"
                  height="40px"
                  loading="lazy"
                />
                <img
                  className="b-categoryRole__iconLink white"
                  src={category2Active}
                  alt=""
                  width="40px"
                  height="40px"
                  loading="lazy"
                />
              </UiExtension>
            </span>
          );
        case 3:
          return (
            <span>
              <UiExtension uiId="ONLY_DESKTOP">
                <img
                  className="b-categoryRole__iconLink"
                  src={category3}
                  alt=""
                  width="56px"
                  height="55px"
                  loading="lazy"
                />
                <img
                  className="b-categoryRole__iconLink white"
                  src={category3Active}
                  alt=""
                  width="56px"
                  height="55px"
                  loading="lazy"
                />
              </UiExtension>
              <UiExtension uiId="ONLY_MOBILE">
                <img
                  className="b-categoryRole__iconLink"
                  src={category3}
                  alt=""
                  width="46px"
                  height="44px"
                  loading="lazy"
                />
                <img
                  className="b-categoryRole__iconLink white"
                  src={category3Active}
                  alt=""
                  width="46px"
                  height="44px"
                  loading="lazy"
                />
              </UiExtension>
            </span>
          );
        case 4:
          return (
            <span>
              <UiExtension uiId="ONLY_DESKTOP">
                <img
                  className="b-categoryRole__iconLink"
                  src={category4}
                  alt=""
                  width="57px"
                  height="57px"
                  loading="lazy"
                />
                <img
                  className="b-categoryRole__iconLink white"
                  src={category4Active}
                  alt=""
                  width="57px"
                  height="57px"
                  loading="lazy"
                />
              </UiExtension>

              <UiExtension uiId="ONLY_MOBILE">
                <img
                  className="b-categoryRole__iconLink"
                  src={category4}
                  alt=""
                  width="44px"
                  height="43px"
                  loading="lazy"
                />
                <img
                  className="b-categoryRole__iconLink white"
                  src={category4Active}
                  alt=""
                  width="44px"
                  height="43px"
                  loading="lazy"
                />
              </UiExtension>
            </span>
          );
        case 5:
          return (
            <span>
              <UiExtension uiId="ONLY_DESKTOP">
                <img
                  className="b-categoryRole__iconLink"
                  src={category5}
                  alt=""
                  width="46px"
                  height="48px"
                  loading="lazy"
                />
                <img
                  className="b-categoryRole__iconLink white"
                  src={category5Active}
                  alt=""
                  width="46px"
                  height="48px"
                  loading="lazy"
                />
              </UiExtension>
              <UiExtension uiId="ONLY_MOBILE">
                <img
                  className="b-categoryRole__iconLink"
                  src={category5}
                  alt=""
                  width="36px"
                  height="38px"
                  loading="lazy"
                />
                <img
                  className="b-categoryRole__iconLink white"
                  src={category5Active}
                  alt=""
                  width="36px"
                  height="38px"
                  loading="lazy"
                />
              </UiExtension>
            </span>
          );
      }
      return icon;
    }, []);

    const goTo = useCallback((url: string) => {
      if (props.actions.go) {
        props.actions.go(url);
      }
    }, []);

    const SLIDER = useMemo(() => {
      return (
        props.state.dataCategories &&
        props.state.dataCategories
          .filter((ca: any, index: number) => activeTab === `tab${index + 1}`)
          .map((cat: any) => (
            <div className="b-listingTab__content" key={cat?.uid}>
              <Slider {...SLIDER_PRODUCT_VERTICAL_ITEM_HOME}>
                {cat?.products?.items &&
                  cat?.products?.items.map((pro: any) => (
                    <UiExtension
                      uiId="BEDKINGDOM_PRODUCT_LISTING_ITEM"
                      key={pro?.uid}
                      product={pro}
                    />
                  ))}
              </Slider>
              <div className="b-blockBtn--viewMore">
                <div
                  className="b-blockBtn--action"
                  onClick={() => {
                    goTo(`/${cat?.url_key}.html`);
                  }}
                >
                  Visit {cat?.name}
                </div>
              </div>
            </div>
          ))
      );
    }, [activeTab, props?.state?.dataCategories]);
    const TAB = useMemo(() => {
      return (
        <div className="b-categoryRole__side">
          <ul className="b-categoryRole__sideLists list-group ">
            {props.state.dataCategories.map((item: any, index: number) => (
              <li
                className={`list-group-item ${
                  activeTab === `tab${index + 1}` && 'active'
                }`}
                onClick={() => setActiveTab(`tab${index + 1}`)}
                key={item?.uid}
              >
                <div className="b-categoryRole__sideListLink">
                  {iconTabVertical(index + 1)}
                  <span className="md:block hidden">{item?.name}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      );
    }, [props?.state?.dataCategories, activeTab]);

    return (
      <>
        <section className="b-section__categoryTabs">
          <div className="container mx-auto md:px-4">
            <div className="b-categoryRole__main">
              {TAB}
              {SLIDER}
            </div>
          </div>
        </section>
      </>
    );
  })
);

export default CategoryVertical;
