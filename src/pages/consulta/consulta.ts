import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Parse from 'parse';

/**
 * Generated class for the ConsultaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-consulta',
  templateUrl: 'consulta.html',
})
export class ConsultaPage {
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
     
      var cat = this;
      var query = new Parse.Query(this.ag);
      var user = query.include("User");
      //query.equalTo("Disponivel",true);
      query.find({

        success: function (results) {
          return cat.sucesso(results, cat.conteudo);

        }, error: function (error) {
          console.log(error.mesage);
        }


      });
    }

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ConsultaPage');
      this.getSalas();
      console.log(this.conteudo)

    }

  }
