import {
  AlertService,
  AlertType,
} from '@extensions/bed-kingdom/components/common/page-message/AlertService';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';

// onClick={() => AlertService.success('Success!!')}

// @ts-ignore
const Alert = ({ id, fade }) => {
  const mounted = useRef(false);
  const router = useRouter();
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    mounted.current = true;

    // subscribe to new alert notifications
    const subscription = AlertService.onAlert(id).subscribe((alert) => {
      // clear alerts when an empty alert is received
      if (!alert.message) {
        setAlerts((alerts) => {
          // filter out alerts without 'keepAfterRouteChange' flag
          const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          return omit(filteredAlerts, 'keepAfterRouteChange');
        });
      } else {
        // add alert to array with unique id
        alert.itemId = Math.random();
        setAlerts((alerts) => [...alerts, alert]);

        // auto close alert if required
        if (alert.autoClose) {
          setTimeout(() => removeAlert(alert), 5000);
        }
      }
    });

    // clear alerts on location change
    const clearAlerts = () => AlertService.clear(id);
    router.events.on('routeChangeStart', clearAlerts);

    // clean up function that runs when the component unmounts
    return () => {
      mounted.current = false;

      // unsubscribe to avoid memory leaks
      subscription.unsubscribe();
      router.events.off('routeChangeStart', clearAlerts);
    };
  }, []);

  function omit(arr: any, key: any) {
    return arr.map((obj: any) => {
      const { [key]: omitted, ...rest } = obj;
      return rest;
    });
  }

  function removeAlert(alert: any) {
    if (!mounted.current) return;

    if (fade) {
      // fade out alert
      setAlerts((alerts) =>
        alerts.map((x) =>
          x.itemId === alert.itemId ? { ...x, fade: true } : x
        )
      );

      // remove alert after faded out
      setTimeout(() => {
        setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId));
      }, 250);
    } else {
      // remove alert
      setAlerts((alerts) => alerts.filter((x) => x.itemId !== alert.itemId));
    }
  }

  function cssClasses(alert: any) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]:
        'message message-success mt-3 mb-3 pt-2 pb-2 pl-4 pr-4',
      [AlertType.Error]: 'message message-error mt-3 mb-3 pt-2 pb-2 pl-4 pr-4',
      [AlertType.Warning]:
        'message message-warning mt-3 mb-3 pt-2 pb-2 pl-4 pr-4',
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

  if (!alerts.length) return null;

  return (
    <div className="page-message">
      <div className="container mx-auto px-4">
        {alerts.map((alert, index) => (
          <div key={index} className={cssClasses(alert)}>
            <span>{alert.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Alert;
