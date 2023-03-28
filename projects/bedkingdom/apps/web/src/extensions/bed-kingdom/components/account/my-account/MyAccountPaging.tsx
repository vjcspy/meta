import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import React from 'react';

const MyAccountPaging: React.FC<{
  itemCount: any;
  itemFrom: any;
  itemTo: any;
  totalPage: any;
  currentPage: any;
  pageSize: any;
  setPageSizeAction: (data: number) => void;
  setPageCurrentAction: (data: number) => void;
}> = combineHOC()((props) => {
  return (
    <div className="b-pager my-8 items-center justify-between text-15px md:flex mdm:text-center">
      <p className="b-toolbar-amount hidden md:block">
        <span className="toolbar-number">
          Items {props?.itemFrom} to {props?.itemTo} of {props?.itemCount} total
        </span>
      </p>
      {props?.totalPage > 1 && (
        <div className="b-pages mdm:mb-4">
          <ul className="items pages-items  flex items-center justify-center">
            {/*them class disabled khi chua next luc dau*/}
            <li
              className={clsx(
                'item pages-item-action',
                props?.currentPage === 1 && 'disabled'
              )}
            >
              <div
                className="action prev"
                onClick={() => {
                  props?.setPageCurrentAction(props?.currentPage - 1);
                }}
              >
                <span>Prev</span>
              </div>
            </li>
            {/*them class active khi*/}

            {[...Array(props?.totalPage)].map((number: any, key: number) => {
              return (
                <li
                  className={clsx(
                    'item',
                    props?.currentPage === key + 1 && 'active'
                  )}
                  key={key}
                  onClick={() => {
                    props?.setPageCurrentAction(key + 1);
                  }}
                >
                  <strong className="page">
                    <span>{key + 1}</span>
                  </strong>
                </li>
              );
            })}

            <li
              className={clsx(
                'item pages-item-action',
                props?.currentPage === props?.totalPage && 'disabled'
              )}
            >
              <div
                className="action next"
                onClick={() => {
                  props?.setPageCurrentAction(props?.currentPage + 1);
                }}
              >
                <span>Next</span>
              </div>
            </li>
          </ul>
        </div>
      )}

      <div className="limiter">
        <strong className="limiter-label">Show</strong>
        <select
          id="limiter"
          className="limiter-options mx-2 rounded-3 border border-color-ccc bg-gray-100 p-2"
          onChange={(val) => {
            if (val?.target?.value !== props?.pageSize) {
              props?.setPageSizeAction(val?.target?.value);
            }
          }}
          defaultValue={props?.pageSize}
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="limiter-text">per page</span>
      </div>
    </div>
  );
});

export default MyAccountPaging;
