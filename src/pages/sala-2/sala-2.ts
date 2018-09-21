import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import Parse from 'parse';
/**
 * Generated class for the Sala_2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sala-2',
  templateUrl: 'sala-2.html',
})
export class Sala_2Page {
  conteudo = [];
  ag = Parse.Object.extend("Agendamentos");

  sucesso(results, conteudo) {
    for (var i in results) {
      var us = results[i].get("User");
      conteudo.push(
        {
          Sala: results[i].get("Sala"),
          Data:  this.converterData(results[i].get("Inicio")),
          Inicio: this.converterHora(results[i].get("Inicio")),
          Fim: this.converterHora(results[i].get("Fim")),
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
      query.equalTo("Sala", 2);
      
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
    console.log('ionViewDidLoad Sala_2Page');
    this.getSalas();
  }

  converterData(data){
    return data.getDate() +"/"+ data.getMonth()  +"/"+ data.getFullYear();
  }

  converterHora(data){
    let hora = data.getHours();
    let minuto = data.getMinutes();

    if (hora<10 && minuto<10 ){return "0"+data.getHours() +":"+ "0"+data.getMinutes();}
    if (hora<10){return "0"+data.getHours() +":"+ data.getMinutes();}
    if (minuto<10){return data.getHours() +":"+ "0"+data.getMinutes();}
    
    return data.getHours() +":"+ data.getMinutes();
  }
}
