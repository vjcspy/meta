import { useState } from 'react';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

export const AlertService = {
  onAlert,
  success,
  error,
  warn,
  alert,
  clear,
};

export const AlertType = {
  Success: 'Success',
  Error: 'Error',
  Warning: 'Warning',
};

const options = {
  autoClose: true,
  keepAfterRouteChange: true,
};

const alertSubject = new Subject();
const defaultId = 'default-alert';

// enable subscribing to alerts observable
function onAlert(id = defaultId) {
  return alertSubject.asObservable().pipe(filter((x: any) => x && x.id === id));
}

// convenience methods
function success(message: any) {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  alert({ ...options, type: AlertType.Success, message });
}

function error(message: any) {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  alert({ ...options, type: AlertType.Error, message });
}

function warn(message: any) {
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
  alert({ ...options, type: AlertType.Warning, message });
}

// core alert method
function alert(alert: any) {
  alert.id = alert.id || defaultId;
  alert.autoClose = alert.autoClose === undefined ? true : alert.autoClose;
  alertSubject.next(alert);
}

// clear alerts
function clear(id = defaultId) {
  alertSubject.next({ id });
}
