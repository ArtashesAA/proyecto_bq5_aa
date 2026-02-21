import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Producto } from '../models/producto.models';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  // Obtiene todos los productos
  getProductos(): Observable<Producto[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(map((productos) => productos.map((p) => this.mapProducto(p))));
  }

  // Busca por nombre
  buscarPorNombre(nombre: string): Observable<Producto[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/buscar/${nombre}`)
      .pipe(map((productos) => productos.map((p) => this.mapProducto(p))));
  }

  // Filtra por categoría
  filtrarPorCategoria(categoria: string): Observable<Producto[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/categoria/${categoria}`)
      .pipe(map((productos) => productos.map((p) => this.mapProducto(p))));
  }

  // Método privado para mapear Oracle al modelo
  private mapProducto(p: any): Producto {
    return {
      id: p.ID,
      nombre: p.NOMBRE,
      categoria: p.CATEGORIA,
      descripcion: p.DESCRIPCION,
      precio: p.PRECIO,
      ubicacion: p.UBICACION,
      imagen: p.IMAGEN,
    };
  }
}
