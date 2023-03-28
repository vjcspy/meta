import withHomePageCategoryData from '@extensions/bed-kingdom/hoc/home-category/withHomePageCategoryData';
import { SLIDER_PRODUCT_HORIZONTAL_ITEM_HOME } from '@extensions/bed-kingdom/values/BED_KINGDOM_SETTING_SLIDER';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo, useState } from 'react';
import Slider from 'react-slick';

const CategoryHorizontal: React.FC = combineHOC(withHomePageCategoryData)(
  (props) => {
    const [activeTab, setActiveTab] = useState('tab1');

    const SLIDER = useMemo(() => {
      return (
        props.state.dataCategories &&
        props.state.dataCategories
          .filter((ca: any, index: number) => activeTab === `tab${index + 1}`)
          .map((cat: any) => (
            <div className="b-listingTab__content" key={cat?.uid}>
              <Slider {...SLIDER_PRODUCT_HORIZONTAL_ITEM_HOME}>
                {cat?.products?.items &&
                  cat?.products?.items.map((pro: any) => (
                    <UiExtension
                      uiId="BEDKINGDOM_PRODUCT_LISTING_ITEM"
                      key={pro?.uid}
                      product={pro}
                    />
                  ))}
              </Slider>
            </div>
          ))
      );
    }, [activeTab, props?.state?.dataCategories]);

    if (!props.state.dataCategories) {
      return null;
    }

    return (
      <>
        <section className="b-section__productTabs">
          <div className="container mx-auto md:px-4">
            <div className="b-listingTab__title">
              <ul className="b-listingTab__titleLists list-group-horizontal justify-center">
                {props.state.dataCategories.map((item: any, index: number) => (
                  <li
                    className={`list-group-item tab-item${index + 1} ${
                      activeTab === `tab${index + 1}` && 'active'
                    }`}
                    key={item?.uid}
                    onClick={() => setActiveTab(`tab${index + 1}`)}
                  >
                    <div className="b-listingTab__titleListLink">
                      {item?.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {SLIDER}
          </div>
        </section>
      </>
    );
  }
);

export default CategoryHorizontal;
