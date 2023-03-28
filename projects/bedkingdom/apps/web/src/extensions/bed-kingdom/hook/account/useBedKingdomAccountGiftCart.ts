import { AlertService } from '@extensions/bed-kingdom/components/common/page-message/AlertService';
import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import {
  useAddAmGiftCardCodeToAccountMutation,
  useAmUserGiftCardAccountLazyQuery,
  useRemoveAmGiftCardCodeToAccountMutation,
} from '@vjcspy/apollo-bed-kingdom';
import { useCallback, useEffect, useState } from 'react';

export const useBedKingdomAccountGiftCart = () => {
  const [statusRemove, setStatusRemove] = useState<boolean>(false);
  const [statusAdd, setStatusAdd] = useState<boolean>(false);

  const [amUserGiftCardAccountQuery, amUserGiftCardAccountRes] =
    useAmUserGiftCardAccountLazyQuery({
      fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    });

  const [
    removeAmGiftCardCodeToAccountMutation,
    removeAmGiftCardCodeToAccountRes,
  ] = useRemoveAmGiftCardCodeToAccountMutation();

  const [addAmGiftCardCodeToAccountMutation, addAmGiftCardCodeToAccountRes] =
    useAddAmGiftCardCodeToAccountMutation();

  const amGiftCardAccount = useCallback(() => {
    amUserGiftCardAccountQuery();
  }, []);

  const removeAmGiftCardCode = useCallback((amGiftcardCode: any) => {
    removeAmGiftCardCodeToAccountMutation({ variables: { amGiftcardCode } });
  }, []);

  const applyAmGiftCardCode = useCallback((amGiftcardCode: any) => {
    setStatusAdd(true);
    addAmGiftCardCodeToAccountMutation({ variables: { amGiftcardCode } });
  }, []);

  useEffect(() => {
    amGiftCardAccount();
  }, []);

  useEffect(() => {
    if (amUserGiftCardAccountRes.data?.amUserGiftCardAccount) {
      // dispatch(
      //   requestPasswordResetAfterAction({
      //     status: !!amUserGiftCardAccountRes.data?.requestPasswordResetEmail,
      //   })
      // );
    }

    if (amUserGiftCardAccountRes.error) {
      console.log(' error amUserGiftCardAccountRes ');
    }
  }, [amUserGiftCardAccountRes.data, amUserGiftCardAccountRes.error]);

  useEffect(() => {
    if (
      removeAmGiftCardCodeToAccountRes.data?.removeAmGiftCardCodeToAccount
        ?.error === false
    ) {
      setStatusRemove(false);
      AlertService.success('Remove Gift Cart success.');
      amGiftCardAccount();
    } else {
      setStatusRemove(false);
    }

    if (removeAmGiftCardCodeToAccountRes.error) {
      AlertService.error('Remove Gift Cart Error.');
      setStatusRemove(false);
    }
  }, [
    removeAmGiftCardCodeToAccountRes.data,
    removeAmGiftCardCodeToAccountRes.error,
  ]);

  useEffect(() => {
    if (
      addAmGiftCardCodeToAccountRes.data?.addAmGiftCardCodeToAccount?.error ===
      false
    ) {
      setStatusAdd(false);
      AlertService.success('Add Gift Cart success.');
      amGiftCardAccount();
    } else if (
      addAmGiftCardCodeToAccountRes.data?.addAmGiftCardCodeToAccount?.error &&
      addAmGiftCardCodeToAccountRes.data?.addAmGiftCardCodeToAccount?.message
    ) {
      AlertService.error(
        addAmGiftCardCodeToAccountRes.data?.addAmGiftCardCodeToAccount?.message
      );
      setStatusAdd(false);
    }

    if (addAmGiftCardCodeToAccountRes.error) {
      AlertService.error('Wrong Gift Cart code.');
      setStatusAdd(false);
    }
  }, [addAmGiftCardCodeToAccountRes.data, addAmGiftCardCodeToAccountRes.error]);

  return {
    state: {
      amUserGiftCardList:
        amUserGiftCardAccountRes.data?.amUserGiftCardAccount || [],
      statusRemove,
      statusAdd,
    },
    actions: {
      amGiftCardAccount,
      removeAmGiftCardCode,
      applyAmGiftCardCode,
    },
  };
};
