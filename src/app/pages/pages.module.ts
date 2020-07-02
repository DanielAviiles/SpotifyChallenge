import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ComponentsModule } from '../components/components.module'
import { Routes, RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    InicioComponent,
    DetalleComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class PagesModule { }
