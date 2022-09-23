export default interface AuthService {
    login(username: string, passweord: string): Promise<any>;
}