import { AlertService } from '@extensions/bed-kingdom/components/common/page-message/AlertService';
import { useAddXnotifStockMutation } from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';
import { useCallback, useEffect, useState } from 'react';

export const withBedKingdomXnotifStock = createUiHOC(() => {
  const [xnotifStockMutation, xnotifStockRes] = useAddXnotifStockMutation();

  const xnotifStockSubmit = useCallback((email: string, productId: number) => {
    xnotifStockMutation({
      variables: {
        input: {
          email,
          product_id: productId,
        },
      },
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (xnotifStockRes.data?.xnotifStock) {
      AlertService.success(xnotifStockRes.data?.xnotifStock);
    }

    if (xnotifStockRes.error) {
      AlertService.error('Unable to submit contact, please try again.');
    }
  }, [xnotifStockRes.data, xnotifStockRes.error]);

  return {
    actions: {
      xnotifStockSubmit,
    },
  };
}, 'withBedKingdomXnotifStock');
