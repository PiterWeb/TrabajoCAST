import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComprasService } from './services/compras.service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  compras: any[] = [];
  title = 'cliente';
  id = signal('');
  idUsuario = signal('');
  // Variables para el formulario de agregar/editar
  id_cliente: string = '';
  nombre: string = '';
  id_articulo: string = '';
  cantidad: number = 1;
  direccion: string='';
  isEditMode: boolean = false;
  selectedCompraId: string = '';
  idUsuarioMemorizado: string = '';
  constructor(private ComprasService: ComprasService) {}

  toogleEditMode() {
    this.isEditMode = !this.isEditMode
    if (!this.isEditMode) {
      this.resetForm()
      this.selectedCompraId = ""
    }
  }

  getCompras() {
    this.ComprasService.getCompras(this.idUsuarioMemorizado).subscribe(data => {
      this.compras = data;
    });
  }

  ocultarCompras() {
    this.compras = [];
  }

  getComprasPorIdCliente(id: string) {
    this.ComprasService.getComprasPorIdCliente(id,this.idUsuarioMemorizado).subscribe(data => {
      console.log(data)
      this.compras = data?.length > 0 ? data : [data];
    });
  }

  addOrUpdateCompra() {
    if (this.id_cliente && this.nombre && this.id_articulo && this.cantidad >= 0 && this.direccion ) {
      const newCompra = { id_cliente: this.id_cliente, nombre: this.nombre, id_articulo: this.id_articulo, cantidad: this.cantidad, direccion: this.direccion };

      if (this.isEditMode) {
        this.ComprasService.updateCompra(this.selectedCompraId, newCompra,this.idUsuarioMemorizado).subscribe(() => {
          this.getCompras();
        });
      } else {
        this.ComprasService.addCompra(newCompra,this.idUsuarioMemorizado).subscribe(() => {
          this.getCompras();
        });
      }
      this.resetForm();
    }
  }

  editCompra(compra: any) {
    this.id_cliente = compra.id_cliente;
    this.nombre = compra.nombre;
    this.id_articulo = compra.id_articulo;
    this.cantidad = compra.cantidad;
    this.direccion = compra.direccion;
    this.selectedCompraId = compra._id;
    this.isEditMode = true;
  }

  deleteCompraPorId(id: string) {
    this.ComprasService.deleteCompra(id,this.idUsuarioMemorizado).subscribe(() => {
      this.getCompras();
    });
  }

  resetForm() {
    this.id_cliente = '';
    this.nombre = '';
    this.id_articulo = '';
    this.cantidad = 1;
    this.direccion = '';
    this.isEditMode = false;
    this.selectedCompraId = '';
  }

  memorizarUsuario(idUsuario:string){
    
    this.idUsuarioMemorizado = idUsuario;
    this.resetForm()
    this.ocultarCompras()
    
  }


}


