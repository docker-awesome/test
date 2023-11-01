# Utils

`实用工具汇总`

## 0️⃣ Storage 本地存储

`Web localStorage 本地存储，使用 Base64 编码，支持设置有效期`

🎯 **方法**

```js
import { Storage } from 'docker-awesome';

// 设置本地存储
Storage.set(key, value);
Storage.set(key, value, {
  // 过期时间 5 min, 过期后移除该存储
  expires: 300000,
});

// 获取本地存储
Storage.get(key);

// 移除本地存储
Storage.remove(key);

// 清空本地存储
Storage.clear();
```

🎯 **示例**

```tsx
import { Storage } from 'docker-awesome';
import { useCallback, useEffect, useState } from 'react';

export default function () {
  const [state, setState] = useState(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    set();
    get();
    return () => {};
  }, []);

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const set = useCallback(() => {
    Storage.set('Storage', value);
    setValue('');
  }, [value]);

  const get = useCallback(() => {
    const value = Storage.get('Storage');
    setState(value);
  }, []);

  const clear = useCallback(() => {
    Storage.clear();
    setState(null);
  }, []);

  return (
    <div>
      <span>本地存储值：</span>
      <span>&emsp;&hearts;&emsp;</span>
      <span>{state || '默认值'}</span>
      <span>&emsp;&hearts;&emsp;</span>
      <input value={value} onChange={onChange} />
      <span>&emsp;</span>
      <button onClick={set} disabled={!value}>
        设置
      </button>
      <span>&emsp;</span>
      <button onClick={get}>获取</button>
      <span>&emsp;</span>
      <button onClick={clear}>清除</button>
    </div>
  );
}
```

## 1️⃣ Currency 货币格式化

