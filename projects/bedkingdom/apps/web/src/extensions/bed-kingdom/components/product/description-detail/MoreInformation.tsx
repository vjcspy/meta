import { withBedkingdomProductMoreInfoData } from '@extensions/bed-kingdom/hoc/product/withBedkingdomProductMoreInfoData';
import { withOnlyCurrentProductState } from '@extensions/bed-kingdom/hoc/product/withOnlyCurrentProductState';
import { combineHOC } from '@web/ui-extension';
import React, { useState } from 'react';

const MoreInformation = combineHOC(
  withOnlyCurrentProductState,
  withBedkingdomProductMoreInfoData
)(
  React.memo((props) => {
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    return (
      <div className="b-product-info b-info-more-information cursor-pointer">
        <div
          className="b-info-label flex items-center justify-between"
          onClick={() => {
            setShowMoreInfo(!showMoreInfo);
          }}
        >
          More Information
          {showMoreInfo ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="16px"
              id="Layer_1"
              version="1.1"
              viewBox="0 0 512 512"
              width="16px"
            >
              <rect height="64" width="384" x="64" y="224" />
            </svg>
          ) : (
            <svg
              fill="#000000"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16px"
              height="16px"
            >
              <path
                fillRule="evenodd"
                d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
              />
            </svg>
          )}
        </div>
        {showMoreInfo && (
          <>
            {props.dataProductMoreInformation &&
            props.dataProductMoreInformation.length > 0 ? (
              <table>
                <tbody className={`b-info-content ${showMoreInfo && 'active'}`}>
                  {props.dataProductMoreInformation.map((item: any) => (
                    <tr key={JSON.stringify(item?.code)}>
                      <th className="label">{item?.label}</th>
                      <td className="data">{item?.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="b-info-content active">
                <h2 className="button-info  mb-3">
                  <strong>No More Information</strong>
                </h2>
              </div>
            )}
          </>
        )}
      </div>
    );
  })
);

export default MoreInformation;
