export interface ProductoListItem {
  nombre: string;
  categoria: string;
  descripcion: string;
  precio: string;
  stock: string;
}

export interface ProductoListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductoListItem[];
}
