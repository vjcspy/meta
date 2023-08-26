import { AbstractContext } from './AbstractContext';

export class XAppContext extends AbstractContext {}

const _xAppContext = new XAppContext();
export const xAppContext = (): XAppContext => _xAppContext;
