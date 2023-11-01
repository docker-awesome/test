import type { Constructor } from 'currency.js';
import Formatter from './formatter';

export type IFormatter = typeof Formatter;

export type Factory = Constructor & {
  $: IFormatter & { [key: string]: any };
  [key: string]: any;
};

export default (option: any, currencyjsFactory: Factory) => {
  // extend currencyjs
  // e.g. add currencyjs.callback()
  // currencyjsFactory.callback = arguments => {}
  currencyjsFactory.$ = Formatter;
};
