import { withBedkingdomProductAttachmentData } from '@extensions/bed-kingdom/hoc/product/withBedkingdomProductAttachmentData';
import { withOnlyCurrentProductState } from '@extensions/bed-kingdom/hoc/product/withOnlyCurrentProductState';
import { combineHOC } from '@web/ui-extension';
import React, { useEffect, useState } from 'react';

const Detail = combineHOC(
  withOnlyCurrentProductState,
  withBedkingdomProductAttachmentData
)(
  React.memo((props) => {
    const [showDescription, setShowDescription] = useState(true);
    return (
      <div className="b-product-info b-info-description cursor-pointer">
        <div
          className="b-info-label flex items-center justify-between"
          onClick={() => {
            setShowDescription(!showDescription);
          }}
        >
          Details
          {showDescription ? (
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
        <div className={`b-info-content ${showDescription && 'active'}`}>
          {props?.dataProductAttachment &&
            props?.dataProductAttachment.length > 0 &&
            props?.dataProductAttachment.map((item: any) => (
              <div
                className="widget am-attachments am-attachments-"
                key={item?.frontend_url}
              >
                <div className="am-fileline">
                  <img
                    src={item?.icon_url || ''}
                    className="am-fileicon"
                    loading="lazy"
                    width="25px"
                    height="30px"
                    alt={item?.label ?? ''}
                  />
                  <a
                    href={item?.frontend_url || ''}
                    className="am-filelink"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item?.label}
                  </a>
                  <span className="am-filesize">
                    ({item?.readable_file_size})
                  </span>
                </div>
              </div>
            ))}
          <div
            className=""
            aria-hidden="true"
            dangerouslySetInnerHTML={{
              __html: props.state?.product?.description?.html || '',
            }}
          />
        </div>
      </div>
    );
  })
);

export default Detail;
