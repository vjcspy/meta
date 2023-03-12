import { useTranslation } from '@main/packages-web-i18n';
import React from 'react';
import { Loader as LoaderIcon } from 'react-feather';

import classes from './indicator.module.scss';

const LoadingIndicator = (props: any) => {
  const { t } = useTranslation('common');
  return (
    <div className={props.global ? classes.root : classes.container}>
      <div className={classes.indicator_inner}>
        <span className={classes.indicator}>
          <LoaderIcon size={64} />
        </span>
        <div className={classes.message}>
          <span className="indicator-message">
            {props.defaultMessage ? t('loading_data') : props.children}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
