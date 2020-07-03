import { Component, OnInit, Input } from '@angular/core';
import { PagesService } from '../../pages/pages.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    
  rutaActual = '/'

  constructor(private _pagesService: PagesService,
              private router: Router) { 

  }

  ngOnInit(): void {
    console.log('ALGO: ',this.router.relativeLinkResolution)
    this.router.events.subscribe((evento: any) => {
      if ( evento.hasOwnProperty('url') ) {
        this.rutaActual = evento.url
      }
    })
  }

  buscarArtista(event){
    if ( this.rutaActual.length === 1 || this.rutaActual.length === 5 ) {
      if (event.target.value.length) {
        this._pagesService.buscarArtistas(event.target.value);
      } else {
        this._pagesService.obtenerNewReleses();
      }
    } else {
      this.router.navigate(['/'])
    }
  }

  buscarCancion(event){
    if ( this.rutaActual.length === 1 || this.rutaActual.length === 5 ) {
      if (event.target.value.length){
        this._pagesService.buscarCanciones(event.target.value);
      }else{
        this._pagesService.obtenerNewReleses();
      }
    } else {
      this.router.navigate(['/'])
    }
  }

}
