import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenWithExpiration } from './models/TokenWithExpiration';
import { isNullOrUndefined } from 'util';
import { Subject } from 'rxjs';
import { ConfigurationService } from '../configuration.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    userLogged: Subject<{}> = new Subject();
    tokenNameInLocalStorage: string = "ticTacToeJWToken"
    refreshInterval: any;

    constructor(private http: HttpClient,  private config: ConfigurationService) { }

    login(email: string, password: string) {
        return this.http.post<TokenWithExpiration>(
            `${this.config.serverAddressBase}/api/auth/`,
            { email: email, password: password })
        .pipe(map((jsonToken: any) => {
            const token = this._jsonTokenToTokenWithExpiration(jsonToken);
            if (token && token.token) {
                localStorage.setItem(this.tokenNameInLocalStorage, JSON.stringify(jsonToken));
                this.userLogged.next();
                this.makeSureTokenNotExpireWhenUserUseApp(token);
            }

            return token;
        }));
    }

    logout() {
        localStorage.removeItem(this.tokenNameInLocalStorage);
        window.location.reload();
    }

    isUserAuthenticated(): boolean{
        const jsonToken = localStorage.getItem(this.tokenNameInLocalStorage);
        if(isNullOrUndefined(jsonToken)) return false;

        const token = this._jsonTokenToTokenWithExpiration(
            JSON.parse(jsonToken)
        )

        if(token && token.token && !this.tokenCloseToExpired(token, 2)) {
            this.makeSureTokenNotExpireWhenUserUseApp(token);
            return true;
        } 
        else
            return false;
    }

    getToken(): TokenWithExpiration{
        return this._jsonTokenToTokenWithExpiration(
            JSON.parse(localStorage.getItem(this.tokenNameInLocalStorage))
        );
    }

    register(email: any, password: any): any {
        return this.http.post(`${this.config.serverAddressBase}/api/auth/register`, {
            "email": email,
            "password": password
        });
    }

    refreshToken(){
        this.http.get(`${this.config.serverAddressBase}/api/auth/refresh`)
        .pipe(map((jsonToken: any) => {
            const token = this._jsonTokenToTokenWithExpiration(jsonToken);
            if (token && token.token) {
                localStorage.setItem(this.tokenNameInLocalStorage, JSON.stringify(jsonToken));
                this.userLogged.next();
            }

            return token;
        })).subscribe();
    }

    tokenCloseToExpired(token: TokenWithExpiration, minutesToExpire: number): boolean {
        const expirationDate = new Date(token.expiration);
        const now = new Date();
        const diffMs = expirationDate.getTime() - now.getTime();
        if(diffMs <= 0) return true;

        const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        if(diffMins - minutesToExpire <= 0) return true;

        return false;
    }

    makeSureTokenNotExpireWhenUserUseApp(token: TokenWithExpiration){
        if(isNullOrUndefined(this.refreshInterval)) {
            this.refreshInterval = setInterval(()=>{
                if(this.tokenCloseToExpired(token, 5)){
                    this.refreshToken();
                }
            }, 60000);
        }
    }

    private _jsonTokenToTokenWithExpiration(tokenJsonObject: any): TokenWithExpiration{
        if(isNullOrUndefined(tokenJsonObject)) return null;
        const token = new TokenWithExpiration();
        token.token = tokenJsonObject.token;
        token.expiration = tokenJsonObject.expiration;
        return token;
    }
}