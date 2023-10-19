import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from "axios";


export type ResultResponse<T = any> = {
    success: boolean,
    data?: T,
    error: any,
    status: number
}

class Axios {
    protected readonly api: AxiosInstance;
    constructor (params: CreateAxiosDefaults) {
        this.api = axios.create(params);
    }
}

export default abstract class BaseAxios extends Axios {

    constructor(config: AxiosRequestConfig, apiUrl: string | undefined = undefined
    ) {
        super({
            baseURL: apiUrl,
            ...config,
        });

    }

    static async handleRequest<T>(
        requestFn: any
    ): Promise<ResultResponse<T>> {
        try {
            const resp = await requestFn();

            return {
                success: true,
                data: resp.data,
                error: null,
                status: 200
            };
        } catch (error: any) {
            return {
                success: false,
                data: undefined,
                error: error,
                status: error?.response?.status || 101
            };
        }
    }

}