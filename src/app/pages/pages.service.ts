import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  public respuestas = new BehaviorSubject<any>({ titulo: 'New releases', items: [] });

  constructor(private http: HttpClient) {
    this.updateToken();
  }

  obtenerToken() {
    return localStorage.getItem('token');
  }

  updateToken(): void {
    this.http.post(environment.apiToken, null).subscribe((response: any) => {
      localStorage.setItem('token', response.access_token);
    });
  }

  obtenerNewReleses(): void {
    this.http.get(`${ environment.api }/browse/new-releases`)
    .subscribe((respuesta: any) => {
      const elementos = respuesta.albums.items.map((item) => {
        return {
          id: item.id,
          artistaId: item.artists[0].id,
          img: item.images.length ? item.images[0].url : environment.imgURL,
          title: item.name,
          subtitle: item.release_date
        };
      });
      this.respuestas.next({ titulo: 'New releases', items: elementos });
    }, (err: any) => {
        const elementos = [err.error.error.message, err.error.error.status];
        // console.log('Data Error: ', elementos);
        this.respuestas.next({ titulo: 'Error', items: elementos });
    });
  }

  buscarArtistas(textoBuscar) {
    this.http.get(`${ environment.api }/search?q=${textoBuscar}&type=artist`)
    .subscribe((response: any) => {
      const elementos = response.artists.items.map((item) => {
        return {
          id: item.id,
          artistaId: item.id,
          img: item.images.length ? item.images[0].url : environment.imgURL,
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
          img: item.album.images.length ? item.album.images[0].url : environment.imgURL,
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
    return this.http.get(`${environment.api}/artists/${idArtist}/top-tracks?country=ES`);
  }
}
