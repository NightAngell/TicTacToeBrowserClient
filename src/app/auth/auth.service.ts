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

        if(token && token.token) 
            return true;
        else
            return false;
    }

    getTokenFromLocalStorage(): TokenWithExpiration{
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

    private _jsonTokenToTokenWithExpiration(tokenJsonObject: any): TokenWithExpiration{
        if(isNullOrUndefined(tokenJsonObject)) return null;
        const token = new TokenWithExpiration();
        token.token = tokenJsonObject.token;
        token.expiration = tokenJsonObject.expiration;
        return token;
    }
}