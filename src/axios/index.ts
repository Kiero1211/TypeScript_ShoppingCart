import axios, {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig
} from "axios";
import { error } from "console";

class AxiosHttpClient {
    private axiosInstance: AxiosInstance;

    constructor(baseUrl: string) {
        this.axiosInstance = axios.create({
            baseURL: `${process.env.BASE_URL}`,
        })

        this.initializeRequestInterceptor();
        this.initializeResponseInterceptor();
    }

    private initializeRequestInterceptor() {
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => config,
            (error: AxiosError): Promise<never> => Promise.reject(error)
        )
    }

    private initializeResponseInterceptor() {
        this.axiosInstance.interceptors.response.use(
            (response: AxiosResponse): AxiosResponse => {
                return response && response.data ? response.data : response;
            },
            (error: AxiosError): Promise<unknown> => {
                if (error.response) {
                    switch(error.response.status) {
                        case 400:
                            console.error("Bad request", error.request);
                            break;
                        case 401:
                            window.location.href = "/sign-in";
                            break;
                        case 500:
                            console.error("Internal Server Error: ", error.response.data);
                            break;
                        default:
                            console.error("Error: ", error.response.data);
                            break;
                    }
                    return Promise.reject(error.response.data);
                }
                return Promise.reject(error)
            }
        )
    }

    public get<T>(
        url: string,
        config?: InternalAxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.axiosInstance.get(url, config);
    }

    public post<T>(
        url: string,
        data: T,
        config?: InternalAxiosRequestConfig
    ): Promise<AxiosResponse<T>> {
        return this.axiosInstance.post(url, data, config);
    }
}

const axiosInstance = new AxiosHttpClient("https://fakestoreapi.com/products");
export default axiosInstance;