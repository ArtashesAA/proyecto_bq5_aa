import { Component, OnInit, signal } from '@angular/core';
import { ProductosService } from '../../services/producto.service';
import { Producto } from '../../models/producto.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit {
  productos = signal<Producto[]>([]);
  cargando = signal<boolean>(true);

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error cargando los productos', err);
        this.cargando.set(false);
      },
    });
  }
}
