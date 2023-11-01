import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import Formatter from './formatter';
export { type IFormatter } from './formatter';

export default (
  option: any,
  dayjsClass: typeof Dayjs,
  dayjsFactory: typeof dayjs,
) => {
  // extend dayjs()
  // e.g. add dayjs().isSameOrBefore()
  // dayjsClass.prototype.isSameOrBefore = function(arguments) {}

  // extend dayjs
  // e.g. add dayjs.utc()
  // dayjsFactory.utc = arguments => {}
  (dayjsFactory as any).$ = Formatter;

  // overriding existing API
  // e.g. extend dayjs().format()
  /* const oldFormat = dayjsClass.prototype.format
  dayjsClass.prototype.format = function(arguments) {
    // original format result
    const result = oldFormat.bind(this)(arguments)
    // return modified result
  } */
};
