import { Component } from '@angular/core';

import { Platform, Events, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ProcessoDto } from 'src/models/processo.dto';
//internacionalização
import { TranslateService } from '@ngx-translate/core';
import { LoadingService } from 'src/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages: ProcessoDto[] = [];
 
  constructor(
    private loadingService: LoadingService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public events: Events,
    private translate: TranslateService,
    private navCtrl: NavController
  ) {
    this.initializeApp();
    events.subscribe('login:sucesso', (processos) => {      
      this.appPages = processos;
      console.log("Processos"+this.appPages);
    });

  }

  initializeApp() {
    this.loadingService.loadingPresent();
    console.log('initializeApp');

    //obtém o idioma do dispositivo
    let language = this.translate.getBrowserLang();
    console.log(language);
    //coloca em uso o idioma do dispositivo
    this.translate.use(language);
    //se o arquivo de idima correspondente não for encontrado,
    //utilizar o arquivo de idioma pt.json
    this.translate.setDefaultLang("pt")

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.loadingService.loadingDismiss();
  }

  showPage(pagina: string) {
    console.log("Pagina: "+pagina);
    this.navCtrl.navigateBack(pagina); 
  }
  
}
