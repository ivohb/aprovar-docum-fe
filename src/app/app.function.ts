import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

/**
 * Funções diversas para uso em todo aplicativo
 */
export class AppFunction {

    constructor(
        private alertCtrl: AlertController,
        private translate: TranslateService
      ) {

    }

    /** 
     * apenas repassa os parâmetros para a função alerta, pois a
     * mesma não pode ser chamada por ser do tipo async
    */
    mensagem(titulo: string, msg: string) {
        this.alerta(titulo, msg);
    }

    /**
     * @param titulo: título da janela de alerta
     * @param msg: texto do corpo da janela de alerta 
     */
    async alerta(titulo: string, msg: string) {
        const alert = await this.alertCtrl.create({
          header: titulo,
          subHeader: '',
          message: msg,
          buttons: ['OK']
        });    
        await alert.present();
    }

    /**
     * @param chave: chave do arquivo de idioma
     * @returns: texto traduzido para o idioma do aplicativo
     */
    getTexto(chave: string): string {
        let texto = "";
        this.translate.get(chave).subscribe(
        value => {
            texto = value;
        }
        )  
        return texto;
    }

}
