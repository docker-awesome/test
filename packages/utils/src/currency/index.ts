import type { Constructor } from 'currency.js';
import currencyjs from 'currency.js';
import type { Factory, IFormatter } from './plugins';
import plugins from './plugins';

export { type Factory } from './plugins';

export interface PluginFunc {
  <T = unknown>(option: T, c: Factory): void;
  $i?: boolean;
}

export interface Currencyjs extends Constructor {
  extend: <T = unknown>(plugin: PluginFunc, option?: T) => Constructor;
  $: IFormatter;
}

const FactoryClass = currencyjs as Currencyjs;

FactoryClass.extend = (plugin, option) => {
  if (!plugin.$i) {
    // install plugin only once
    plugin(option, FactoryClass);
    plugin.$i = true;
  }
  return FactoryClass;
};

FactoryClass.extend(plugins);

export default FactoryClass;
