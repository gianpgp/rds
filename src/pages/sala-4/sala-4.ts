import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Parse from 'parse';
/**
 * Generated class for the Sala_4Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sala-4',
  templateUrl: 'sala-4.html',
})
export class Sala_4Page {
  conteudo = [];
  ag = Parse.Object.extend("Agendamentos");

  sucesso(results, conteudo) {
    for (var i in results) {
      var us = results[i].get("User");
      conteudo.push(
        {
          Sala: results[i].get("Sala"),
          Inicio: results[i].get("Inicio"),
          Fim: results[i].get("Fim"),
          Desc: results[i].get("Descricao"),
          Ramal:us.get("ramal"),
          User:us.get("Nome")
          

        }
      )



    }}

    
    getSalas(){
      this.conteudo = [];
      var cat = this;
      var query = new Parse.Query(this.ag);
      query.ascending("Sala");
      query.include("User");
      
      // mostrar as reservas do usuario 
      // let logado = Parse.User.current();
      query.equalTo("Sala", 4);
      
      query.find({

        success: function (results) {
          return cat.sucesso(results, cat.conteudo);

        }, error: function (error) {
          console.log(error.mesage);
        }


      });
    }

    
    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
  
      setTimeout(() => {
        console.log('Async operation has ended');
        this.getSalas();
        refresher.complete();
      }, 800);
    }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Sala_4Page');
    this.getSalas();
  }

}
