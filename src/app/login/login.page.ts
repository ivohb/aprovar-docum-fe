import { Component, OnInit } from '@angular/core';
import { MenuController, Events, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LoginDto } from 'src/models/login.dto';
import { AuthService } from 'src/services/auth.servece';
import { ProcessoDto } from 'src/models/processo.dto';
import { ProcessoService } from 'src/services/processo.service';
import { TranslateService } from '@ngx-translate/core'; //internacionalização 
import { StorageService } from 'src/services/storage.service';
import { AppFunction } from '../app.function';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login : LoginDto = {
    codigo: "",
    senha: ""
  };
  
  processos: ProcessoDto[];
  
  constructor(
    private appFunc: AppFunction,
    private storage: StorageService,
    private auth: AuthService,
    private proc: ProcessoService,
    private rota: Router,
    private translate: TranslateService, //internacionalização 
    public events: Events,
    private navCtrl: NavController,
    private menuCtrl: MenuController  ) { 
      this.menuCtrl.enable(false);
    }

  ngOnInit() {
    this.storage.setLocalUser(null);
  }

  help() {
    this.navCtrl.navigateBack('/help');
}


  forgot() {
    this.navCtrl.navigateBack('/forgot');
  }

  entrar() {
   
    let msg = '';

    if (this.login.codigo.length == 0 ) {
      let texto = this.appFunc.getTexto("CAMPO_OBRIGATORIO")+": ";
      texto+=this.appFunc.getTexto("CODIGO");
      msg=msg+texto+"<br>"
    } 

    if (this.login.senha.length == 0 ) {
      let texto = this.appFunc.getTexto("CAMPO_OBRIGATORIO")+": ";
      texto+=this.appFunc.getTexto("SENHA");
      msg=msg+texto+"<br>"
    } 
    
    if (msg.length > 0) {
      this.appFunc.mensagem(this.appFunc.getTexto('ERRO_VALIDACAO'), msg);
      return;
    }

    this.auth.autenticacao(this.login)
      .subscribe(response => {
        this.auth.login(
          response.headers.get('Authorization'), response.headers.get('Profile'));
          console.log("Login OK");
          let role =  response.headers.get('Profile');
          //this.leProcessos(role);
          this.proc.findByPerfil(role)
          .subscribe(
            response => { 
              this.processos = response; 
              console.log(this.processos);
              this.events.publish('login:sucesso', this.processos);
              this.rota.navigate(['/home'])  
            },
            error => { });       
      },
      error => {
        //O tratamento do erro está sendo feita pelo interceptador.
      });     
  }

  leProcessos(perfil: string) {
    this.proc.findByPerfil(perfil)
    .subscribe(
      response => { 
        this.processos = response; 
        console.log(this.processos);
      },
      error => { 
        this.processos = []; 
        console.log('procesos não encontrados')
      }); 

  }

}
