const METHODS = {
  GET: "GET",
  PUT: "PUT",
  POST: "POST",
  DELETE: "DELETE",
};

interface Body {
  [key: string]: object;
}
interface Header {
  [key: string]: string;
}

function queryStringify(data: Body) {
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

interface FetchServiceOptions {
  headers?: Header;
  method: string;
  data?: Body;
  timeout?: number;
}

export default class FetchService {
  get = (url: string, options: FetchServiceOptions) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  put = (url: string, options: FetchServiceOptions) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };
  post = (url: string, options: FetchServiceOptions) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };
  delete = (url: string, options: FetchServiceOptions) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request = (url: string, options: FetchServiceOptions) => {
    return new Promise((resolve, reject) => {
      const { headers = {}, method, data } = options;

      const xhr = new XMLHttpRequest();

      if (method == METHODS.GET && data) {
        xhr.open(method, `${url}${queryStringify(data)}`);
      } else {
        xhr.open(method, url);
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

      xhr.send();
    });
  };
}
