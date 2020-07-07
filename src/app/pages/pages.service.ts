import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  public respuestas = new BehaviorSubject<any>({ titulo: 'New releases', items: [] });

  constructor(private http: HttpClient) {
    this.obtenerToken().subscribe((response) => {
      return localStorage.setItem('token', response);
    });
  }

  obtenerToken() {
    const body = new HttpParams()
      .set('grant_type', environment.grant_type)
      .set('client_id', environment.client_id)
      .set('client_secret', environment.client_secret);

    return this.http.post(environment.urltoken,
      body.toString(),
      {headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')}
    )
      .pipe(map((response: any) => {
      /* return {
        token: response.access_token,
        tipoToken: response.token_type,
        tiempo: response.expires_in
      }; */
        return response.access_token;
    })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  obtenerNewReleses() {
    this.http.get(`${ environment.api }/browse/new-releases` )
    .subscribe((respuesta: any) => {
      const elementos = respuesta.albums.items.map((item) => {
        return {
          id: item.id,
          artistaId: item.artists[0].id,
          img: item.images.length ? item.images[0].url : 'https://marketing4ecommerce.net/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png',
          title: item.name,
          subtitle: item.release_date
        }
      });
      this.respuestas.next({ titulo: 'New releases', items: elementos });
    });
  }

  buscarArtistas(textoBuscar) {
    this.http.get(`${ environment.api }/search?q=${textoBuscar}&type=artist` )
    .subscribe((response: any) => {
      const elementos = response.artists.items.map((item) => {
        return {
          id: item.id,
          artistaId: item.id,
          img: item.images.length ? item.images[0].url : 'https://marketing4ecommerce.net/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png',
          title: item.name,
          subtitle: item.popularity
        };
      });

      this.respuestas.next({ titulo: 'Artistas encontrados', items: elementos });
    });
  }

  buscarCanciones(textoBuscar) {
    this.http.get(`${ environment.api }/search?q=${textoBuscar}&type=track`)
    .subscribe((response: any) => {
      const elementos = response.tracks.items.map((item) => {
        return {
          id: item.id,
          artistaId: item.artists[0].id,
          img: item.album.images.length ? item.album.images[0].url : 'https://marketing4ecommerce.net/wp-content/plugins/accelerated-mobile-pages/images/SD-default-image.png',
          title: item.name,
          subtitle: item.artists[0].name
        };
      });
      this.respuestas.next({ titulo: 'Canciones encontradas', items: elementos });
    });
  }

  infoArtista(idArtist): Observable<any> {
    return this.http.get(`${ environment.api }/artists/${idArtist}`);
  }

  artistRelated(idArtist): Observable<any> {
    return this.http.get(`${ environment.api }/artists/${idArtist}/related-artists`);
  }

  albumsArtist(idArtist): Observable<any> {
    return this.http.get(`${ environment.api }/artists/${idArtist}/albums`);
  }

  topTracks(idArtist): Observable<any> {
    return this.http.get(`${environment.api}/artists/${idArtist}/top-tracks?country=ES`
    );
  }
}
