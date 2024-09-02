import { queryString } from "../../utils/QueryString";
import ResponseModel from "../Models/ResponseModel";

const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

interface Header {
  [key: string]: string;
}

interface FetchServiceOptions {
  headers?: Header;
  method?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  formData?: FormData;
  timeout?: number;
}

type HTTPMethod = (
  url: string,
  options?: FetchServiceOptions
) => Promise<ResponseModel>;

export default class FetchService {
  get: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  put: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  post: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  delete: HTTPMethod = (url, options) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: FetchServiceOptions) => {
    return new Promise<ResponseModel>((resolve, reject) => {
      const { headers = {}, method, data, formData } = options;

      if (!formData) {
        headers["content-type"] = "application/json";
      }

      headers["Access-Control-Allow-Origin"] = "*";

      const xhr = new XMLHttpRequest();
      xhr.withCredentials = true;

      if (method == "GET" && data) {
        xhr.open(method, `${url}?${queryString(data)}`);
      } else {
        xhr.open(method!, url);
      }

      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.timeout = options.timeout ?? 5000;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (formData != null) {
        xhr.send(formData);
        return;
      }
      xhr.send(JSON.stringify(data));
    });
  };
}
