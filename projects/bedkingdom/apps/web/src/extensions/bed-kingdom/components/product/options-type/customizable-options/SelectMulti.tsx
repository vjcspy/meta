import { useResponsive } from '@modules/ui/hook/useResponsive';
import COMMON from '@values/extendable/COMMON';
import { withProductInfo } from '@vjcspy/r/build/modules/catalog/hoc/category/withProductInfo';
import { withCustomizableOptionActions } from '@vjcspy/r/build/modules/catalog/hoc/product/withCustomizableOptionActions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useState } from 'react';

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
  return (
    <div
      className={clsx(
        'b-product-options',
        collapse && 'active',
        props?.showRequired && 'required'
      )}
    >
      <div
        className="options-label flex items-center justify-between"
        onClick={() => {
          setCollapse(!collapse);
        }}
      >
        <span>{props.option['title']}</span>
        {<i className="fa fa-angle-down" />}
      </div>
      <div className={clsx('options-content options-customs')}>
        {props?.option?.value.map((v: any) => {
          // if (
          //   isSelectionHasValue &&
          //   !props?.fns?.isCustomizableOptionSelected(v?.uid)
          // ) {
          //   return null;
          // }

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
                  <div className="item-name">{v['title']}</div>
                  <div className="mt-1 text-16px font-bold text-color-2362AA">
                    <PriceInfo value={v} />
                  </div>
                  <div className="item-price relative">
                    {/*Button Mobile Click button xong thi them class hidden*/}
                    {isMobile &&
                      !props?.fns?.isCustomizableOptionSelected(v['uid']) && (
                        <div
                          className="btn-default btn-customize h-26px max-w-125 bg-main-eac200 px-4 text-xs"
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
                      <div className="group-choose-options mt-1 flex justify-between md:mt-2">
                        {/* */}
                        <div
                          className="btn-default mr-1 h-26px whitespace-nowrap px-2 text-xs md:mr-2 md:px-3"
                          onClick={() => {
                            props?.actions?.customizable?.toggleCustomizableOption(
                              props.option.uid,
                              v.uid
                            );
                            // setCollapse(false);
                          }}
                        >
                          Remove options
                        </div>
                        {/*Show cac option con lai khi nhan class nay*/}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {/*Click button xong thi them class hidden*/}
              {!isMobile &&
                !props?.fns?.isCustomizableOptionSelected(v['uid']) && (
                  <div
                    className="btn-default h-36px bg-main-eac200 px-7 text-14px"
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
