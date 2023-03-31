import type { IncomingMessage } from 'http';

export function absoluteUrl(req?: IncomingMessage) {
  let host = (req?.headers ? req.headers.host : window.location.host) || '';
  let protocol = /^localhost(:\d+)?$/.test(host) ? 'http:' : 'https:';

  if (
    req &&
    req.headers['x-forwarded-host'] &&
    typeof req.headers['x-forwarded-host'] === 'string'
  ) {
    host = req.headers['x-forwarded-host'];
  }

  if (
    req &&
    req.headers['x-forwarded-proto'] &&
    typeof req.headers['x-forwarded-proto'] === 'string'
  ) {
    protocol = `${req.headers['x-forwarded-proto']}:`;
  } else if (typeof location !== 'undefined') {
    protocol = location.protocol;
  }
  // var full = window.location.protocol+'//'+window.location.hostname+(window.location.port ? ':'+window.location.port: '');
  return {
    protocol,
    host,
    origin: protocol + '//' + host,
  };
}
