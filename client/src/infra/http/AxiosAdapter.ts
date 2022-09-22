import axios from 'axios';
import HttpClient from './HttpClientInterface';

export default class AxiosAdapter implements HttpClient {

    constructor() {
        axios.interceptors.request.use((config: any) => {
            config.headers['Authorization'] = 'Bearer 123456';
            return config;
        });
    }

    async get(url: string): Promise<any> {
        const response = await axios({
            url,
            method: 'get'
        });
        return response.data;
    }

    async post(url: string, data: any): Promise<any> {
        const response = await axios({
            url,
            method: 'post',
            data
        });
        return response.data;
    }

    async put(url: string, data: any): Promise<any> {
        const response = await axios({
            url,
            method: 'put',
            data
        });
        return response.data;
    }

    async delete(url: string): Promise<any> {
        const response = await axios({
            url,
            method: 'delete',
        });
        return response.data;
    }

}