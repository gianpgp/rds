import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Time } from '@angular/common';
import Parse from 'parse';
//import Parse from 'parse';

/**
 * Generated class for the ReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-reserva',
    templateUrl: 'reserva.html',
})
export class ReservaPage {

    data: Date;
    init: Time;
    end: Time;
    desc:string;
    Agendamento = Parse.Object.extend("Agendamentos");

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad ReservaPage');
    }

    createAgendamento(sala, data1, data2, desc) {

        let ag = new this.Agendamento();

        ag.set("Sala", sala);
        ag.set("Inicio", data1);
        ag.set("Fim", data2);
        ag.set("Descricao", desc);
        ag.set("User", Parse.User.current());
        ag.save(null, {
            success: function (ag) {
                alert("Agendado!")

            },
            error: function (response, error) {
                console.log('Error: ' + error.message);
            }
        });
    }

    teste() {
        console.log(1);
    }

    sucesso (results, horaInicio, horaFim, desc) {

        var query = new Parse.Query(this.Agendamento);
        var salasOcupadas = [];

        try {


            //pesquisa salas ocupadas 
            for (let result of results) {

                var sala = result.get("Sala");
                var inicio = result.get("Inicio").getTime();
                var fim = result.get("Fim").getTime();

                //verifica horario ocupado
                if ((inicio <= horaInicio && horaInicio <= fim) || (inicio <= horaFim && horaFim <= fim) || (inicio >= horaInicio && horaFim >= fim)) {

                    if (salasOcupadas.indexOf(sala) == -1) {
                        salasOcupadas += sala;
                        console.log("Sala ocupada " + sala);
                    }



                }
            }



        } catch (e) {
            console.log(e)
        }

        //mostra salas desocupadas
        if (salasOcupadas.length == 4) {
            alert("Nenhuma sala disponível.")
        } else {
            for (let i = 1; i < 5; i++) {
                if ((salasOcupadas.indexOf(i) == -1)) {
                    let r = confirm("Sala " + i + " disponivel, reservar sala?");

                    if (r == true) {

                        let data_1 = new Date(horaInicio);
                        let data_2 = new Date(horaFim);
                        
                        this.createAgendamento(i, data_1, data_2,desc);
                        
                        alert("Sala " + i + " agendada.");
                        break;
                    }


                }
            }
        }

    }

    getSalas(horaInicio, horaFim) {
        var query = new Parse.Query(this.Agendamento);
        var outside = this;
       
        query.find({
            success: function(result) {
                return outside.sucesso(result, horaInicio, horaFim, outside.desc);
            }
            , error: function (error) {
                console.log(error.mesage);
            }
        });


    }

    buscar_agendamento() {
        
        if (this.data == null || this.init == null || this.end == null || this.desc ==null) {
            alert("Falha: Prencha todos os dados de busca e tente de novo.");
            return;
        } else {
            var data1 = new Date(this.data + " " + this.init).getTime();
            var data2 = new Date(this.data + " " + this.end).getTime();
            if (data1 > data2) {
                alert("Falha: Data de inicio maior que a de fim, tente novamente.");
                return;

            } else {
            
                this.getSalas(data1, data2);
            }


        }


    }
}
