# SpotifyChallenge

Este proyecto se realizó con [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Instalar Dependencias
Ejecutar `npm i` para installar las dependencias del proyecto

# Desarrollo del proyecto

Este proyecto se desarrolló con arquitectura REST API consumiendo el API de Spotify. La función de la aplicación se basa en mostrar sencillos recien lanzandos, además poder realizar busquedas de canciones y artistas según lo indique el usuario. 

Para la busqueda de canciones y artistas se implementó una busqueda reactiva, donde el usuario escribe dentro de los *inputs* del *navbar* y la lista de resultados se actualiza instantaneamente, allí se implementó observables, que estan pendientes de cuando cambian los daots con el fin de que estos se renderizarán en la vista instaneamente. 

En la sección de vista detalle encontrará la información completa del artista al que el usuario desee acceder. Esta navegación se realiza mediante *url* y se recoge los parametros que por esta vengan. En este apartado se muestra información como; canciones más populares, artistas relaciones y albumnes del artista.

NOTA IMPORTANTE: 
El API de SPOTIFY requiere un token de autenticación para permitir el uso de la API, este token debe ser proveeido y actualizado cada vez que expire. Para realizar la actualización del token debe ir al archivo `enviroment.ts` que se encuentra ubicado en la direccion `src/enviroments/environment.ts` y actualizar el valor de la prpopiedad llamada `tokenSpotify`
