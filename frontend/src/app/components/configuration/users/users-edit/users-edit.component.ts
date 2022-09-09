import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioItem } from 'src/app/models/UsuarioItem';
import { BackendService } from 'src/app/service/backend.service';
@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {

  user: UsuarioItem[];
  
  form:FormGroup;

  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
                
                this.form = this.fb.group({
                  nombre: [''],
                  tipo:[''],
                  departamento: [''],
                  usuario: [''],
                  password: [''],
                  email: ['']
                });

                this.user = [];

                this.backend.getUsuarioById(Number(localStorage.getItem('idUserEdit'))).subscribe(x => {
                  this.user = x.data;
                  //alert(Number(JSON.parse(JSON.stringify(this.user))[0].idTipoUsuario));
            
                  this.form = this.fb.group({
                    nombre: [String(JSON.parse(JSON.stringify(this.user))[0].nombre)],
                    tipo:[Number(JSON.parse(JSON.stringify(this.user))[0].idTipoUsuario)],
                    departamento: [String(JSON.parse(JSON.stringify(this.user))[0].departamento)],
                    usuario: [String(JSON.parse(JSON.stringify(this.user))[0].usuario)],
                    password: [String(JSON.parse(JSON.stringify(this.user))[0].password)],
                    email: [String(JSON.parse(JSON.stringify(this.user))[0].email)]
                  });

                  
                });

                
                

               }

  ngOnInit(): void {

    /*idUsuario: number;
    nombre: string;
    departamento: string;
    idTipoUsuario: number;
    usuario: string;
    password: string;
    email: string;*/

 

    

  }


  Grabar() {
          /*this.form.controls['nombre'].value, 
          this.form.controls['departamento'].value,
          this.form.controls['usuario'].value,
          this.form.controls['password'].value,
          this.form.controls['email'].value*/
          //alert(JSON.stringify(JSON.parse(JSON.stringify(this.user)[0]).idTipoUsuario));
          
          //alert(JSON.stringify(JSON.parse(JSON.stringify(this.user)[0]).idTipoUsuario));
          this.backend.updateUser(
            Number(localStorage.getItem('idUserEdit')),
            this.form.controls['nombre'].value,
            this.form.controls['departamento'].value,
            this.form.controls['tipo'].value,
            this.form.controls['usuario'].value,
            this.form.controls['password'].value,
            this.form.controls['email'].value
            ).subscribe(x => {
          
   
        
          if (x.status === 1) {
            this.router.navigateByUrl('/configuration/users/users-list');
          }

        }
      )

    
    
  }



  irA(ruta: string) {
    if (ruta == 'dashboard') {
      if (this.form.controls['usuario'].value.length > 0 && this.form.controls['password'].value.length > 0) {
        this.backend.verificaUsuario(this.form.controls['usuario'].value, this.form.controls['password'].value).subscribe(x => {
         
          if (x.data.length > 0) {
            this.router.navigateByUrl('/' + "menu");
          } else {
            alert('Usuario o contraseña incorrecta, favor intentar nuevamente');
          }
  
        })
      } else {
        alert('Usuario o contraseña no completado, favor intentar nuevamente');
      }
  
    } else {
      this.router.navigateByUrl('/' + ruta);
    }
  
  }
}
