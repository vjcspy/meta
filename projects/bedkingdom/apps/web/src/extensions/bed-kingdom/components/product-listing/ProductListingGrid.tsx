import { combineHOC, UiExtension } from '@web/ui-extension';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useRef } from 'react';

const ProductListingGrid = combineHOC()(
  React.memo((props) => {
    const router = useRouter();
    const containerRef = useRef<any>();
    // const { isBottom } = useIsScrollBottom(containerRef.current);
    // useEffect(() => {
    //   if (
    //     typeof props?.loadMorePage === 'function' &&
    //     isBottom &&
    //     !props?.isDone
    //   ) {
    //     props.loadMorePage();
    //   }
    // }, [isBottom]);

    const loadMore = useCallback(() => {
      if (typeof props?.loadMorePageButton === 'function') {
        props.loadMorePageButton();
      }
    }, [props?.pageFilterInfo]);

    const checkShowLoadMore = useMemo(() => {
      if (
        props?.pageInfo?.current_page &&
        props?.pageInfo?.total_pages &&
        props?.pageFilterInfo.currentPage &&
        props?.pageFilterInfo.currentPage < props?.pageInfo?.total_pages
      ) {
        return true;
      }
      return false;
    }, [props?.pageInfo]);

    const checkEmptyForSearching = useMemo(() => {
      if (
        router.asPath.includes('catalog-search') &&
        props.products &&
        !props?.loadingList &&
        Array.isArray(props.products) &&
        props.products.length === 0
      ) {
        return true;
      }
      return false;
    }, [props.products]);

    const checkEmptyForFilter = useMemo(() => {
      if (
        !router.asPath.includes('catalog-search') &&
        props.products &&
        !props?.loadingList &&
        Array.isArray(props.products) &&
        props.products.length === 0
      ) {
        return true;
      }
      return false;
    }, [props.products]);

    if (!props?.isDone && (!props?.products || props.products.length === 0)) {
      return <UiExtension uiId="INFINITE_SCROLL_LOADING" />;
    }

    return (
      <section className="b-content__listing mb-3 md:mb-8">
        <div
          id="products-listing-container"
          ref={containerRef}
          className="b-products b-procduct-grid grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-7 mt-3 md:mt-7"
        >
          {props.products?.map((product: any) => {
            return (
              <div key={product.uid}>
                {/*<div className="b-product__item text-center">*/}
                {/*  <div className="animate-pulses">*/}
                {/*    <div className="">*/}
                {/*      <div className="b-product__media h-200px bg-gray-200 w-full"></div>*/}
                {/*      <div className="b-product__info">*/}
                {/*        <div className="h-3 bg-gray-200 rounded mt-3"></div>*/}
                {/*        <div className="h-3 bg-gray-200 rounded mt-4 ml-auto mr-auto max-w-160"></div>*/}
                {/*        <div className="h-3 bg-gray-200 rounded mt-4 ml-auto mr-auto max-w-55px"></div>*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
                <UiExtension uiId="PRODUCT_LISTING_ITEM" product={product} />
              </div>
            );
          })}
        </div>
        {checkEmptyForFilter && (
          <div className="b-category-info">
            <span className="text-red-700">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              We can't find products matching to selection.
            </span>
          </div>
        )}
        {checkEmptyForSearching && (
          <>
            <div className="b-category-info">
              <span className="text-red-700">
                Your search returned no result.
              </span>
            </div>

            <section className="b-content__listing container pt-6">
              <div className="b-category-info">
                <div className="b-category-description">
                  <div className="flex justify-between">
                    <div className="col-des col-des">
                      <h1 className="b-category-name">Search Tips</h1>
                      <ul>
                        <li>Double check your spelling.</li>
                        <li>Try using single words.</li>
                        <li>
                          Try searching for an item that is less specific.
                        </li>
                        <li>You can always narrow your search results later</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
        {!props?.isLoading && checkShowLoadMore && (
          <button
            type="button"
            className="btn-default btn-loadMore text-14px mt-5 h-40px hover:opacity-80 mb-5 pl-10 pr-10 ml-auto mr-auto h-48"
            onClick={() => loadMore()}
          >
            Load More
          </button>
        )}

        {props?.isLoading && !props?.isDone && (
          <UiExtension uiId="INFINITE_SCROLL_LOADING" />
        )}
      </section>
    );
  })
);
export default ProductListingGrid;
