import { withBedChangeTypeListActions } from '@extensions/bed-kingdom/hoc/products/withBedChangeTypeListActions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const Aggregations = combineHOC(withBedChangeTypeListActions)((props) => {
  return (
    <>
      <UiExtension uiId="ONLY_MOBILE">
        <section className="b-content__listing">
          <div className="b-horizontal-bar__content b-horizontal-filter">
            <div className="b-filter-panel">
              {/*add active show filter*/}
              <div
                className={`b-filter-wrap__mb ${
                  props.isShowFilterMobile && 'active'
                }`}
              >
                <div className="b-filter-head flex items-center justify-between">
                  <div className="b-filter-head__wrap">
                    <span className="pr-1 mdm:text-18px">Filter</span>
                  </div>
                  <div onClick={() => props.setIsShowFilterMobile(false)}>
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      width={17}
                      height={17}
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill="#000000"
                        d="M10.707 10.5l5.646-5.646c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-5.646 5.646-5.646-5.646c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l5.646 5.646-5.646 5.646c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l5.646-5.646 5.646 5.646c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146c0.195-0.195 0.195-0.512 0-0.707l-5.646-5.646z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="b-filter-content">
                  {props.aggregations.map((aggregation: any) => (
                    <UiExtension
                      uiId="BED_KINGDOM_FILTER_ITEM_MOBILE"
                      attributeCode={aggregation.attribute_code}
                      aggregation={aggregation}
                      key={aggregation.attribute_code}
                      closeFilter={() => props.setIsShowFilterMobile(false)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="b-filter-panel-right flex">
          <div className="b-modes">
            <span
              className="modes-mode modes-label"
              onClick={() => {
                if (props.changeTypeListProduct) {
                  props.changeTypeListProduct('grid');
                }
              }}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21px"
                  height="20px"
                  viewBox="0 0 21 20"
                  version="1.1"
                >
                  <title>menu_navigation_grid [#1530]</title>
                  <desc>Created with Sketch.</desc>
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
            <span
              className="modes-mode mode-list"
              onClick={() => {
                if (props.changeTypeListProduct) {
                  props.changeTypeListProduct('list');
                }
              }}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21px"
                  height="18px"
                  viewBox="0 0 19 16"
                  version="1.1"
                >
                  <title>format_list_bulleted</title>
                  <desc>Created with Sketch.</desc>
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
                            <polygon id="Path" points="0 0 24 0 24 24 0 24" />
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
          <div
            className="b-filter__mb flex items-center"
            onClick={() => {
              props.setIsShowFilterMobile(true);
            }}
          >
            <span className="pr-1">Filter</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={17}
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="filter"
              className="svg-inline--fa fa-filter fa-w-16"
              role="img"
              viewBox="0 0 512 512"
            >
              <path
                fill="#999"
                d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"
              />
            </svg>
          </div>
          <div className="b-short-list__controllers">
            <div
              className="b-sortby_wrapper__mb"
              onClick={() => props.setIsShowSortMobile(true)}
            >
              <span>
                {props.sortValue === 'manufacturer'
                  ? 'Manufacturer'
                  : props.sortValue === 'price'
                  ? 'Price'
                  : 'Position'}
              </span>
            </div>
            <div
              className={`b-sortby__mb ${props.isShowSortMobile && 'active'}`}
            >
              <div className="b-filter-head flex items-center justify-between">
                <div className="d-flex b-filter-head__wrap text-16px">
                  <span>
                    {props.sortValue === 'manufacturer'
                      ? 'Manufacturer'
                      : props.sortValue === 'price'
                      ? 'Price'
                      : 'Position'}
                  </span>
                  {props.sortType === 'ASC' ? (
                    <i className="fa fa-long-arrow-up text-color-2362AA ml-2 font-bold" />
                  ) : (
                    <i className="fa fa-long-arrow-down text-color-2362AA ml-2 font-bold" />
                  )}
                </div>
                <div onClick={() => props.setIsShowSortMobile(false)}>
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#000000"
                      d="M10.707 10.5l5.646-5.646c0.195-0.195 0.195-0.512 0-0.707s-0.512-0.195-0.707 0l-5.646 5.646-5.646-5.646c-0.195-0.195-0.512-0.195-0.707 0s-0.195 0.512 0 0.707l5.646 5.646-5.646 5.646c-0.195 0.195-0.195 0.512 0 0.707 0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146l5.646-5.646 5.646 5.646c0.098 0.098 0.226 0.146 0.354 0.146s0.256-0.049 0.354-0.146c0.195-0.195 0.195-0.512 0-0.707l-5.646-5.646z"
                    />
                  </svg>
                </div>
              </div>
              <div className="b-sortby-content">
                <div
                  className={`b-sortby-item ${
                    props.sortValue === 'position' && 'active'
                  }`}
                  onClick={() => {
                    props.setSortValue('position');
                    props.setIsShowSortMobile(false);
                  }}
                >
                  <div className="b-sortby-item__label">
                    <span className="b-sortby__check" />
                    <span>Position</span>
                  </div>
                </div>
                <div
                  className={`b-sortby-item ${
                    props.sortValue === 'price' && 'active'
                  }`}
                  onClick={() => {
                    props.setSortValue('price');
                    props.setIsShowSortMobile(false);
                  }}
                >
                  <div className="b-sortby-item__label">
                    <span className="b-sortby__check" />
                    <span>Price</span>
                  </div>
                </div>
                <div
                  className={`b-sortby-item ${
                    props.sortValue === 'manufacturer' && 'active'
                  }`}
                  onClick={() => {
                    props.setSortValue('manufacturer');
                    props.setIsShowSortMobile(false);
                  }}
                >
                  <div className="b-sortby-item__label">
                    <span className="b-sortby__check" />
                    <span>Manufacturer</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="b-short-icon pl-2"
              onClick={() => {
                props.setSortType(props.sortType === 'ASC' ? 'DESC' : 'ASC');
              }}
            >
              <span>
                <span>
                  {props.sortType === 'ASC' ? (
                    <i className="fa fa-long-arrow-up text-color-2362AA font-bold text-18px" />
                  ) : (
                    <i className="fa fa-long-arrow-down text-color-2362AA font-bold text-18px" />
                  )}
                </span>
              </span>
            </div>
          </div>
        </div>
      </UiExtension>
    </>
  );
});

export default Aggregations;
