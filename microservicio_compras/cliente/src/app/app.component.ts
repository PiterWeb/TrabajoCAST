import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisfracesService } from './services/disfraces.service';
import { FormsModule } from "@angular/forms";

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
  idUsuario = signal('');
  // Variables para el formulario de agregar/editar
  tipo: string = '';
  nombre: string = '';
  marca: string = '';
  cantidad: number = 1;
  precio: number = 0;
  isEditMode: boolean = false;
  selectedDisfrazId: string = '';

  constructor(private disfracesService: DisfracesService) {}

  toogleEditMode() {
    this.isEditMode = !this.isEditMode
    if (!this.isEditMode) {
      this.resetForm()
      this.selectedDisfrazId = ""
    }
  }

  getDisfraces() {
    this.disfracesService.getDisfraces().subscribe(data => {
      this.disfraces = data;
    });
  }

  ocultarDisfraces() {
    this.disfraces = [];
  }

  getDisfrazPorIdONombre(id: string) {
    this.disfracesService.getDisfrazPorIdONombre(id).subscribe(data => {
      console.log(data)
      this.disfraces = data?.length > 0 ? data : [data];
    });
  }

  addOrUpdateDisfraz() {
    if (this.tipo && this.nombre && this.marca && this.cantidad >= 0 && this.precio > 0) {
      const newDisfraz = { tipo: this.tipo, nombre: this.nombre, marca: this.marca, cantidad: this.cantidad, precio: this.precio };

      if (this.isEditMode) {
        this.disfracesService.updateDisfraz(this.selectedDisfrazId, newDisfraz).subscribe(() => {
          this.getDisfraces();
        });
      } else {
        this.disfracesService.addDisfraz(newDisfraz).subscribe(() => {
          this.getDisfraces();
        });
      }
      this.resetForm();
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
    this.disfracesService.deleteDisfraz(id).subscribe(() => {
      this.getDisfraces();
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

  /** 📌 Aumentar la cantidad de un disfraz **/
  increaseQuantity(id: string) {
    const disfraz = this.disfraces.find(d => d._id === id);
    if (disfraz) {
      disfraz.cantidad++;
      this.disfracesService.updateDisfraz(id, { cantidad: disfraz.cantidad }).subscribe(() => {
        this.getDisfraces();
      });
    }
  }

  /** 📌 Disminuir la cantidad de un disfraz (permitiendo llegar a 0) **/
  decreaseQuantity(id: string) {
    const disfraz = this.disfraces.find(d => d._id === id);
    if (disfraz && disfraz.cantidad > 0) {
      disfraz.cantidad--;
      this.disfracesService.updateDisfraz(id, { cantidad: disfraz.cantidad }).subscribe(() => {
        this.getDisfraces();
      });
    }
  }
  isAdmin(idUsuario:string){
    console.log(this.disfracesService.isAdmin(idUsuario));
    return this.disfracesService.isAdmin(idUsuario);
    
    
  }
}


