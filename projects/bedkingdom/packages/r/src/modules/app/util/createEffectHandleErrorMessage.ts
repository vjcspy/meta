import type { PayloadActionCreator } from '@main/packages-web-redux';
import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { appShowErrorMessages } from '@modules/app/store/app.actions';
import { EMPTY } from 'rxjs';
import { map } from 'rxjs/operators';

export const createEffectHandleErrorMessage = (
  ...allowedTypes: Array<string | PayloadActionCreator<any>>
) => {
  return createEffect((action$) =>
    action$.pipe(
      ofType(...allowedTypes),
      map((action: any) => {
        if (
          action['payload'] &&
          action.payload['error'] &&
          typeof action.payload.error['message'] === 'string'
        ) {
          return appShowErrorMessages({
            messages: action.payload.error['message'],
          });
        } else {
          return EMPTY;
        }
      })
    )
  );
};
