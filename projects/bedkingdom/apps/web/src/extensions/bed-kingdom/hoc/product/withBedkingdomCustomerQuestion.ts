import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import {
  useAddBedProductQuestionMutation,
  useGetBedProductQuestionsLazyQuery,
} from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';
import { useCallback, useEffect } from 'react';

export const withBedkingdomCustomerQuestion = createUiHOC((props) => {
  const [getBedProductQuestionsQuery, getBedProductQuestionsRes] =
    useGetBedProductQuestionsLazyQuery({
      fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    });

  const [addBedProductQuestionMutation, addBedProductQuestionRes] =
    useAddBedProductQuestionMutation();

  const addQuestionForProduct = useCallback((input: any) => {
    addBedProductQuestionMutation({
      variables: { input },
    }).catch(() => {
      //EMPTY
    });
  }, []);

  useEffect(() => {
    if (props.state?.product?.id) {
      getBedProductQuestionsQuery({
        variables: {
          productId: props.state?.product?.id,
        },
      });
    }
  }, [props.state?.product?.id]);

  useEffect(() => {
    if (getBedProductQuestionsRes.error) {
      console.error('Could not load Product Questions data');
    }
  }, [getBedProductQuestionsRes.error]);

  useEffect(() => {
    if (getBedProductQuestionsRes.error) {
      console.error('Could not save Questions data');
    }

    if (getBedProductQuestionsRes.data) {
      console.info('Save Questions done');
    }
  }, [addBedProductQuestionRes.error, addBedProductQuestionRes.data]);

  return {
    dataProductQuestions:
      getBedProductQuestionsRes?.data?.getProductQuestions || {},
    actions: {
      addQuestionForProduct,
    },
  };
}, 'withBedkingdomCustomerQuestion');
