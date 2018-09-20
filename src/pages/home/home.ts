import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import Parse from 'parse';
import { ReservaPage } from '../reserva/reserva';
import { ConsultaPage } from '../consulta/consulta';
import { MinhasReservasPage } from '../minhas-reservas/minhas-reservas';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
  ) {

  }

  goToReserva(){
    this.navCtrl.push(ReservaPage);
  }

  goToConsulta(){
    this.navCtrl.push(ConsultaPage);
  }

  goToMinhasReservas(){
    this.navCtrl.push(MinhasReservasPage);
  }

  



  logOut() {
    Parse.User.logOut().then((resp) => {
      console.log('Logged out successfully', resp);

      this.navCtrl.setRoot('LoginPage');
    }, err => {
      console.log('Error logging out', err);

      this.toastCtrl.create({
        message: 'Error logging out',
        duration: 2000
      }).present();
    })
  }
}
