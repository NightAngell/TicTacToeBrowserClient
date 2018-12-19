import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TokenWithExpiration } from './models/TokenWithExpiration';
import { isNullOrUndefined } from 'util';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    userLogged: Subject<{}> = new Subject();
    tokenNameInLocalStorage: string = "ticTacToeJWToken"
    refreshInterval: any;

    constructor(private http: HttpClient) { }

    login(email: string, password: string) {
        return this.http.post<TokenWithExpiration>(
            `http://localhost:62773/api/auth/`,
            { email: email, password: password })
        .pipe(map((jsonToken: any) => {
            const token = this._jsonTokenToTokenWithExpiration(jsonToken);
            if (token && token.token) {
                localStorage.setItem(this.tokenNameInLocalStorage, JSON.stringify(jsonToken));
                this.userLogged.next();
                this._makeSureRefreshIntervalWork();
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

        if(token && token.token) {
            this._makeSureRefreshIntervalWork();
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
        return this.http.post(`http://localhost:62773/api/auth/register`, {
            "email": email,
            "password": password
        });
    }

    refreshToken(){
        this.http.get("http://localhost:62773/api/auth/refresh")
        .pipe(map((jsonToken: any) => {
            const token = this._jsonTokenToTokenWithExpiration(jsonToken);
            if (token && token.token) {
                localStorage.setItem(this.tokenNameInLocalStorage, JSON.stringify(jsonToken));
                this.userLogged.next();
            }

            return token;
        })).subscribe();
    }

    private _makeSureRefreshIntervalWork(){
        if(isNullOrUndefined(this.refreshInterval)) {
            this.refreshInterval = setInterval(()=>{
                this.refreshToken();
            }, 60000*55);
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