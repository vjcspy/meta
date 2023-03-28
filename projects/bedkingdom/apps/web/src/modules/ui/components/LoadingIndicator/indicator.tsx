import React from 'react';

// import { Loader as LoaderIcon } from 'react-feather';
import classes from './indicator.module.scss';

const LoadingIndicator = (props: any) => {
  return (
    <div className={props.global ? classes.root : classes.container}>
      <div className={classes.indicator_inner}>
        <span className={classes.indicator}>
          <span className="loader"></span>
        </span>
        <div className={classes.message}>
          <span className="indicator-message">
            {props.defaultMessage ? 'loading_data' : props.children}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
