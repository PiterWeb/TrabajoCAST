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
  rol: string = '';
  idDelete: string = '';

  constructor(private usuariosService: UsuariosService) {}


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

  getUsuarioPorRol(id: string) {    
    this.usuariosService.getUsuarioPorRol(id, this.idUsuario()).subscribe({
      next: (data) => {
        this.usuarios = data?.length > 0 ? data : [data];
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    });
  }

  addUsuario() {    
    if (this.rol) {
      const newUsuario = { rol: this.rol };

      this.usuariosService.addUsuario(newUsuario).subscribe({
        next: (response) => {
          const newUserId = response._id; 
          
          // Mostrar el ID por pantalla (puedes usar un alert, console.log, o mostrarlo en la UI)
          alert(`Usuario creado con ID: ${newUserId}`);
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

  deleteUsuarioPorId(id: string) {
    if (!this.idUsuario()) {
      alert('Debe ingresar su ID en la primera caja para eliminar su usuario');
      return;
    }

    if (id !== this.idUsuario()) {
      alert('Solo puede eliminar su propio usuario');
      return;
    }
  
    this.usuariosService.deleteUsuario(id).subscribe({
      next: () => {
        alert(`Usuario eliminado correctamente`);
        this.resetForm();
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    });
  }

  resetForm() {
    this.rol = '';
    this.idDelete = '';
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
      alert('Id inválido');
      this.ocultarUsuarios();
    }
  }
}