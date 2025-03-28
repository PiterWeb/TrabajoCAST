import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisfracesService {
  private apiUrl = 'http://localhost:3000/api/disfraces'; // Ajusta según tu backend
  private apiUrlUsuarios = 'http://localhost:3002/api/usuarios';
  constructor(private http: HttpClient) {}

  // Obtener todos los disfraces
  getDisfraces(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un disfraz por ID o nombre
  getDisfrazPorIdONombre(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo disfraz
  addDisfraz(disfraz: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, disfraz);
  }

  // Actualizar un disfraz por ID
  updateDisfraz(id: string, disfraz: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, disfraz);
  }

  // Eliminar un disfraz por ID
  deleteDisfraz(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // 📌 Incrementar la cantidad de un disfraz por ID
  increaseQuantity(id: string, cantidadActual: number): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { cantidad: cantidadActual + 1 });
  }

  // 📌 Decrementar la cantidad de un disfraz por ID (permitiendo llegar a 0)
  decreaseQuantity(id: string, cantidadActual: number): Observable<any> {
    const nuevaCantidad = cantidadActual > 0 ? cantidadActual - 1 : 0;
    return this.http.patch<any>(`${this.apiUrl}/${id}`, { cantidad: nuevaCantidad });
  }
  isAdmin(idUsuario: string):Observable<any>{
    //esto llamaria a la coleccion usuarios comprobar si el id es admin
    return this.http.get<any>(`${this.apiUrlUsuarios}/${idUsuario}`);
  }
}


