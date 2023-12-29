'use client';
import moment from 'moment/moment';
import { useMemo } from 'react';

const Footer = () => {
  const version = useMemo(() => {
    if (process.env.NEXT_PUBLIC_DEPLOY_TIMESTAMP) {
      return `${moment(process.env.NEXT_PUBLIC_DEPLOY_TIMESTAMP).format(
        'YYYY-MM-DD HH:mm:ss',
      )}`;
    } else {
      return '';
    }
  }, []);
  return (
    <div>
      <p className="pt-6 text-center ltr:sm:text-left rtl:sm:text-right dark:text-white-dark">
        © {new Date().getFullYear()}. Meta. Build
        <span className="text-danger"> {version}</span>
      </p>
    </div>
  );
};

export default Footer;
