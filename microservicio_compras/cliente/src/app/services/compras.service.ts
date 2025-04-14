import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  private apiUrl = 'http://localhost:3001/api/compras'; // Ajusta según tu backend
  private apiUrlDisfraces = 'http://localhost:3001/api/compras/articulos';
  constructor(private http: HttpClient) {}

  // Obtener todas las compras
  getCompras(idUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?idUsuario=${idUsuario}`);
  }

  // Obtener un compra por ID o nombre
  getComprasPorIdCliente(id: string, idUsuario:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}?idUsuario=${idUsuario}`);
  }

  // Agregar un nuevo compra
  addCompra(disfraz: any, idUsuario: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?idUsuario=${idUsuario}`, disfraz);
  }

  // Actualizar un compra por ID
  updateCompra(id: string, compra: any, idUsuario: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}?idUsuario=${idUsuario}`, compra);
  }

  // Eliminar un compra por ID
  deleteCompra(id: string, idUsuario: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}?idUsuario=${idUsuario}`);
  }
  // Obtener todos los disfraces
  getDisfraces(idUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlDisfraces}?idUsuario=${idUsuario}`);
  }
  //Obtener disfraces por id o nombre
  getDisfrazPorIdONombre(id: string, idUsuario:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrlDisfraces}/${id}?idUsuario=${idUsuario}`);
  }

}


