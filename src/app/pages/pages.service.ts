import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class PagesService {
  
  public respuestas = new BehaviorSubject<any>({ titulo: 'New releases', items: [] });
  private headers = new HttpHeaders()
    
  constructor( private http: HttpClient ) { }

  obtenerNewReleses() {
    const headers = this.headers.append('Authorization', environment.tokenSpotify)
    this.http.get(`${ environment.api }/browse/new-releases`, { headers } )
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
    const headers = this.headers.append('Authorization', environment.tokenSpotify)
    this.http.get(`${ environment.api }/search?q=${textoBuscar}&type=artist`, { headers } )
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
    const headers = this.headers.append('Authorization', environment.tokenSpotify)
    this.http.get(`${ environment.api }/search?q=${textoBuscar}&type=track`, { headers })
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
    const headers = this.headers.append('Authorization', environment.tokenSpotify)
    return this.http.get(`${ environment.api }/artists/${idArtist}`, { headers });
  }

  artistRelated(idArtist): Observable<any> {
    const headers = this.headers.append('Authorization', environment.tokenSpotify)
    return this.http.get(
      `${ environment.api }/artists/${idArtist}/related-artists`, { headers }
    );
  }

  albumsArtist(idArtist): Observable<any> {
    const headers = this.headers.append('Authorization', environment.tokenSpotify)
    return this.http.get(`${ environment.api }/artists/${idArtist}/albums`, { headers });
  }

  topTracks(idArtist): Observable<any> {
    const headers = this.headers.append('Authorization', environment.tokenSpotify)
    return this.http.get(`${ environment.api }/artists/${idArtist}/top-tracks?country=ES`, { headers })
  }
  
}
