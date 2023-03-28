import { SortEnum } from '@vjcspy/apollo';
import { withProductContainerActions } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductContainerActions';
import { withProductsAggregationsData } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductsAggregationsData';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useEffect, useState } from 'react';

const Aggregations = combineHOC(
  withProductsAggregationsData,
  withProductContainerActions
)((props) => {
  const [sortValue, setSortValue] = useState('position_DES');
  const setSorter = useCallback((sort: any) => {
    if (typeof props.actions?.setFilterInfo === 'function') {
      props.actions.setFilterInfo({
        sort,
      });
    }
  }, []);

  useEffect(() => {
    switch (sortValue) {
      case 'position_DES':
        return setSorter({
          position: SortEnum.Desc,
        });
      case 'position_ASC':
        return setSorter({
          position: SortEnum.Asc,
        });
      case 'price_DESC':
        return setSorter({
          price: SortEnum.Desc,
        });
      case 'price_ASC':
        return setSorter({
          price: SortEnum.Asc,
        });
      case 'name_DES':
        return setSorter({
          name: SortEnum.Desc,
        });
      case 'name_ASC':
        return setSorter({
          name: SortEnum.Asc,
        });
    }
  }, [sortValue]);

  return (
    <UiExtension uiId="ONLY_DESKTOP">
      <section className="b-content__listing container mx-auto md:px-4">
        <div className="b-category-info">
          {/*add class b-fillter-more-active*/}
          {/*Cuc nay show PC*/}
          <div className="b-horizontal-bar__content hidden md:block ">
            <div className="b-filter-panel flex justify-between">
              <div className="b-filter-list__container">
                <div className="b-filter-list__container b-list-item flex flex-wrap">
                  {props.aggregations.map((aggregation: any) => (
                    <UiExtension
                      uiId="PRODUCTS_AGGREGATION"
                      key={aggregation.attribute_code}
                      attributeCode={aggregation.attribute_code}
                      aggregation={aggregation}
                    />
                  ))}
                </div>
                <div className="wrapper___more hidden lg:block">
                  <div className="collapse-controller">
                    <span className="gl-label gl-label--l">More filters</span>
                    <svg className="gl-icon icon">
                      <use href="#plus">
                        <svg id="plus" viewBox="0 0 20 24">
                          <title>plus</title>
                          <path
                            d="M10 2v20m10-10H0"
                            fill="none"
                            stroke="currentColor"
                            strokeMiterlimit={10}
                            strokeWidth={2}
                          />
                        </svg>
                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="b-filter-panel-right flex items-center">
                <div className="b-modes">
                  <span className="modes-mode modes-label">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21px"
                        height="20px"
                        viewBox="0 0 21 20"
                        version="1.1"
                      >
                        <defs />
                        <g
                          id="Page-1"
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            id="Dribbble-Light-Preview"
                            transform="translate(-59.000000, -200.000000)"
                            fill="#000000"
                          >
                            <g
                              id="icons"
                              transform="translate(56.000000, 160.000000)"
                            >
                              <path
                                d="M14.55,60 L24,60 L24,51 L14.55,51 L14.55,60 Z M3,60 L12.45,60 L12.45,51 L3,51 L3,60 Z M14.55,49 L24,49 L24,40 L14.55,40 L14.55,49 Z M3,49 L12.45,49 L12.45,40 L3,40 L3,49 Z"
                                id="menu_navigation_grid-[#1530]"
                              />
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </span>
                  <span className="modes-mode mode-list">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21px"
                        height="18px"
                        viewBox="0 0 19 16"
                        version="1.1"
                      >
                        <g
                          id="Icons"
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          <g
                            id="Outlined"
                            transform="translate(-850.000000, -2062.000000)"
                          >
                            <g
                              id="Editor"
                              transform="translate(100.000000, 1960.000000)"
                            >
                              <g
                                id="Outlined-/-Editor-/-format_list_bulleted"
                                transform="translate(748.000000, 98.000000)"
                              >
                                <g>
                                  <polygon
                                    id="Path"
                                    points="0 0 24 0 24 24 0 24"
                                  />
                                  <path
                                    d="M4,10.5 C3.17,10.5 2.5,11.17 2.5,12 C2.5,12.83 3.17,13.5 4,13.5 C4.83,13.5 5.5,12.83 5.5,12 C5.5,11.17 4.83,10.5 4,10.5 Z M4,4.5 C3.17,4.5 2.5,5.17 2.5,6 C2.5,6.83 3.17,7.5 4,7.5 C4.83,7.5 5.5,6.83 5.5,6 C5.5,5.17 4.83,4.5 4,4.5 Z M4,16.5 C3.17,16.5 2.5,17.18 2.5,18 C2.5,18.82 3.18,19.5 4,19.5 C4.82,19.5 5.5,18.82 5.5,18 C5.5,17.18 4.83,16.5 4,16.5 Z M7,19 L21,19 L21,17 L7,17 L7,19 Z M7,13 L21,13 L21,11 L7,11 L7,13 Z M7,5 L7,7 L21,7 L21,5 L7,5 Z"
                                    id="🔹-Icon-Color"
                                    fill="#1D1D1D"
                                  />
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="b-short-list__controllers">
                  <div className="b-sortby_wrapper">
                    <span className="hidden pr-2 lg:inline-block">Sort By</span>
                    <select
                      className="gl-dropdown-custom__select-element"
                      value={sortValue}
                      onChange={(event) => setSortValue(event.target.value)}
                    >
                      <option value="price_DESC">{'price_DESC'}</option>
                      <option value="price_ASC">{'price_ASC'}</option>
                      <option value="position_DES">{'position_DES'}</option>
                      <option value="position_ASC">{'position_ASC'}</option>
                      <option value="name_DES">{'name_DES'}</option>
                      <option value="name_ASC">{'name_ASC'}</option>
                    </select>
                  </div>
                  <div className="b-short-icon ml-2">
                    <a>
                      <span>
                        <i className="fa fa-long-arrow-up text-color-2362AA"></i>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </UiExtension>
  );
});

export default Aggregations;
