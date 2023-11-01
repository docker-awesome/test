import { Base64 } from 'js-base64';

/**
 * Storage：
 * clear(): void; 清空本地存储
 * remove(key: string): void; 移除指定存储
 * set(key: string, value: any): void; 设置本地存储
 * get(key: string): any; 获取本地存储
 */
class Storage {
  static clear = () => {
    localStorage.clear();
  };

  static remove = (key: string) => {
    localStorage.removeItem(Base64.encode(key));
  };

  static set = (
    key: string,
    value: any,
    options?: {
      expires?: number;
    },
  ) => {
    const { expires } = options || {};

    localStorage.setItem(
      Base64.encode(key),
      Base64.encode(
        JSON.stringify({
          data: value,
          timestamp: Date.now(),
          expires,
        }),
      ),
    );
  };

  static get = (key: string = '') => {
    const code = localStorage.getItem(Base64.encode(key));

    if (code) {
      const storage = JSON.parse(Base64.decode(code) || JSON.stringify({}));
      const { data, timestamp, expires } = storage || {};

      if (!expires) return data;

      // 缓存过期, 移除并返回空值
      if (Date.now() - timestamp >= expires) {
        this.remove(key);
        return null;
      }

      return data;
    }

    return code;
  };
}

export default Storage;
