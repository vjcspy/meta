import { withBrandListContainer } from '@extensions/bed-kingdom/hoc/brand/withBrandListContainer';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import React from 'react';
import ReactTooltip from 'react-tooltip';

const BrandListContainer = combineHOC(withBrandListContainer)((props) => {
  return (
    <section className="b-branch-page container mx-auto px-4 mb-10 md:mt-10">
      <div className="b-branch-form-search flex max-w-440 border border-color-ccc rounded-3 h-40px pl-2 pr-2 items-center relative">
        <svg
          width="23"
          height="23"
          viewBox="0 0 23 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.375 14.5H15.3875L15.0375 14.1625C16.2625 12.7375 17 10.8875 17 8.875C17 4.3875 13.3625 0.75 8.875 0.75C4.3875 0.75 0.75 4.3875 0.75 8.875C0.75 13.3625 4.3875 17 8.875 17C10.8875 17 12.7375 16.2625 14.1625 15.0375L14.5 15.3875V16.375L20.75 22.6125L22.6125 20.75L16.375 14.5ZM8.875 14.5C5.7625 14.5 3.25 11.9875 3.25 8.875C3.25 5.7625 5.7625 3.25 8.875 3.25C11.9875 3.25 14.5 5.7625 14.5 8.875C14.5 11.9875 11.9875 14.5 8.875 14.5Z"
            fill="gray"
          />
        </svg>
        <input
          type="text"
          className="pl-2 w-full"
          placeholder="Search brand here..."
          value={props?.state?.searchString}
          onChange={(e) => props?.actions?.setSearchString(e.target.value)}
        />
        {/*Add class hidden on the div below when focus input*/}
        {props?.state?.searchResults && (
          <span
            className="b-branch-actionClose pr-2 cursor-pointer"
            onClick={() => props?.actions?.setSearchString('')}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8327 1.34102L10.6577 0.166016L5.99935 4.82435L1.34102 0.166016L0.166016 1.34102L4.82435 5.99935L0.166016 10.6577L1.34102 11.8327L5.99935 7.17435L10.6577 11.8327L11.8327 10.6577L7.17435 5.99935L11.8327 1.34102Z"
                fill="#5F5F5F"
              />
            </svg>
          </span>
        )}
        {/*add class active*/}
        <div
          className={clsx(
            'b-brands-dropdown pb-3 pt-3',
            Array.isArray(props?.state?.searchResults) && 'active'
          )}
        >
          {props?.state?.searchResults?.map((brand: any) => (
            <div
              className="b-brands-item pl-3 mb-1 pr-3 pt-1 pb-1 hover:bg-gray-100 cursor-pointer"
              key={brand['brandId']}
              onClick={() => {
                RouterSingleton.push(`/${brand['url']}`);
              }}
            >
              {brand['label']}
            </div>
          ))}
        </div>
      </div>
      <div className="b-branch-filter mt-6 mb-8">
        {/*add class active khi duoc chon, add class disable khi trong page k co branch do tuong ung chu cai dau*/}
        <div
          className={clsx(
            'b-filter-letter b-filter-letter-all text-center cursor-pointer',
            props?.state?.filter['char'] === 'all' && 'active'
          )}
          onClick={() => props?.actions?.setCharacterFilter('all')}
        >
          All Brands
        </div>
        {[...Array(26)]
          .map((_, i) => String.fromCharCode(65 + i))
          .map((c) => (
            <div
              className={clsx(
                'b-filter-letter text-center cursor-pointer',
                props?.state?.filter['char'] === c.toUpperCase() && 'active',
                !props?.state?.brandListData?.all_letters ||
                  (props?.state?.brandListData?.all_letters?.indexOf(
                    c.toUpperCase()
                  ) < 0 &&
                    'disable')
              )}
              key={c}
              onClick={() =>
                props?.actions?.setCharacterFilter(c.toUpperCase())
              }
            >
              {c.toUpperCase()}
            </div>
          ))}

        <div className="b-filter-letter text-center cursor-pointer">#</div>
      </div>
      <div className="b-branch-list grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
        {Object.entries(props?.state?.groupedBrands).map((d: any) => (
          <div className="b-branch-list-item mb-6" key={d[0]}>
            <h3 className="b-branch-title text-26px uppercase font-bold mb-3">
              {d[0]}
            </h3>
            <div className="b-branch-content grid grid-cols-2 gap-4">
              {d[1].map((brand: any) => (
                <div
                  className="b-item flex cursor-pointer b-branch-item items-center p-3 justify-center"
                  key={brand['brandId']}
                  onClick={() => {
                    RouterSingleton.push(`/${brand['url']}`);
                  }}
                >
                  <div className="b-brands-item relative">
                    <a
                      data-tip
                      data-for={'happyFace' + brand?.label}
                      style={{
                        backgroundImage: `url(${brand['img']})`,
                      }}
                    >
                      {/*{(brand?.short_description || brand?.description) && (*/}
                      {/*  <div className="b-branch-tooltip">*/}
                      {/*    {brand?.short_description || brand?.description}*/}
                      {/*  </div>*/}
                      {/*)}*/}
                      {!brand['image'] && (
                        <span className="ambrands-image-block">
                          <span className="ambrands-empty">{d[0]}</span>
                        </span>
                      )}
                    </a>
                  </div>
                  <span className="b-branch-label break-words font-bold text-center mt-5 block mb-4">
                    {brand['label']}
                  </span>
                  {(brand?.short_description || brand?.description) && (
                    <ReactTooltip
                      id={'happyFace' + brand?.label}
                      place="top"
                      type="dark"
                      effect="solid"
                      // aria-haspopup="true"
                      // role="example"
                    >
                      <span>
                        {brand?.short_description || brand?.description}
                      </span>
                    </ReactTooltip>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default BrandListContainer;
