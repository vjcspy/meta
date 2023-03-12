import { withNavigatorSelectionAction } from '@main/packages-web-storefront/src/modules/content/hoc/navigator/withNavigatorSelectionAction';
import { combineHOC } from '@web/ui-extension';
import React, { useCallback, useMemo } from 'react';

export default combineHOC(withNavigatorSelectionAction)(
  function NavigatorSelectionAttribute(props: any) {
    const selectAttributeOption = useCallback(
      (attribute: any, optionValue: string) => {
        if (props?.handleAction) {
          const action = { ...props.action, attribute, optionValue };
          props.handleAction(action);
        }
      },
      []
    );

    const AttributeHtml = useMemo(() => {
      if (
        props.additionalData &&
        props.additionalData['input_type'] === 'select' &&
        Array.isArray(props.additionalData['attribute_options'])
      ) {
        // Kiểu select bình thường
        const swatches = props.additionalData['swatches'];

        if (!Array.isArray(swatches) || swatches.length === 0) {
          return (
            <div>
              {props.additionalData['attribute_options'].map((option) => (
                <button
                  className="swatch-options"
                  key={option.value}
                  value={option.value}
                  onClick={() =>
                    selectAttributeOption(props.additionalData, option.value)
                  }
                >
                  {option.label}
                </button>
              ))}
            </div>
          );
        } else {
          // Kiểu swatch
          return (
            <div className="navigator-options">
              {props.additionalData['attribute_options'].map((option) => {
                const swatch = swatches.find(
                  (s) => s['option_id'] == option['value']
                );
                if (swatch) {
                  if (swatch['type'] == 1) {
                    // Là kiểu màu sắc
                    return (
                      <button
                        key={option.value}
                        className="swatch-option color "
                        tabIndex={-1}
                        style={{
                          backgroundSize: 'initial',
                          backgroundColor: swatch['value'],
                        }}
                        onClick={() =>
                          selectAttributeOption(
                            props.additionalData,
                            option.value
                          )
                        }
                      >
                        {option.label}
                      </button>
                    );
                  }

                  if (swatch['type'] == 0) {
                    // Kieu  text
                    return (
                      <button
                        className="swatch-option"
                        key={option.value}
                        value={option.value}
                        onClick={() =>
                          selectAttributeOption(
                            props.additionalData,
                            option.value
                          )
                        }
                      >
                        {option.label}
                      </button>
                    );
                  }
                  console.warn(
                    'We still not  yet  support this swatch type',
                    swatch
                  );
                } else {
                  console.warn(
                    'Could not found swatch data for attribute',
                    props.additionalData
                  );
                  return null;
                }
              })}
            </div>
          );
        }
      }

      return <div>{props.name}</div>;
    }, [props.additionalData]);

    return <div>{AttributeHtml}</div>;
  }
);
