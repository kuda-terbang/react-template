import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import UrlPattern from 'url-pattern';

export type Endpoint<RequestType, ResponseType, ParamsUrlType = void> = {
  method: AxiosRequestConfig['method'];
  path: string;
  isAuthenticated?: boolean;
  requestData?: RequestType;
  paramsUrl?: ParamsUrlType;
  response?: ResponseType;
  // TODO: response still any need to use ResponseType
  mapData?: (response: any) => void;
};
export interface Endpoints {
  [Key: string]: unknown;
}

export interface StrapiObject<Type> {
  id: number;
  attributes: Type;
}
export interface StrapiObjectDetail<Type> {
  data: Type;
  meta: Record<string, unknown>;
}
type AxiosRequest<RequestType> = Omit<
  AxiosRequestConfig<RequestType>,
  'url' | 'method'
>;
type ApiOptionsClient<RequestType, ParamsUrlType> =
  AxiosRequest<RequestType> & {
    paramsUrl?: ParamsUrlType;
  };
type ApiOptionsCreated<RequestType, ResponseType, ParamsUrlType> =
  AxiosRequest<RequestType> & {
    endpoint: Endpoint<RequestType, ResponseType, ResponseType>;
    paramsUrl?: ParamsUrlType;
  };

interface ApiConfig {
  baseURL: string;
  baseHeaders?: {
    serviceId?: string;
    serviceSecret?: string;
    withBearer?: boolean;
    tokenKeyName?: string;
  };
}

const getUrl = (urlPattern: string, params: Record<string, unknown>) => {
  const pattern = new UrlPattern(urlPattern);
  return pattern.stringify(params);
};

type CreateAxios = (
  apiConfig: ApiConfig
) => <RequestType, ResponseType, ParamsUrlType>(
  apiOptions: ApiOptionsCreated<RequestType, ResponseType, ParamsUrlType>
) => Promise<AxiosResponse<ResponseType>>;

type ApiInstance<RequestType, ResponseType, ParamsUrlType> = (
  apiOptions?: ApiOptionsClient<RequestType, ParamsUrlType>
) => Promise<AxiosResponse<ResponseType>>;

// TODO: Fix endpoints type declared as any when used
interface ExportedEndpoint {
  <
    Type extends {
      [KeyEndpoint in keyof Type]: Endpoint<
        Type[KeyEndpoint]['requestData'],
        Type[KeyEndpoint]['response'],
        Type[KeyEndpoint]['paramsUrl']
      >;
    }
  >(
    apiInstance: ReturnType<CreateAxios>,
    endpoints: Type
  ): {
    [KeyEndpoint in keyof Type]: ApiInstance<
      Type[KeyEndpoint]['requestData'],
      Type[KeyEndpoint]['response'],
      Type[KeyEndpoint]['paramsUrl']
    >;
  };
}

export const createAxios: CreateAxios = ({ baseURL, baseHeaders }) => {
  return (apiOptions) => {
    const { endpoint = { method: 'get', path: '/' }, paramsUrl = {} } =
      apiOptions || {};

    const method = endpoint.method;
    const url = getUrl(endpoint.path, paramsUrl);

    const headers: Record<string, unknown> = {};

    if (baseHeaders) {
      if (baseHeaders.serviceId) {
        headers['serviceId'] = baseHeaders.serviceId;
      }
      if (headers['serviceSecret']) {
        headers['serviceSecret'] = baseHeaders.serviceSecret;
      }
      // TODO : implement logout after authentication feature
      // if (baseHeaders.tokenKeyName) {
      //   const authorization = baseHeaders.withBearer ? 'Bearer ' : ''
      //   const token = getCookie(baseHeaders.tokenKeyName)

      //   // Cancel if no token and authorization
      //   if (endpoint.isAuthenticated && !token) {
      //     return Promise.reject('Not Authenticated')
      //   }

      //   if (token) {
      //     const tokenAuthorization = authorization + token
      //     headers['Authorization'] = tokenAuthorization
      //   }
      // }
    }

    const axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
        ...headers,
      },
    });

    const axiosOptions = {
      ...apiOptions,
      method,
      url,
    };

    axiosInstance.interceptors.response.use(
      // handling success
      (response) => {
        // Override data type if api response is negative
        if (endpoint.response) {
          const initialResponse = endpoint.response;
          Object.keys(initialResponse).forEach((key) => {
            const value = response.data[key];
            if (!Array.isArray(value) && !value) {
              response.data[key] =
                initialResponse[key as keyof typeof initialResponse];
            }
          });
        }
        if (endpoint.mapData) {
          endpoint.mapData(response.data);
        }
        return response;
      },
      // handling error
      (error) => {
        // Handling status code
        if (error.response.status === 401) {
          // TODO : implement logout after authentication feature
          // authLogout({
          //   onLogout: () => {
          //     Router.push('/')
          //   }
          // })
        }
        return Promise.reject(error);
      }
    );

    return axiosInstance.request({ ...axiosOptions });
  };
};

export const createExportedEndpoint: ExportedEndpoint = (
  apiInstance,
  endpoints
) => {
  return {
    ...Object.keys(endpoints).reduce(
      (prev, key) => {
        const newKeys = key as keyof typeof endpoints;
        const endpoint = endpoints[newKeys];
        prev[newKeys] = (apiOptions) =>
          apiInstance({
            ...apiOptions,
            endpoint,
          });
        return prev;
      },
      {} as {
        [Property in keyof typeof endpoints]: ApiInstance<
          typeof endpoints[keyof typeof endpoints]['requestData'],
          typeof endpoints[keyof typeof endpoints]['response'],
          typeof endpoints[keyof typeof endpoints]['paramsUrl']
        >;
      }
    ),
  };
};
