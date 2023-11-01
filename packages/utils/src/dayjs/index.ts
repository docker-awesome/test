import dayjs from 'dayjs';
import './locales';
import type { IFormatter } from './plugins';
import plugins from './plugins';

export type IDayjs = typeof dayjs & {
  $: IFormatter & { [key: string]: any };
};

dayjs.extend(plugins);

export default dayjs as IDayjs;
