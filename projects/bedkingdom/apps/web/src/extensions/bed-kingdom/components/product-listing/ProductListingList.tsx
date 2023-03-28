import { combineHOC, UiExtension } from '@web/ui-extension';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

const ProductListingList = combineHOC()(
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

    if (!props?.isDone && props.products && props.products.length === 0) {
      return <UiExtension uiId="INFINITE_SCROLL_LOADING" />;
    }

    if (props?.isLoading && !props?.pageInfo?.current_page) {
      return <UiExtension uiId="INFINITE_SCROLL_LOADING" />;
    }

    return (
      <section className="b-content__listing mb-3 md:mb-8">
        <div
          id="products-listing-container"
          ref={containerRef}
          className="b-products b-product-list"
        >
          {props.products?.map((product: any) => {
            return (
              <div key={product.uid}>
                <UiExtension
                  uiId="PRODUCT_LISTING_ITEM_VERTICAL"
                  product={product}
                />
              </div>
            );
          })}
          {router.asPath.includes('catalog-search') &&
            props.products &&
            !props?.loadingList &&
            Array.isArray(props.products) &&
            props.products.length === 0 && (
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
                            <li>
                              You can always narrow your search results later
                            </li>
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
              className="btn-default text-14px mt-3 h-40px hover:opacity-80 mb-5 pl-4 pr-4"
              onClick={() => loadMore()}
            >
              Load More
            </button>
          )}

          {props?.isLoading && !props?.isDone && (
            <UiExtension uiId="INFINITE_SCROLL_LOADING" />
          )}
        </div>
      </section>
    );
  })
);
export default ProductListingList;
