import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the ConsultarSalasPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consultar-salas',
  templateUrl: 'consultar-salas.html'
})
export class ConsultarSalasPage {

  sala_1Root = 'Sala_1Page'
  sala_2Root = 'Sala_2Page'
  sala_3Root = 'Sala_3Page'
  sala_4Root = 'Sala_4Page'


  constructor(public navCtrl: NavController) {}

}
