export enum ENV_KEY {
  PORT = 'PORT',
  HOST = 'HOST',
}

export class ENV {
  static get(key: ENV_KEY, defaultValue: string = null): any {
    return process.env[key] || defaultValue;
  }
}
