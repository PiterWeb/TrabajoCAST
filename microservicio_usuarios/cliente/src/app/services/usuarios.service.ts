import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3002/api/usuarios'; // Ajusta según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Obtener un usuario por ID o nombre
  getUsuarioPorIdORol(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  // Agregar un nuevo usuario
  addUsuario(disfraz: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, disfraz);
  }

  // Actualizar un usuario por ID
  updateUsuario(id: string, disfraz: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, disfraz);
  }

  // Eliminar un usuario por ID
  deleteUsuario(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  isAdmin(idUsuario: string){
    //esto llamaria a la coleccion usuarios comprobar si el id es admin
    return true;
  }
}


