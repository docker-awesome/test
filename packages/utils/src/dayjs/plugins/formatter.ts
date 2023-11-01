import type { OpUnitType } from 'dayjs';
import dayjs from 'dayjs';

type IOptions = { start?: OpUnitType; end?: OpUnitType };

class Formatter {
  // 时间处理
  static handler = (
    time: dayjs.ConfigType,
    options: IOptions = {
      start: undefined,
      end: undefined,
    },
  ) => {
    if (!time) {
      return dayjs();
    }

    const { start, end } = options || {};
    if (start) {
      return dayjs(time).startOf(start);
    }

    if (end) {
      return dayjs(time).endOf(end);
    }

    return dayjs(time);
  };

  // 自定义格式化
  static format = (
    time: dayjs.ConfigType,
    options: IOptions & { format?: string } = {
      format: 'YYYY-MM-DD HH:mm:ss',
      start: undefined,
      end: undefined,
    },
  ) => {
    const { format = 'YYYY-MM-DD HH:mm:ss', start, end } = options || {};
    const d = Formatter.handler(time, { start, end });
    return d.format(format);
  };

  // 格式化日期时间 'YYYY-MM-DD HH:mm:ss' | undefined
  static formatDateTime = (time?: dayjs.ConfigType, options: IOptions = {}) => {
    return Formatter.format(time, {
      ...options,
      format: 'YYYY-MM-DD HH:mm:ss',
    });
  };

  // 格式化日期 'YYYY-MM-DD' | undefined
  static formatDate = (time?: dayjs.ConfigType, options: IOptions = {}) => {
    return Formatter.format(time, {
      ...options,
      format: 'YYYY-MM-DD',
    });
  };

  // 格式化时间 'HH:mm:ss' | undefined
  static formatTime = (time?: dayjs.ConfigType, options: IOptions = {}) => {
    return Formatter.format(time, {
      ...options,
      format: 'HH:mm:ss',
    });
  };
}

export type IFormatter = typeof Formatter;
export default Formatter;
