import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisfracesService } from './services/disfraces.service';
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
  disfraces: any[] = [];
  title = 'cliente';
  id = signal('');
  // Variables para el formulario de agregar/editar
  idUsuario = signal('');
  tipo: string = '';
  nombre: string = '';
  marca: string = '';
  cantidad: number = 1;
  precio: number = 0;
  isEditMode: boolean = false;
  selectedDisfrazId: string = '';

  constructor(private disfracesService: DisfracesService) {}

  toogleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.isEditMode) {
      this.resetForm();
      this.selectedDisfrazId = "";
    }
  }

  getDisfraces() {
    this.disfracesService.getDisfraces(this.idUsuario())
    .subscribe({
      next: (data) => {
        this.disfraces = data;
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.resetForm();
          alert('No tiene permisos de administrador para realizar esta acción');
          this.ocultarDisfraces();
          
        } else {
          alert('Ocurrió un error al obtener los disfraces');
        }
      }
    });
  }

  ocultarDisfraces() {
    this.disfraces = [];
  }

  getDisfrazPorIdONombre(id: string) {
    this.disfracesService.getDisfrazPorIdONombre(id, this.idUsuario())
    .subscribe({
      next: (data) => {
        if (data?.length === 0) this.disfraces = [];
        else this.disfraces = data?.length > 0 ? data : [data];
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.resetForm();
          alert('No tiene permisos de administrador para realizar esta acción');
          this.ocultarDisfraces();
          //window.location.reload();
        } else {
          alert('Ocurrió un error al buscar el disfraz');
        }
      }
    });
  }

  addOrUpdateDisfraz() {
    if (this.tipo && this.nombre && this.marca && this.cantidad >= 0 && this.precio > 0) {
      const newDisfraz = { 
        tipo: this.tipo, 
        nombre: this.nombre, 
        marca: this.marca, 
        cantidad: this.cantidad, 
        precio: this.precio 
      };

      const observable = this.isEditMode 
        ? this.disfracesService.updateDisfraz(this.selectedDisfrazId, newDisfraz, this.idUsuario())
        : this.disfracesService.addDisfraz(newDisfraz, this.idUsuario());

      observable.subscribe({
        next: () => {
          this.getDisfraces();
          this.resetForm();
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.resetForm();
            alert('No tiene permisos de administrador para realizar esta acción');
            this.ocultarDisfraces();
            //window.location.reload();
          } else {
            alert('Ocurrió un error al guardar el disfraz');
          }
        }
      });
    }
  }

  editDisfraz(disfraz: any) {
    this.tipo = disfraz.tipo;
    this.nombre = disfraz.nombre;
    this.marca = disfraz.marca;
    this.cantidad = disfraz.cantidad;
    this.precio = disfraz.precio;
    this.selectedDisfrazId = disfraz._id;
    this.isEditMode = true;
  }

  deleteDisfrazPorId(id: string) {
    this.disfracesService.deleteDisfraz(id, this.idUsuario())
    .subscribe({
      next: () => {
        this.getDisfraces();
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 401) {
          this.resetForm();
          alert('No tiene permisos de administrador para realizar esta acción');
          this.ocultarDisfraces();
          //window.location.reload();
        } else {
          alert('Ocurrió un error al eliminar el disfraz');
        }
      }
    });
  }

  resetForm() {
    this.tipo = '';
    this.nombre = '';
    this.marca = '';
    this.cantidad = 1;
    this.precio = 0;
    this.isEditMode = false;
    this.selectedDisfrazId = '';
  }
}


