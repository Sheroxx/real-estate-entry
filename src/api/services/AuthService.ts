import BaseAxios, { ResultResponse } from "../api";
import { AxiosRequestConfig } from "axios";

const API_URL = process.env.API_URL;


export type LoginRequest = {
    email: string,
    password: string
}

export type RegisterRequest = {
    username: string,
    email: string,
    password: string
}

class AuthService extends BaseAxios {

    constructor(config: AxiosRequestConfig) {
        super(config);
    }

    async Login(payload: LoginRequest): Promise<ResultResponse> {
        return AuthService.handleRequest(async () => {
            return await this.api.post("/account/login", payload)
        });
    }

    async Register(payload: RegisterRequest): Promise<ResultResponse> {
        return AuthService.handleRequest<ResultResponse>(() =>
            this.api.post("/account/register", payload)
        );
    }
}

export default new AuthService({
    baseURL: API_URL,
});