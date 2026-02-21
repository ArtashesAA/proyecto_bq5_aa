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
  // Almacena todos los productos
  productos = signal<Producto[]>([]);
  // Estado cargando o no
  cargando = signal(true);
  // Mensaje de error
  mensajeError = signal<string | null>(null);
  // Producto seleccionado
  productoSeleccionado = signal<Producto | null>(null);
  // Sidebar
  sidebarVisible = signal(true);
  // Categoría activa
  categoriaActiva = signal<string>('Todos');

  constructor(private service: ProductosService) {}

  ngOnInit() {
    this.cargarTodos();
  }

  // Cambia el estado del sidebar
  cambiarMenu() {
    this.sidebarVisible.update((v) => !v);
  }

  // Carga todo el catálogo
  cargarTodos() {
    this.categoriaActiva.set('Todos');

    this.cargando.set(true);
    this.mensajeError.set(null);

    // Obtiene todos los productos
    this.service.getProductos().subscribe({
      next: (data) => {
        this.productos.set(data);
        this.cargando.set(false);
      },
      error: () => this.manejarError('No se pudo cargar ningún producto.'),
    });
  }

  // Busqueda
  buscar(termino: string) {
    if (!termino.trim()) return this.cargarTodos();

    this.cargando.set(true);
    this.mensajeError.set(null);

    // Busca por nombre
    this.service.buscarPorNombre(termino).subscribe({
      next: (data) => {
        this.productos.set(data);
        this.cargando.set(false);
      },
      error: () => this.manejarError('Error al buscar productos.'),
    });
  }

  // Filtra por categoría
  filtrarPorCategoria(categoria: string) {
    this.categoriaActiva.set(categoria);

    this.cargando.set(true);
    this.mensajeError.set(null);

    // Llama al servicio para filtrar por categoría
    this.service.filtrarPorCategoria(categoria).subscribe({
      next: (data) => {
        this.productos.set(data);
        this.cargando.set(false);
      },
      error: () => this.manejarError('Error al filtrar por categoría.'),
    });
  }

  // Errores
  manejarError(msj: string) {
    this.mensajeError.set(msj);
    this.cargando.set(false);
  }
}