`Currency 基于` [currency.js](https://www.npmjs.com/package/currency.js) `进行扩展，并保留原有方法。扩展属性 $, $ 属性上挂载了快捷格式化方法`

🎯 **方法**

```js
import { Currency } from 'docker-awesome';

// 原有方法：
// 更多请参考 currency.js
Currency(value: currencyjs.Any, options: currencyjs.Options);

// 扩展方法：
// 人民币格式化
// options(可选): 默认 { precision: 2, symbol: '¥' }, symbol 不支持覆盖。
Currency.$.rmb(value: currencyjs.Any, options?: currencyjs.Options);

// 千分位格式化
// options(可选): 默认 { symbol: '' }, symbol 支持覆盖。
Currency.$.format(value: currencyjs.Any, options?: currencyjs.Options);

// 整数格式化
// options(可选): 默认 { precision: 0 }, precision 不支持覆盖。
Currency.$.formatInt(value: currencyjs.Any, options?: currencyjs.Options);

// 单精度格式化
// options(可选): 默认 { precision: 1 }, precision 不支持覆盖。
Currency.$.formatFloat(value: currencyjs.Any, options?: currencyjs.Options);

// 双精度格式化
// options(可选): 默认 { precision: 2 }, precision 不支持覆盖。
Currency.$.formatDouble(value: currencyjs.Any, options?: currencyjs.Options);

// 货币单位格式化
Currency.$.transform(value: currencyjs.Any, options: currencyjs.Options);
```

🎯 **示例**

```tsx
import { Currency } from 'docker-awesome';

export default function () {
  return (
    <>
      <p>1. 原有方法：</p>
      <ul>
        <li>
          <p>格式化：</p>
          <p>
            <code>Currency(123456).format()：</code>
            <span>&emsp;</span>
            <output>{Currency(123456).format()}</output>
          </p>
          <p>
            <code>Currency("123456").format()：</code>
            <span>&emsp;</span>
            <output>{Currency('123456').format()}</output>
          </p>
          <p>
            <code>Currency("$123456").format()：</code>
            <span>&emsp;</span>
            <output>{Currency('$123456').format()}</output>
          </p>
          <p>
            <code>
              Currency("$123456", &#123; symbol: '€' &#125;).format()：
            </code>
            <span>&emsp;</span>
            <output>{Currency('$123456', { symbol: '€' }).format()}</output>
          </p>
        </li>
        <li>
          <p>加法：</p>
          <span>
            <code>Currency(1).add(2).format()：</code>
            <span>&emsp;</span>
            <output>{Currency(1).add(2).format()}</output>
          </span>
        </li>
        <li>
          <p>
            <span>更多请参考</span>
            <span>&nbsp;</span>
            <span>
              <a
                href="https://www.npmjs.com/package/currency.js"
                target="_blank"
              >
                currency.js
              </a>
            </span>
          </p>
        </li>
      </ul>
      <br />
      <p>2. 扩展方法：</p>
      <ul>
        <li>
          <p>人民币格式化：</p>
          <code>Currency.$.rmb(123456)：</code>
          <span>&emsp;</span>
          <output>{Currency.$.rmb(123456)}</output>
        </li>
        <li>
          <p>千分位格式化：</p>
          <code>Currency.$.format(123456)：</code>
          <span>&emsp;</span>
          <output>{Currency.$.format(123456)}</output>
        </li>
        <li>
          <p>整数格式化：</p>
          <code>Currency.$.formatInt(123.456)：</code>
          <span>&emsp;</span>
          <output>{Currency.$.formatInt(123.456)}</output>
        </li>
        <li>
          <p>单精度格式化：</p>
          <code>Currency.$.formatFloat(123.456)：</code>
          <span>&emsp;</span>
          <output>{Currency.$.formatFloat(123.456)}</output>
        </li>
        <li>
          <p>双精度格式化：</p>
          <code>Currency.$.formatDouble(123.456)：</code>
          <span>&emsp;</span>
          <output>{Currency.$.formatDouble(123.456)}</output>
        </li>
        <li>
          <p>货币单位格式化：</p>
          <code>Currency.$.transform(123456)：</code>
          <span>&emsp;</span>
          <output>{Currency.$.transform(123456)}</output>
        </li>
      </ul>
    </>
  );
}
```

## 2️⃣ Qs 查询字符串格式化

`Qs 基于` [qs](https://www.npmjs.com/package/qs) `进行扩展, 查询字符串解析和字符串化。`

`备注: 方法参数类型同` [qs](https://www.npmjs.com/package/qs)

🎯 **方法**

```js
import { Qs } from 'docker-awesome';
// 字符串化
// options: 默认为 { addQueryPrefix: true, encoder: function (str) { return str; } }，可传入同名参数覆盖
Qs.stringify(obj, options);

// 查询字符串解析
// options: 默认为 { ignoreQueryPrefix: true, decoder: function (str) { return str; } }，可传入同名参数覆盖
Qs.parse(str, options);
```

🎯 **示例**

```tsx
import { Qs } from 'docker-awesome';

export default function () {
  return (
    <>
      <p>1. 字符串化：</p>
      <p>
        <code>
          Qs.stringify(&#123; name: "Qs", method: "stringify" &#125;)：
        </code>
        <span>&emsp;</span>
        <output>{Qs.stringify({ name: 'Qs', method: 'stringify' })}</output>
      </p>
      <br />
      <p>2. 查询字符串解析：</p>
      <p>
        <code>Qs.parse("?name=Qs&method=parse")：</code>
        <span>&emsp;</span>
        <output>{JSON.stringify(Qs.parse('?name=Qs&method=parse'))}</output>
      </p>
    </>
  );
}
```

## 3️⃣ Dayjs 日期时间格式化

`Dayjs 基于` [dayjs](https://www.npmjs.com/package/dayjs) `扩展属性 $, $ 属性上挂载了快捷日期时间格式化方法。`

`备注: Dayjs方法参数类型同` [dayjs](https://www.npmjs.com/package/dayjs), `扩展方法 -> 自定义格式化参数 start/end 枚举值:` [dayjs.OpUnitType](https://day.js.org/docs/en/manipulate/start-of#list-of-all-available-units)

🎯 **方法**

```js
import { Dayjs } from 'docker-awesome';
// 原有方法：
// 更多请参考 dayjs
Dayjs(string | number | dayjs.Dayjs | Date | null | undefined);
Dayjs(string | number | dayjs.Dayjs | Date | null | undefined).format(string);
// 国际化 i18n
Dayjs.locale('zh-cn'); // Chinese（内置已导入, 可直接设置中文）
Dayjs.locale('en'); // English(默认)

// 扩展方法(调用方式 Dayjs.$.[method])：
// 自定义格式化
// options.format: 默认 YYYY-MM-DD HH:mm:ss
Dayjs.$.format(
  value: string | number | dayjs.Dayjs | Date | null | undefined,
  options?: {
    format?: string;
    start?: dayjs.OpUnitType;
    end?: dayjs.OpUnitType;
  }
);
// 格式化日期时间
Dayjs.$.formatDateTime(string | number | dayjs.Dayjs | Date | null | undefined);
// 格式化日期
Dayjs.$.formatDate(string | number | dayjs.Dayjs | Date | null | undefined);
// 格式化时间
Dayjs.$.formatTime(string | number | dayjs.Dayjs | Date | null | undefined);
```

🎯 **示例**

```tsx
import { Dayjs } from 'docker-awesome';

export default function () {
  return (
    <>
      <p>1. 原有方法：</p>
      <p>
        <code>Dayjs(Date.now()).format("YYYY-MM-DD HH:mm:ss")：</code>
        <span>&emsp;</span>
        <output>{Dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss')}</output>
      </p>
      <br />
      <p>2. 扩展方法：</p>
      <small>自定义格式化</small>
      <p>
        <code>
          Dayjs.$.format(Dayjs('2020-02-02 02:02'), &#123; format: 'YYYY-MM-DD
          HH:mm:ss' &#125;)：
        </code>
        <span>&emsp;</span>
        <output>
          {Dayjs.$.format(Dayjs('2020-02-02 02:02'), {
            format: 'YYYY-MM-DD HH:mm:ss',
          })}
        </output>
      </p>
      <p>
        <code>
          Dayjs.$.format(Dayjs('2020-02-02 02:02'), &#123; format: 'YYYY-MM-DD
          HH:mm:ss', start: 'days' &#125;)：
        </code>
        <span>&emsp;</span>
        <output>
          {Dayjs.$.format(Dayjs('2020-02-02 02:02'), {
            format: 'YYYY-MM-DD HH:mm:ss',
            start: 'days',
          })}
        </output>
      </p>
      <p>
        <code>
          Dayjs.$.format(Dayjs('2020-02-02 02:02'), &#123; format: 'YYYY-MM-DD
          HH:mm:ss', end: 'days' &#125;)：
        </code>
        <span>&emsp;</span>
        <output>
          {Dayjs.$.format(Dayjs('2020-02-02 02:02'), {
            format: 'YYYY-MM-DD HH:mm:ss',
            end: 'days',
          })}
        </output>
      </p>
      <small>格式化日期时间</small>
      <p>
        <code>Dayjs.$.formatDateTime(Dayjs('2020-02-02'))：</code>
        <span>&emsp;</span>
        <output>{Dayjs.$.formatDateTime(Dayjs('2020-02-02'))}</output>
      </p>
      <p>
        <code>Dayjs.$.formatDateTime(new Date())：</code>
        <span>&emsp;</span>
        <output>{Dayjs.$.formatTime(new Date())}</output>
      </p>
      <p>
        <code>Dayjs.$.formatDateTime(Date.now())：</code>
        <span>&emsp;</span>
        <output>{Dayjs.$.formatDateTime(Date.now())}</output>
      </p>
      <p>
        <code>Dayjs.$.formatDateTime("2000-01-01")：</code>
        <span>&emsp;</span>
        <output>{Dayjs.$.formatDateTime('2000-01-01')}</output>
      </p>
      <small>格式化日期</small>
      <p>
        <code>Dayjs.$.formatDate(Date.now())：</code>
        <span>&emsp;</span>
        <output>{Dayjs.$.formatDate(Date.now())}</output>
      </p>
      <p>
        <code>Dayjs.$.formatDate("2000-01-01 23:59:59")：</code>
        <span>&emsp;</span>
        <output>{Dayjs.$.formatDate('2000-01-01 23:59:59')}</output>
      </p>
      <small>格式化时间</small>
      <p>
        <code>Dayjs.$.formatTime(Date.now())：</code>
        <span>&emsp;</span>
        <output>{Dayjs.$.formatTime(Date.now())}</output>
      </p>
      <p>
        <code>Dayjs.$.formatTime("2000-01-01 12:59:59")：</code>
        <span>&emsp;</span>
        <output>{Dayjs.$.formatTime('2000-01-01 12:59:59')}</output>
      </p>
    </>
  );
}
```

## 4️⃣ HTTP 响应状态码

`HTTP 状态码常量, 参考：` [HTTP 响应状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status) `或` [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

`备注：HTTP_STATUS_CODE 的 key 遵循` [HTTP 响应状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status) `状态码后面的英文(括号内的除外)，字母全大写，中间有空格的用_代替`

`例如：状态码 101 Switching Protocols, key 即是 SWITCHING_PROTOCOLS, 取值方式即 HTTP_STATUS_CODE.SWITCHING_PROTOCOLS`

🎯 **方法**

```js
import { HTTP_STATUS_CODE } from 'docker-awesome';

// 请求成功。
HTTP_STATUS_CODE.OK; // 200
// 客户端错误
HTTP_STATUS_CODE.BAD_REQUEST; // 400
// 服务器找不到请求的资源。
HTTP_STATUS_CODE.NOT_FOUND; // 404
// 服务端错误
HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR; // 500
```

## 5️⃣

## 6️⃣

## 7️⃣

## 8️⃣

## 9️⃣

## 🔟
