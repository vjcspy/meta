export enum ENV_KEY {
  PORT = 'PORT',
  HOST = 'HOST',
}

export class ENV {
  static get(key: ENV_KEY, defaultValue: any = null): any {
    return process.env[key] || defaultValue;
  }
}
