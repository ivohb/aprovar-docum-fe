import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ProcessoDto } from 'src/models/processo.dto';
import { AppModule } from '../app.module';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  processos: ProcessoDto[];
  
  constructor(
    private navCtrl: NavController  ) { 
      //this.menuCtrl.enable(false);
    }

  ngOnInit() {  }

  voltar() {
    this.navCtrl.back();
  }
}
