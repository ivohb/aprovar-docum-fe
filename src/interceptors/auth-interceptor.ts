import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { StorageService } from '../services/storage.service';
import { API_CONFIG } from '../config/api.config';
 
// adiciona o token nas requisições

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let localUser = this.storage.getLocalUser();
        //obtem o tamanho da url para o back end (API)
        let N = API_CONFIG.apiUrl.length;
        //cria variável requestToAPI com reultado da comparação  
        //entre a URL que veio e a URL do parâmetro. Se não for igual,
        //então não é uma requisição para a API (Amazon, por exemplo.)
        let requestToAPI = req.url.substring(0, N) == API_CONFIG.apiUrl;
        //se localUser tiver conteúdo e requestToAPI estiver true,
        //clona a requisição atual e acrescenta o tokem nela
        if (localUser && requestToAPI) {            
            const authReq = req.clone({headers: req.headers.set('Authorization', 'Bearer ' + localUser.token)});
            return next.handle(authReq);
        }
        else {
            //propaga a requisição origeinal sem o tokem
            return next.handle(req);
        }
    }
}

export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
};
