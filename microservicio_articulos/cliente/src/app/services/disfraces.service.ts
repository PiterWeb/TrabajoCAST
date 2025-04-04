import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisfracesService {
  private apiUrl = 'http://localhost:3000/api/disfraces'; // Ajusta según tu backend
  constructor(private http: HttpClient) {}

  // Obtener todos los disfraces
  getDisfraces(idUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?idUsuario=${idUsuario}`);
  }

  // Obtener un disfraz por ID o nombre
  getDisfrazPorIdONombre(id: string, idUsuario:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}?idUsuario=${idUsuario}`);
  }

  // Agregar un nuevo disfraz
  addDisfraz(disfraz: any, idUsuario: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?idUsuario=${idUsuario}`, disfraz);
  }

  // Actualizar un disfraz por ID
  updateDisfraz(id: string, disfraz: any, idUsuario: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}?idUsuario=${idUsuario}`, disfraz);
  }

  // Eliminar un disfraz por ID
  deleteDisfraz(id: string, idUsuario: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}?idUsuario=${idUsuario}`);
  }

  // 📌 Incrementar la cantidad de un disfraz por ID
  increaseQuantity(id: string, cantidadActual: number, idUsuario: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}?idUsuario=${idUsuario}`, { cantidad: cantidadActual + 1 });
  }

  // 📌 Decrementar la cantidad de un disfraz por ID (permitiendo llegar a 0)
  decreaseQuantity(id: string, cantidadActual: number, idUsuario: string): Observable<any> {
    const nuevaCantidad = cantidadActual > 0 ? cantidadActual - 1 : 0;
    return this.http.patch<any>(`${this.apiUrl}/${id}?idUsuario=${idUsuario}`, { cantidad: nuevaCantidad });
  }

}


