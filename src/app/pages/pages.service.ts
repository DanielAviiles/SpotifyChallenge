import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  
  public respuestas = new BehaviorSubject<any>({ titulo: 'New releases', items: [] });
  private headers = new HttpHeaders().append('Authorization', environment.tokenSpotify)
    
  constructor( private http: HttpClient ) { }

  obtenerNewReleses() {
    this.http.get(`${ environment.api }/browse/new-releases`, { headers: this.headers } )
    .subscribe((respuesta: any) => {
      // console.log('Respuesta: ', respuesta)
      const elementos = respuesta.albums.items.map((item) => {
        return {
          id: item.id,
          artistaId: item.artists[0].id,
          img: item.images.length ? item.images[0].url : 'https://marketing4ecommerce.net/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png',
          title: item.name,
          subtitle: item.release_date
        }
      })
      this.respuestas.next({ titulo: 'New releases', items: elementos })
    })
  }

  buscarArtistas(textoBuscar) {
    this.http.get(`${ environment.api }/search?q=${textoBuscar}&type=artist`, { headers: this.headers } )
    .subscribe((response: any) => {
      // console.log('Respuesta: ', respuesta);
      const elementos = response.artists.items.map((item) => {
        return {
          id: item.id,
          artistaId: item.id,
          img: item.images.length ? item.images[0].url : 'https://marketing4ecommerce.net/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png',
          title: item.name,
          subtitle: item.popularity
        }
      })

      this.respuestas.next({ titulo: 'Artistas encontrados', items: elementos })
    })
  }

  buscarCanciones(textoBuscar) {
    this.http.get(`${ environment.api }/search?q=${textoBuscar}&type=track`, { headers: this.headers })
    .subscribe((response: any) => {
      // console.log('Canciones: ', response);

      const elementos = response.tracks.items.map((item) => {
        return {
          id: item.id,
          artistaId: item.artists[0].id,
          img: item.album.images.length ? item.album.images[0].url : 'https://marketing4ecommerce.net/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png',
          title: item.name,
          subtitle: item.artists[0].name
        }
      })
      this.respuestas.next({ titulo: 'Canciones encontradas', items: elementos })
    })
  }

  infoArtista(idArtist): Observable<any> {
    return this.http.get(`${ environment.api }/artists/${idArtist}`, { headers: this.headers });
  }

  artistRelated(idArtist): Observable<any> {
    return this.http.get(
      `${ environment.api }/artists/${idArtist}/related-artists`, { headers: this.headers }
    );
  }

  albumsArtist(idArtist): Observable<any> {
    return this.http.get(`${ environment.api }/artists/${idArtist}/albums`, { headers: this.headers });
  }

  topTracks(idArtist): Observable<any> {
    return this.http.get(`${ environment.api }/artists/${idArtist}/top-tracks?country=ES`, { headers: this.headers })
  }
  
}
