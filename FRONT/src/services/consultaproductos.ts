import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductoListResponse } from '../app/models/producto.models';

@Injectable({
  providedIn: 'root',
})
export class Consultapaises {
  constructor(private http: HttpClient) {}

  // Obtiene todas las banderas
  obtenerBanderas(url: string): Observable<any> {
    return this.http.get<ProductoListResponse>(url);
  }
}
