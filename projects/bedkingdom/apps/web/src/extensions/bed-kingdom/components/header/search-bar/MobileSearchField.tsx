import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import ROUTES from '@values/extendable/ROUTES';
import { isSSR } from '@web/base/dist/util/isSSR';
import { combineHOC } from '@web/ui-extension';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const MobileSearchField: React.FC<{
  onChange: () => void;
  handleFocus: () => void;
  handleOnClick: (val: boolean) => void;
}> = combineHOC(withRouterWithStoreActions)((props) => {
  const { handleFocus, onChange } = props;
  const { register, reset, setValue } = useForm();

  const go = useCallback((url: any) => {
    if (props.actions?.go) {
      props.actions.go(url);
    }
  }, []);

  const whenReset = useCallback(() => {
    reset();
    if (!isSSR()) {
      const inputElement = document.getElementById('text-search');
      if (inputElement) {
        inputElement.focus();
      }
    }
  }, []);

  useEffect(() => {
    if (props?.value) {
      setValue('q', props?.value);
    } else {
      setValue('q', '');
    }
  }, [props?.value]);

  return (
    <div className="form miniSearch">
      <div className="field search">
        <input
          id="search"
          type="text"
          placeholder="Search here..."
          autoComplete="off"
          className="input-text"
          {...register('q')}
          onChange={onChange}
          onFocus={handleFocus}
          onClick={handleFocus}
        />
        <button
          type="button"
          title="Search"
          className="action-search"
          onClick={() => {
            go(`${ROUTES.r('CATALOG_SEARCH')}/?q=${props.value}`);
            props.setExpanded(false);
            whenReset();
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z" />
          </svg>
        </button>
      </div>
      <span
        className="search-cancel"
        onClick={() => props.setActiveSearchMobile(false)}
      >
        Cancel
      </span>
    </div>
  );
});

export default MobileSearchField;
