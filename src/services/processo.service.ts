import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { StorageService } from './storage.service';
import { ProcessoDto } from 'src/models/processo.dto';
import { API_CONFIG } from 'src/config/api.config';

@Injectable() //possibilita a injeção do serviço
export class ProcessoService {

    constructor(
        public http: HttpClient,
        public storage: StorageService) {
    }

    findByPerfil(perfil : string) : Observable<ProcessoDto[]>  {
        return this.http.get<ProcessoDto[]>
            (`${API_CONFIG.apiUrl}/processo/${perfil}/processos`);
    }


}