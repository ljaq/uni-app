export type requestConfig = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url?: string;
  query?: string;
  inlineQuery?: { [key in string]: any };
  params?: { [key in string]: any };
  data?: { [key in string]: any };
  header?: { [key in string]: any };
  responseType?: 'text' | 'arraybuffer';
  timeout?: number;
};

export type IBaseRequest = {
  url: string;
} & requestConfig;

export type BaseConfig = string | { target: string; baseConfig: requestConfig };

export type UrlObj = { [key: string]: BaseConfig };

export type API_REQ_FUNCTION = (config: requestConfig) => Promise<any>;

export type BaseQuery = {
  sorting?: string;
  skipCount: number;
  maxResultCount: number;
};
