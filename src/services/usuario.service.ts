import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { StorageService } from './storage.service';
import { ImageUtilService } from './image-util.servece';
import { Observable } from 'rxjs';
import { UsuarioDto } from '../models/usuario.dto';
import { API_CONFIG } from '../config/api.config';
import { SenhaDto } from '../models/senha.dto';

//classe responsável pela comunicação com o back end

@Injectable() //possibilita a injeção do serviço
export class UsuarioService {

    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public imageUtilService: ImageUtilService) {
    }

    findById(id: string) : Observable<UsuarioDto> {
        return this.http.get<UsuarioDto>(
            `${API_CONFIG.apiUrl}/usuario/${id}`);
    }

    findAll() : Observable<UsuarioDto[]> {
        //chaada do método get da API sem parâmetros
        return this.http.get<UsuarioDto[]>(`${API_CONFIG.apiUrl}/usuario`);
    }
    
    findPage(page : number, lines : number) {
        console.log(page)
        return this.http.get<UsuarioDto[]>(`${API_CONFIG.apiUrl}/usuario/page?pagina=${page}&linhas=${lines}`);
    }
    
    popup() : Observable<UsuarioDto[]> {
        //chaada do método get da API sem parâmetros
        return this.http.get<UsuarioDto[]>(`${API_CONFIG.apiUrl}/usuario/popup`);
    }

    findByCodigo(codigo: string) : Observable<UsuarioDto> {
        return this.http.get<UsuarioDto>(
            `${API_CONFIG.apiUrl}/usuario/codigo?codigo=${codigo}`);
    }

    getImageFromBucket(id : string) : Observable<any> {
        let url = `${API_CONFIG.imgUrl}/user${id}.jpg`
        return this.http.get(url, {responseType : 'blob'});
    }

    insert(obj : UsuarioDto) {
        return this.http.post(
            `${API_CONFIG.apiUrl}/usuario`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    update(obj : UsuarioDto) {
        console.log(obj.id);
        return this.http.put(
            `${API_CONFIG.apiUrl}/usuario/${obj.id}`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    delete(id : string) {
        return this.http.delete(
            `${API_CONFIG.apiUrl}/usuario/${id}`,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    updateSenha(obj : SenhaDto) {
        return this.http.patch(
            `${API_CONFIG.apiUrl}/usuario`, 
            obj,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }

    //param: imaegem no formato base64
    uploadPicture(picture) {
        //converte imagem para blob
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture);
        //ojeto que envia a imagem - vide form-data do postman
        let formData : FormData = new FormData();
        //definição do pârametro do back end, imagem e um nome qualquer,
        //o qual não será utilizado
        formData.set('file', pictureBlob, 'file.png');
        //chamada o end point que recebe a imagem e envia para o S3-amazon
        return this.http.post(
            `${API_CONFIG.imgUrl}/usuario/picture`, 
            formData,
            { 
                observe: 'response', 
                responseType: 'text'
            }
        ); 
    }
}