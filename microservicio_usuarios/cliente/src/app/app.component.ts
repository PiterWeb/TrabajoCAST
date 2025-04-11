import { Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from './services/usuarios.service';
import { FormsModule } from "@angular/forms";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuarios: any[] = [];
  title = 'cliente';
  id = signal('');
  roll = signal('');
  idUsuario = signal('');
  // Variables para el formulario de agregar/editar
  tipo: string = '';
  nombre: string = '';
  marca: string = '';
  cantidad: number = 1;
  precio: number = 0;
  rol: string = '';
  isEditMode: boolean = false;
  selectedUsuarioId: string = '';

  constructor(private usuariosService: UsuariosService) {}


  toogleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.resetForm();
      this.selectedUsuarioId = "";
    }
  }

  getUsuarios() {    
    this.usuariosService.getUsuarios(this.idUsuario()).subscribe({
      next: (data) => {
        this.usuarios = data;
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    });
  }

  ocultarUsuarios() {
    this.usuarios = [];
  }

  getUsuarioPorIdORol(id: string) {    
    this.usuariosService.getUsuarioPorIdORol(id, this.idUsuario()).subscribe({
      next: (data) => {
        this.usuarios = data?.length > 0 ? data : [data];
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    });
  }

  addOrUpdateUsuario() {    
    if (this.rol) {
      const newUsuario = { rol: this.rol };

      this.usuariosService.addUsuario(newUsuario, this.idUsuario()).subscribe({
        next: () => {
          this.getUsuarios();
          this.resetForm();
        },
        error: (error: HttpErrorResponse) => {
          this.handleError(error);
        }
      });
    } else {
      alert('Por favor, seleccione un rol para el usuario');
    }
  }

  editDisfraz(usuario: any) {
    this.rol = usuario.rol;
    this.isEditMode = true;
  }

  deleteUsuarioPorId(id: string) {    
    this.usuariosService.deleteUsuario(id, this.idUsuario()).subscribe({
      next: () => {
        this.getUsuarios();
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    });
  }

  resetForm() {
    this.rol = '';
    this.isEditMode = false;
    this.selectedUsuarioId = '';
  }

  isAdmin(idUsuario: string) {
    console.log(this.usuariosService.isAdmin(idUsuario));
    return this.usuariosService.isAdmin(idUsuario);
  }

  // Método centralizado para manejar errores
  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      this.resetForm();
      alert('No tiene permisos de administrador para realizar esta acción');
      this.ocultarUsuarios();
    } else {
      this.resetForm();
      console.error('Error:', error);
      alert('Ocurrió un error inesperado');
      this.ocultarUsuarios();
    }
  }
}