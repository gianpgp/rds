import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultarSalasPage } from './consultar-salas';

@NgModule({
  declarations: [
    ConsultarSalasPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultarSalasPage),
  ]
})
export class ConsultarSalasPageModule {}
