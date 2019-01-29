import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './auth.service';
import { isNullOrUndefined } from 'util';
import { ConfigurationService } from '../configuration.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private auth: AuthenticationService, private config: ConfigurationService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!request.url.includes(`${this.config.serverAddressBase}/api`)) return next.handle(request);
       
        let token = this.auth.getToken();
        if (token && token.token) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `Bearer ${token.token}`
                }
            });
        }

        return next.handle(request);
    }
}