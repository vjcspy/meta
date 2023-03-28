import {
  getProductReviewPageAction,
  getProductReviewPageAfterAction,
} from '@modules/catalog/store/product/product.actions';
import {
  selectLoadingSetReview,
  selectProduct,
  selectProductReviewRequestPage,
  selectProductReviews,
} from '@modules/catalog/store/product/product.selectors';
import { useGetProductReviewsBySkuLazyQuery } from '@vjcspy/apollo';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useProductReviews = () => {
  const product = useSelector(selectProduct);
  const productReviewData = useSelector(selectProductReviews);
  const productReviewRequestPage = useSelector(selectProductReviewRequestPage);
  const loadingSetReview = useSelector(selectLoadingSetReview);

  const dispatch = useDispatch();
  const [productReviewQuery, productReviewResult] =
    useGetProductReviewsBySkuLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

  useEffect(() => {
    if (product?.sku) {
      productReviewQuery({
        variables: {
          sku: product.sku,
          pageSize: 50,
          currentPage: 1,
        },
      });
    }
  }, [
    product?.sku,
    productReviewRequestPage?.pageSize,
    productReviewRequestPage?.currentPage,
  ]);

  useEffect(() => {
    if (productReviewResult.error) {
      console.error(
        'Could not get product review data',
        productReviewResult.error
      );
    }
    if (
      productReviewResult.data &&
      Array.isArray(productReviewResult.data.products?.items) &&
      productReviewResult.data.products?.items[0]
    ) {
      dispatch(
        getProductReviewPageAfterAction({
          productReviewData: productReviewResult.data.products?.items[0],
        })
      );
    }
  }, [productReviewResult?.data, productReviewResult?.error]);

  const doGetProductReviewNextPage = useCallback(
    (currentPage: number, pageSize = 5) => {
      dispatch(
        getProductReviewPageAction({
          currentPage,
          pageSize,
        })
      );
    },
    []
  );

  const productReviewCountInfo = useMemo(() => {
    const reviews = productReviewData?.reviews?.items ?? [];
    const count: any = {};
    if (Array.isArray(reviews)) {
      reviews.forEach((value: any) => {
        count[Math.ceil(parseFloat(value['average_rating']) / 20) + ''] =
          (count[Math.ceil(parseFloat(value['average_rating']) / 20) + ''] ??
            0) + 1;
      });
    }

    return { count };
  }, [productReviewData]);

  return {
    state: {
      productReviewData,
      productReviewCountInfo,
      loadingSetReview,
    },
    actions: {
      doGetProductReviewNextPage,
    },
  };
};
