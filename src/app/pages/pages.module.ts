import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio/inicio.component';
import { DetalleComponent } from './detalle/detalle.component';
import { ComponentsModule } from '../components/components.module';
import { HttpClientModule } from '@angular/common/http';
import { LogueoComponent } from './logueo/logueo.component';

@NgModule({
  declarations: [
    InicioComponent,
    DetalleComponent,
    LogueoComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    HttpClientModule
  ]
})
export class PagesModule { }
