import type { IncomingMessage } from 'http';

export function absoluteUrl(
  req?: IncomingMessage,
  localhostAddress = 'localhost:3000'
) {
  let host =
    (req?.headers ? req.headers.host : window.location.host) ||
    localhostAddress;
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

  return {
    protocol,
    host,
    origin: protocol + '//' + host,
  };
}
