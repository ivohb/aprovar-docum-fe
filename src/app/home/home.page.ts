import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { ProcessoDto } from 'src/models/processo.dto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  processos: ProcessoDto[];
  
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController) {
      this.menuCtrl.enable(true);
    }
  
    help() {
      this.navCtrl.navigateBack('/help');
  }
  
  profile() {
    this.navCtrl.navigateBack('/profile');
  }

}
