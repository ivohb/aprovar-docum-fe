import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioDto } from 'src/models/usuario.dto';
import { UsuarioService } from 'src/services/usuario.service';
import { AuthService } from 'src/services/auth.servece';
import { TranslateService } from '@ngx-translate/core';
import { AppFunction } from '../app.function';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
 
  fg: FormGroup;
  usuarios : UsuarioDto[]; //declaração de uma coleção de usuários
  
  //criação das instâncias e definição das validações do formulário
 
  constructor(
    private appFunc: AppFunction,
    private usuarioService: UsuarioService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    //public alertCtrl: AlertController,
    private translate: TranslateService,
    private navCtrl: NavController,
    private menuCtrl: MenuController  ) { 
      this.menuCtrl.enable(false);

      //valor inicial e as validações sintáticas
      this.fg = this.formBuilder.group({       
        codigo: ['', [ ]],
        cpf:    ['', [Validators.required, Validators.minLength(10)]],
        email:  ['', [Validators.required, Validators.email]]
      });
        
  }

  //na carga da página, carrega usuário p/ usar no popup

  ngOnInit() {
    this.usuarioService.popup() 
      .subscribe(
        response => { 
          this.usuarios = response; 
          //carrega o campo Código do formulário com o primeiro usuario da lista
          //this.formGroup.controls.codigo.setValue(this.usuarios[0].codigo);
        },
        error => {
          console.log("Erro na carga do popup")
        }); 
  }
  
  voltar() {
    this.navCtrl.back();
  }

  enviar() {
    this.authService.forgot(this.fg.value)
    .subscribe(response => {
      let texto = this.appFunc.getTexto("EMAIL_ENVIADO");
      this.appFunc.mensagem(this.appFunc.getTexto('AVISO'), texto);
    },
    error => {console.log('Error')});
  }

}
