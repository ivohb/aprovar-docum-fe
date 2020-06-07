import { Injectable } from "@angular/core";
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from "../services/storage.service";
import { FieldMessage } from "../models/field_message";
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { AppFunction } from 'src/app/app.function';

//Tratamento das exceções

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private appFunc: AppFunction,
        public storage: StorageService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req).pipe(
        catchError((error, caught) => {

            let errorObj = error;
            //se o objeto contiver o campo error
            if (errorObj.error) { 
                errorObj = errorObj.error;
            }
            //se o objeto não contiver o campo status, não é um json
            if (!errorObj.status) { 
                errorObj = JSON.parse(errorObj);
            }
            console.log(errorObj);

            switch(errorObj.status) {

                case 401:
                   this.handle401();
                    break;

                case 403:
                    this.handle403();
                    break;

                case 422:
                    this.handle422(errorObj);
                    break;
        
                default:
                   this.handleDefaultEror(errorObj);
            }

            //propaga o erro para metodo que solicitou a requisição
            return throwError(errorObj);
        })) as any;
    }

    //tratamento do erro 401 (dados inválidos)
    handle401() {
        let titulo = 'Error 401';
        let msg = this.appFunc.getTexto("ERRO401");
        this.appFunc.mensagem(titulo, msg);
    }

    //tratamento do erro 403 (requisição não autorizada)    
    handle403() {
        console.log("403");
        this.storage.setLocalUser(null); //apenas limpa o localStorage
    }

    //tratamento do erro 422 (erro de validação)
    handle422(errorObj) {
        let titulo = 'Error 422';
        let msg = this.listaErros(errorObj.errors);
        this.appFunc.mensagem(titulo, msg);
    }

    /**
     * @param messages: erros de validação devolvido pela API
     * @returns erros traduzidos para o idioma do dis´positivo
     */
    private listaErros(messages : FieldMessage[]) : string {
        let erros : string = '';
        for (var i=0; i < messages.length; i++) {
            erros = erros 
            + '<p><strong>' + messages[i].fieldName + "</strong>: " 
            + messages[i].message + '</p>';
        }
        return erros;
    }

    //tratamento de outros erros
    handleDefaultEror(errorObj) {
        let titulo = 'Erro ' + errorObj.status + ': ' + errorObj.error;
        let msg = errorObj.message;
        this.appFunc.mensagem(titulo, msg);
    }

}


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};
