import { Component, signal } from '@angular/core';
import { Consultapaises } from '../services/consultaproductos';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  // Url
  url = 'https://restcountries.com/v3.1/region/';

  // Continente seleccionado por el usuario, por defecto es europa
  continenteSeleccionado = 'europe';

  // Signal para almacenar la lista
  banderas = signal<any[]>([]);

  // Constructor que llama al servicio
  constructor(private banderaService: Consultapaises) {
    // Carga Europa por defecto al iniciar
    this.getDatos(this.continenteSeleccionado);
  }

  getDatos(continente: string): void {
    // Junta el continente buscado con la url inicial
    const urlCompleta = `${this.url}${continente}`;

    // Obtiene las banderas y las almacena en banderas
    this.banderaService.obtenerBanderas(urlCompleta).subscribe({
      next: (response) => this.banderas.set(response),
      error: (err) => console.error('Error:', err),
    });
  }
}
