import { Component, OnInit, OnDestroy } from '@angular/core';
import { PagesService } from '../pages.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit, OnDestroy {

  elementos: any [] = [];
  titulo = '';

  constructor( private _pagesService: PagesService,
               private router: Router) {
    this._pagesService.respuestas.subscribe( (valor) => {
      this.elementos = valor.items;
      this.titulo = valor.titulo;
    });
  }

  ngOnInit(): void {
    this._pagesService.obtenerNewReleses();
  }

  ngOnDestroy(): void {
    // this._pagesService.respuestas.unsubscribe();
  }

  verArtista(idArtista) {
    this.router.navigate(['detalle', idArtista]);
  }
}
