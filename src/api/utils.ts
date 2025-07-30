import { TOKEN } from 'constant';
import { VALUE_KEY } from 'hooks/useStorage';
import qs from 'qs';
import { BaseConfig, requestConfig } from './types';
import { useUserStore } from 'stores/user';

export const service = function (config: requestConfig) {
  const { logout } = useUserStore();
  const { url, data, query, inlineQuery, ...reset } = config;
  let { params } = config;
  let pasedUrl =
    (query !== undefined ? `${url}/${query}` : url) +
    (params ? `?${qs.stringify(params, { arrayFormat: 'repeat' })}` : '');
  if (inlineQuery) {
    for (const key in inlineQuery) {
      const reg = new RegExp(`/\\{${key}\\}/`, 'g');
      pasedUrl = pasedUrl.replace(reg, `/${inlineQuery[key]}/`);
    }
  }

  return new Promise((resolve, reject) => {
    const toeknInfo = uni.getStorageSync(TOKEN);
    const header: any = {
      'Accept-Language': 'c=zh-Hans|uic=zh-Hans',
    };
    if (toeknInfo?.[VALUE_KEY]?.access_token) header.Authorization = `Bearer ${toeknInfo?.[VALUE_KEY]?.access_token}`;

    uni.request({
      ...reset,
      url: url?.startsWith('http') ? pasedUrl : import.meta.env.VITE_BASE_URL + pasedUrl,
      header: {
        ...header,
        ...reset.header,
      },
      data,
      success(res) {
        const { data, statusCode } = res;
        if (/^[4|5]/.test(String(statusCode))) {
          if (statusCode === 401) {
            logout({ redirect: false });
            // uni.reLaunch({ url: '/pages-self/wx-login/index' });
          }
          reject(data);
        } else {
          resolve(data);
        }
      },
      fail(err) {
        const { errMsg } = err;
        reject(errMsg);
      },
    });
  });
};

export function spliceUrl(baseUrl: string, extendArg?: string) {
  return extendArg ? baseUrl + '/' + extendArg : baseUrl;
}

export function getRequestConfig(base: BaseConfig, config?: requestConfig) {
  if (typeof base === 'string') {
    return config;
  } else {
    const { baseConfig } = base || {};
    const { query, method, params, data } = config || {};
    return {
      ...config,
      ...baseConfig,
      query: (baseConfig.query || '') + (query || ''),
      method: method ? method : baseConfig.method,
      params: Object.assign({}, baseConfig.params, params),
      data: Object.assign({}, baseConfig.data, data),
    };
  }
}
