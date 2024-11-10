export interface RequestInfos {
  query?: Record<string, any>;
  body?: Record<string, any>;
  headers?: Record<string, string>;
  contentType?: string;
}
