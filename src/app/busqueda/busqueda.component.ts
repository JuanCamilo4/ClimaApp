import { Component, ElementRef, ViewChild } from '@angular/core';
import { ClimaService } from '../services/clima.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!: ElementRef;

  constructor(private climaService: ClimaService) { }

  buscarClima( event: any ) {
    event.preventDefault();

    const ciudad = this.txtBuscar.nativeElement.value;

    this.climaService.buscarClima(ciudad);

    this.txtBuscar.nativeElement.value = '';
  }

  eliminarHistorial(){
    this.climaService.eliminarHistorial();
  }

}
