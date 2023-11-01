import type { ParsedQs } from 'qs';
import qs from 'qs';

type stringify = (
  ...args: Parameters<typeof qs.stringify>
) => ReturnType<typeof qs.stringify>;

type parse = (
  ...args: Parameters<typeof qs.parse>
) => ReturnType<typeof qs.parse> | ParsedQs;

class Qs {
  static stringify: stringify = (obj, options = {}) => {
    return qs.stringify(obj, {
      addQueryPrefix: true, // 添加 ?
      /* encoder: function (str, defaultEncoder, charset, type) {
        if (type === 'key') {
          // Encoded key
          return str;
        } else if (type === 'value') {
          // Encoded value
          return str;
        }
      }, */
      encoder: function (str) {
        return str;
      },
      ...options,
    });
  };

  static parse: parse = (str, options = {}) => {
    return qs.parse(str, {
      ignoreQueryPrefix: true, // 忽略 ?
      /* decoder: (str, defaultDecoder, charset, type) => {
        if (type === 'key') {
          // Decoded key
          return str;
        } else if (type === 'value') {
          // Decoded value
          return str;
        }
      }, */
      decoder: (str) => {
        return str;
      },
      ...options,
    });
  };
}

export default Qs;
