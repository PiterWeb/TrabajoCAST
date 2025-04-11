import { Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuariosService } from './services/usuarios.service';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  usuarios: any[] = [];
  title = 'cliente';
  id = signal('');
  roll =signal('');
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

  constructor(private usuariosService: UsuariosService) {
    effect(()=>{
      console.log('hola')
      this.idUsuario()
      this.ocultarUsuarios()
    })
  }
  ngOnInit(): void {
    
  }

  toogleEditMode() {
    this.isEditMode = !this.isEditMode
    if (!this.isEditMode) {
      this.resetForm()
      this.selectedUsuarioId = ""
    }
  }

  getUsuarios() {
    this.usuariosService.getUsuarios(this.idUsuario()).subscribe(data => {
      this.usuarios = data;
    });
  }

  ocultarUsuarios() {
    this.usuarios = [];
  }

  getUsuarioPorIdORol(id: string) {
    this.usuariosService.getUsuarioPorIdORol(id,this.idUsuario()).subscribe(data => {
      console.log(data)
      this.usuarios = data?.length > 0 ? data : [data];
    });
  }

  addOrUpdateUsuario() {
    if (this.rol) {
      const newUsuario = { rol: this.rol };

     
        this.usuariosService.addUsuario(newUsuario,this.idUsuario()).subscribe(() => {
          this.getUsuarios();
        });
      
      this.resetForm();
    }
  }
 // NO SE USA EN ESTE MICROSERVICIO
  editDisfraz(usuario: any) {
    this.rol = usuario.rol;
    this.isEditMode = true;
  }

  deleteUsuarioPorId(id: string) {
    this.usuariosService.deleteUsuario(id,this.idUsuario()).subscribe(() => {
      this.getUsuarios();
    });
  }

  resetForm() {
    this.rol = '';
    
    this.isEditMode = false;
    this.selectedUsuarioId = '';
  }

  
  isAdmin(idUsuario:string){
    console.log(this.usuariosService.isAdmin(idUsuario));
    return this.usuariosService.isAdmin(idUsuario);
    
    
  }
}


