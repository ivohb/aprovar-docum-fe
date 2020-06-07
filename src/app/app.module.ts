import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/usuario.service';
import { ImageUtilService } from '../services/image-util.servece';
import { AuthService } from '../services/auth.servece';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthInterceptorProvider } from 'src/interceptors/auth-interceptor';
import { ProcessoService } from 'src/services/processo.service';

// imports para internacionalizar o APP
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AppFunction } from './app.function';
import { LoadingService } from 'src/services/loading.service';

// caminho do arquivos de idiomas
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/','.json');
} 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    //necessários para as requisições http
    HttpClientModule, 
    //internacionalização
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  //declare aqui todas as instância que pretende utilizar 
  //em mais de um módulo. Cuidado especial para as instâncias dos interceptadores, 
  //pois elas são executadas pela ordem que são declaradas. O Interceptador que
  //acrescenta o token nas requisições precisa ser executado antes do 
  //interceptador que trata os erros ocorridos na API.
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthInterceptorProvider, //na ida p/ api, executa essa instância
    ErrorInterceptorProvider, //na volta da api, executa essa.
    AppFunction,
    StorageService,
    UsuarioService,
    ImageUtilService,
    AuthService,
    ProcessoService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

 /* private static help: string = "";

  static getHelp(){
    return this.help;
  }
  
  static setHelp(modulo : string) {
    this.help = modulo;
  }
*/

}
