import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/services/usuario.service';
import { UsuarioDto } from 'src/models/usuario.dto';
import { StorageService } from 'src/services/storage.service';
import { TranslateService } from '@ngx-translate/core'; 
import { NavController, LoadingController } from '@ionic/angular';
import { API_CONFIG } from 'src/config/api.config';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario: UsuarioDto;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private loadingCtrl: LoadingController,
    private storage: StorageService,
    private navCtrl: NavController,
    private translate: TranslateService,
    private usuarioService: UsuarioService) {
    
   }

  ngOnInit() {
    this.loadData();
  }
  
  loadData() { 
    this.loadingService.loadingPresent();
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.codigo) {
      this.usuarioService.findByCodigo(localUser.codigo)
        .subscribe(response => {
          this.usuario = response;
          this.getImageIfExists();          
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.back();
          }
        });
    }
    else {
      this.navCtrl.back();
    }    
    this.loadingService.loadingDismiss();
  }

  getImageIfExists() {
    this.usuarioService.getImageFromBucket(this.usuario.id)
    .subscribe(response => {      
      this.usuario.imageUrl = `${API_CONFIG.imgUrl}/user${this.usuario.id}.jpg`;
    },
    error => {
      
    });
  }

}
