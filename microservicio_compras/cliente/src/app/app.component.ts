import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasService } from './services/compras.service';
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
  compras: any[] = [];
  disfraces: any[] = [];
  id_Articulo= signal('');
  nombre_Articulo= signal('');
  title = 'cliente';
  id = signal('');
  idUsuario = signal('');
  // Variables para el formulario de agregar/editar
  nombre: string = '';
  id_articulo: string = '';
  cantidad: number = 1;
  direccion: string='';
  isEditMode: boolean = false;
  selectedCompraId: string = '';
  mostrarDisfraces: boolean = false;
  constructor(private ComprasService: ComprasService) {}

  toogleEditMode() {
    this.isEditMode = !this.isEditMode
    if (!this.isEditMode) {
      this.resetForm()
      this.selectedCompraId = ""
    }
  }

  getCompras() {
    this.ComprasService.getCompras(this.idUsuario()).subscribe({
      next: (data) => {
      this.compras = data;
    },
    error: (err: HttpErrorResponse) => {
      this.handleError(err);
    } 
  });
  }

  ocultarCompras() {
    this.compras = [];
  }

  getComprasPorIdCliente(id: string) {
    this.ComprasService.getComprasPorIdCliente(id,this.idUsuario()).subscribe({
      next: (data) => {
      console.log(data)
      this.compras = data?.length > 0 ? data : [data];
      },
      error: (error: HttpErrorResponse) => {
        this.handleError(error);
      }
    });
  }

  addOrUpdateCompra() {
    if (this.idUsuario() && this.nombre && this.id_articulo && this.cantidad >= 0 && this.direccion ) {
      const newCompra = { id_cliente: this.idUsuario(), nombre: this.nombre, id_articulo: this.id_articulo, cantidad: this.cantidad, direccion: this.direccion };

      if (this.isEditMode) {
        this.ComprasService.updateCompra(this.selectedCompraId, newCompra,this.idUsuario()).subscribe({
          next: () => {
          this.getCompras();
          this.resetForm();
          },
          error: (error: HttpErrorResponse) => {
            this.handleError(error);
          }
       });
      } else {
        this.ComprasService.addCompra(newCompra,this.idUsuario()).subscribe({
          next: () => {
          this.getCompras();
          },
          error: (error: HttpErrorResponse) => {
            if (error.status === 400) {
              this.resetForm();
              console.log(error)
              alert(error.error.error);
              this.ocultarCompras();
              return
            } 
            this.handleError(error);
          }
        });
      }
      this.resetForm();
    }
  }

  editCompra(compra: any) {
    this.nombre = compra.nombre;
    this.id_articulo = compra.id_articulo;
    this.cantidad = compra.cantidad;
    this.direccion = compra.direccion;
    this.selectedCompraId = compra._id;
    this.isEditMode = true;
  }

  deleteCompraPorId(id: string) {
    this.ComprasService.deleteCompra(id,this.idUsuario()).subscribe({
       next: () => {
      this.getCompras();
    },error: (error: HttpErrorResponse) => {
      this.handleError(error);
    }
  });
  }

  resetForm() {
    this.nombre = '';
    this.id_articulo = '';
    this.cantidad = 1;
    this.direccion = '';
    this.isEditMode = false;
    this.selectedCompraId = '';
  }

// TEST Para la gestion de ARTICULOS EN COMPRAS

getDisfraces() {
  this.ComprasService.getDisfraces(this.idUsuario()).subscribe({
    next: (data) => {
      this.disfraces = data;
      this.mostrarDisfraces = true; // Mostrar los disfraces al recibir los datos
    },
    error: (err: HttpErrorResponse) => {
      this.handleError(err);
    }
  });
}

getDisfrazPorIdONombre(id: string) {
  this.ComprasService.getDisfrazPorIdONombre(id, this.idUsuario())
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

ocultarDisfraces() {
  this.disfraces = [];
  this.mostrarDisfraces = false; // Ocultar los disfraces
}



// Método centralizado para manejar errores
private handleError(error: HttpErrorResponse) {
  if (error.status === 401) {
    this.resetForm();
    alert('No tiene permisos de administrador para realizar esta acción');
    this.ocultarCompras();
  } else {
    this.resetForm();
    console.error('Error:', error);
    alert('Ocurrió un error inesperado');
    this.ocultarCompras();
  }
}

}


