import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  idArtista: string = '';
  artista: any = {};
  albums: any [] = [];
  artistasSimilares: any [] = [];
  popularTracks: any [] = [];

  constructor(private activateRouted: ActivatedRoute, private _pagesService: PagesService) {
    this.activateRouted.params.subscribe((param) => {
      this.idArtista = param.id;
    });
  }

  ngOnInit(): void {
    this._pagesService.infoArtista(this.idArtista).subscribe((response) => {
      this.artista = {
        name: response.name,
        img: response.images.length ? response.images[0].url : 'https://marketing4ecommerce.net/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png',
        popularidad: response.popularity,
        generos: response.genres
      };
    });

    this._pagesService.artistRelated(this.idArtista).subscribe((response) => {
      this.artistasSimilares = response.artists.map((info) => {
        return info.images.length ? info.images[0].url : 'https://marketing4ecommerce.net/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png'
      });
    });

    this._pagesService.albumsArtist(this.idArtista).subscribe((response) => {
      const albums = response.items.map((infoItem) => {
        return {
          nombre: infoItem.name,
          fecha: infoItem.release_date,
          img: infoItem.images.length ? infoItem.images[0].url : 'https://marketing4ecommerce.net/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png'
        };
      });

      albums.forEach((element) => {
        const exist = this.albums.some((item) => item.nombre === element.nombre);
        if (exist === false) { //&& this.albums.length<4
          this.albums.push(element);
        }
      });
    });

    this._pagesService.topTracks(this.idArtista).subscribe((res) => {
      this.popularTracks = res.tracks.map((topTracks) => {
        return {
          duracion: topTracks.duration_ms,
          nameSong: topTracks.name,
          albumName: topTracks.album.name,
          img: topTracks.album.images.length ? topTracks.album.images[0].url : 'https://marketing4ecommerce.net/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png'
        };
      });
    });
  }
}
