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
  getUsuarios(idUsuario: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?idUsuario=${idUsuario}`);
  }

  // Obtener un usuario por ID o nombre
  getUsuarioPorIdORol(id: string, idUsuario:string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}?idUsuario=${idUsuario}`);
  }

  // Agregar un nuevo usuario
  addUsuario(usuario: any, idUsuario: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}?idUsuario=${idUsuario}`, usuario);
  }


  // Actualizar un usuario por ID
 

  // Eliminar un usuario por ID
  deleteUsuario(id: string, idUsuario: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}?idUsuario=${idUsuario}`);
  }

  isAdmin(idUsuario: string){
    //esto llamaria a la coleccion usuarios comprobar si el id es admin
    return true;
  }
}


