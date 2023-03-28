import { useResponsive } from '@modules/ui/hook/useResponsive';
import COMMON from '@values/extendable/COMMON';
import { withProductInfo } from '@vjcspy/r/build/modules/catalog/hoc/category/withProductInfo';
import { withCustomizableOptionActions } from '@vjcspy/r/build/modules/catalog/hoc/product/withCustomizableOptionActions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

const PriceInfo = React.memo((props: any) => {
  if (props.price_type === 'FIXED') {
    return (
      <>
        {!isNaN(props.value['price']) &&
          props.value['price'] > 0 &&
          props.value['price_type'] === 'FIXED' && (
            <>
              <span>+</span>
              <UiExtension uiId="CURRENCY" price={props.value['price']} />
            </>
          )}
      </>
    );
  } else {
    return <>{props.value['price']}</>;
  }
});

const Select = combineHOC(
  withProductInfo,
  withCustomizableOptionActions
)((props) => {
  const [collapse, setCollapse] = useState(false);
  const { isMobile } = useResponsive();
  const isSelectionHasValue = useMemo(
    () => props?.fns?.isSelectionHasValue(),
    [props?.fns?.isSelectionHasValue]
  );
  return (
    <div
      className={clsx(
        'b-product-options',
        (collapse || isSelectionHasValue) && 'active',
        props?.showRequired && 'required'
      )}
    >
      <div
        className="options-label flex justify-between items-center"
        onClick={() => {
          !isSelectionHasValue && setCollapse(!collapse);
        }}
      >
        <span>{props.option['title']}</span>
        {!isSelectionHasValue && <i className="fa fa-angle-down" />}
      </div>
      <div className={clsx('options-content options-customs')}>
        {props?.option?.value.map((v: any) => {
          if (
            isSelectionHasValue &&
            !props?.fns?.isCustomizableOptionSelected(v?.uid)
          ) {
            return null;
          }

          return (
            <div
              className={clsx(
                'options-item options-custom justify-between',
                props?.fns?.isCustomizableOptionSelected(v['uid']) && 'active'
              )}
              key={v['option_type_id']}
            >
              <div className="flex items-center mdm:w-full">
                <a
                  href={COMMON.r('BASE_URL') + `${v?.url}` + '.html'}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src={v?.base_image}
                    alt="Flair Furnishings Ollie Triple Bunk Bed"
                  />
                </a>

                <div className="item-info mdm:w-full">
                  <span className="item-name">{v['title']}</span>
                  <div className="item-price relative">
                    <PriceInfo value={v} />
                    {/*Button Mobile Click button xong thi them class hidden*/}
                    {isMobile &&
                      !props?.fns?.isCustomizableOptionSelected(v['uid']) && (
                        <div
                          className="btn-default pl-4 pr-4 text-xs max-w-125 h-26px bg-main-eac200 btn-customize"
                          onClick={() =>
                            props?.actions?.customizable?.toggleCustomizableOption(
                              props.option.uid,
                              v.uid
                            )
                          }
                        >
                          Select
                        </div>
                      )}
                    {/*show group khi click button select ben duoi acc class active*/}
                    {props?.fns?.isCustomizableOptionSelected(v['uid']) && (
                      <div className="group-choose-options flex justify-between mt-1 md:mt-2">
                        {/* */}
                        <div
                          className="btn-default pl-2 pr-2 md:pl-3 md:pr-3 text-xs h-26px mr-1 md:mr-2 whitespace-nowrap"
                          onClick={() => {
                            props?.actions?.customizable?.toggleCustomizableOption(
                              props.option.uid,
                              v.uid
                            );
                            setCollapse(false);
                          }}
                        >
                          Remove options
                        </div>
                        {/*Show cac option con lai khi nhan class nay*/}
                        <div
                          className="btn-default pl-2 pr-2 md:pl-3 md:pr-3 text-xs h-26px mr-1 md:mr-2 whitespace-nowrap"
                          onClick={() => {
                            props?.actions?.customizable?.toggleCustomizableOption(
                              props.option.uid,
                              v.uid
                            );
                            setCollapse(true);
                          }}
                        >
                          Change options
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/*Click button xong thi them class hidden*/}
              {!isMobile &&
                !props?.fns?.isCustomizableOptionSelected(v['uid']) && (
                  <div
                    className="btn-default pl-7 pr-7 text-14px h-36px bg-main-eac200"
                    onClick={() =>
                      props?.actions?.customizable?.toggleCustomizableOption(
                        props.option.uid,
                        v.uid
                      )
                    }
                  >
                    Select
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default Select;
