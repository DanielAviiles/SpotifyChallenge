import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultadosComponent } from './resultados/resultados.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListalbumsComponent } from './listalbums/listalbums.component';


@NgModule({
  declarations: [
    ResultadosComponent,
    NavbarComponent,
    ListalbumsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResultadosComponent,
    NavbarComponent,
    ListalbumsComponent
  ]
})
export class ComponentsModule { }
