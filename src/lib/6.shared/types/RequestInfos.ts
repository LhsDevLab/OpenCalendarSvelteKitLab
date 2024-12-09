export interface RequestInfos {
  query?: Record<string, any>;
  body?: Record<string, any> | FormData;
  headers?: Record<string, string>;
  contentType?: string | false;
}
