import Http from '../http/HttpInterface';

export default class AuthController {

    constructor(readonly http: Http) {
        http.route('post', '/login', async function(params: any, body: any) {
            return {
                token: '123456'
            };
        });
    }

}