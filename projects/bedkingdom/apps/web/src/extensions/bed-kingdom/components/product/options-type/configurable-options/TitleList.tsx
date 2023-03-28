import { withProductInfo } from '@vjcspy/r/build/modules/catalog/hoc/category/withProductInfo';
import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import React from 'react';

const TitleList = combineHOC(withProductInfo)((props) => {
  return (
    <>
      <div className="b-product-options active">
        <div className="options-label flex justify-between items-center">
          <span>{props.option['label']}</span>
          <i className="fa fa-angle-up" />
        </div>
        <div className="options-content">
          {props.option['values'].map((value: any) => {
            return (
              <button
                className={clsx(
                  'options-item options-size',
                  props.state?.productInfo?.configurable?.super_attribute[
                    props.option['attribute_code']
                  ] === value['uid'] && 'active',
                  !props.fns.configurable.isOptionValueAvailable(
                    props.option['attribute_code'],
                    value['uid']
                  ) && 'divDisable'
                )}
                onClick={() =>
                  props.actions.configurable.toggleConfigurableOption(
                    props.option['attribute_code'],
                    value['uid']
                  )
                }
                disabled={
                  !props.fns.configurable.isOptionValueAvailable(
                    props.option['attribute_code'],
                    value['uid']
                  )
                }
                key={value['uid']}
              >
                <span>{value['label']}</span>
                <i className="fa fa-check-circle" />
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
});

export default TitleList;
