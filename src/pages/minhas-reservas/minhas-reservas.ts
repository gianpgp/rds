import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Parse from 'parse';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the MinhasReservasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-minhas-reservas',
  templateUrl: 'minhas-reservas.html',
})
export class MinhasReservasPage {
  
 
  conteudo = [];
  ag = Parse.Object.extend("Agendamentos");
  location: MinhasReservasPage;

  showConfirm(obj) {
    const confirm = this.alertCtrl.create({
      title: 'Cancelar Reserva',
      message: 'Você tem certeza que deseja cancelar a reserva dessa sala?',
      buttons: [
        {
          text: 'Não',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            console.log('Agree clicked');
            this.readThenDelete(obj);
          }
        }
      ]
    });
    confirm.present();
  }
  
  readThenDelete(id) {
    console.log(id);
    let query = new Parse.Query(this.ag);
    let pogap = this;
    query.equalTo("createdAt", id);
    query.first({
      success: function (Sala) {
        // console.log(1);
        Sala.destroy({
          success: function () {
              console.log(1);
              pogap.conteudo =[];
              pogap.getSalas();
              
          },
          error: function (error) {
              console.log('Error: ' + error.message);
          }
          
      });
        
      },
      error: function (error) {
        console.log("Error: " + error.code + " " + error.message);
        return null;
      }
      
    });
    
  }

  


  sucesso(results, conteudo) {
    
    for (var i in results) {
      var us = results[i].get("User");
      // console.log(results[i].get("createdAt"));
      conteudo.push(
        {
          Sala: results[i].get("Sala"),
          Inicio: results[i].get("Inicio"),
          Fim: results[i].get("Fim"),
          Desc: results[i].get("Descricao"),
          Ramal: us.get("ramal"),
          User: us.get("Nome"),
          id: results[i].get("createdAt")

        }
      )



    }
  }


  getSalas() {

    var cat = this;
    var query = new Parse.Query(this.ag);
    query.ascending("Sala");
    query.include("User");

    // mostrar as reservas do usuario 
    let logado = Parse.User.current();
    query.equalTo("User", logado);

    query.find({

      success: function (results) {
        return cat.sucesso(results, cat.conteudo);

      }, error: function (error) {
        console.log(error.mesage);
      }


    });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MinhasReservasPage');
    this.getSalas();
  }

}
