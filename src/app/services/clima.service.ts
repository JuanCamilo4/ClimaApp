import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Main, SearchClimaResponse } from '../interfaces/clima.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {

  private servicioURL: string = 'http://api.openweathermap.org/data/2.5/weather';

  public historialResultados: SearchClimaResponse[] = [];

  constructor(private http: HttpClient) {

    this.historialResultados = JSON.parse(localStorage.getItem('historialCiudades')!) || [];

  }

  buscarClima(ciudad: string) {
    ciudad = ciudad.trim().toLocaleLowerCase();

    const params = new HttpParams()
      .set('appid', '84957808f8c887c691e1e63ffc9d4997')
      .set('q', ciudad)
      .set('units', 'metric')

    this.http.get<SearchClimaResponse>(`${this.servicioURL}?`, {params})
      .subscribe((res: SearchClimaResponse) => {
        this.historialResultados.unshift(res);
        localStorage.setItem('historialCiudades', JSON.stringify(this.historialResultados));
        console.log(this.historialResultados);
      })

  }

  eliminarHistorial() {
    
    localStorage.removeItem('historialCiudades');

    this.historialResultados = [];

  }
}
