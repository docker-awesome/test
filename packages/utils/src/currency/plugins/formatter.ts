import currencyjs from 'currency.js';

class Formatter {
  // 人民币格式化
  static rmb = (value: currencyjs.Any, options: currencyjs.Options = {}) => {
    return Formatter.format(value, {
      precision: 2,
      ...options,
      symbol: '¥',
    });
  };

  // 千分位格式化
  static format = (value: currencyjs.Any, options: currencyjs.Options = {}) => {
    return currencyjs(value, {
      symbol: '',
      ...options,
    }).format();
  };

  // 整数
  static formatInt = (
    value: currencyjs.Any,
    options: currencyjs.Options = {},
  ) => {
    return Formatter.format(value, {
      ...options,
      precision: 0,
    });
  };

  // 单精度
  static formatFloat = (
    value: currencyjs.Any,
    options: currencyjs.Options = {},
  ) => {
    return Formatter.format(value, {
      ...options,
      precision: 1,
    });
  };

  // 双精度
  static formatDouble = (
    value: currencyjs.Any,
    options: currencyjs.Options = {},
  ) => {
    return Formatter.format(value, {
      ...options,
      precision: 2,
    });
  };

  // 单位格式化
  static transform = (
    number: number | bigint,
    options: Record<string, any> = {},
    locales: any = 'zh-CN',
  ) => {
    if (Intl?.NumberFormat) {
      return new Intl.NumberFormat(locales, {
        useGrouping: true,
        notation: 'compact',
        maximumFractionDigits: 2,
        ...options,
      }).format(number);
    }

    return number;
  };
}

export default Formatter;
