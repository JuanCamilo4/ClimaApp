import { Component } from '@angular/core';
import { ClimaService } from '../services/clima.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

  constructor(private climaService: ClimaService) { }

  get historial() {
    return this.climaService.historialResultados;
  }

}
