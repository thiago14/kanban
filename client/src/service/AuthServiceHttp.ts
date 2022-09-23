import AuthService from './AuthServiceInterface';
import HttpClient from '../infra/http/HttpClientInterface';

export default class AuthServiceHttp implements AuthService {

    constructor(readonly httpClient: HttpClient, readonly baseUrl: string) {}

    async login(username: string, passweord: string): Promise<any> {
        const session = await this.httpClient.post(`${this.baseUrl}/login`, { username, passweord });
        return session;
    }

}