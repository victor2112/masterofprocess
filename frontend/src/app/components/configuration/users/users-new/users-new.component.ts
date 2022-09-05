import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SaveUsuario } from 'src/app/models/SaveUsuario';
import { BackendService } from 'src/app/service/backend.service';


@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.scss']
})
export class UsersNewComponent implements OnInit {

  form:FormGroup;

  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      nombre: [''],
      departamento: [''],
      usuario: [''],
      password: [''],
      email: ['']
    });
    
   }

  ngOnInit(): void {
  }

  Grabar() {
    if (this.form.controls['nombre'].value.length > 0 && this.form.controls['departamento'].value.length > 0
        && this.form.controls['usuario'].value.length > 0 && this.form.controls['password'].value.length > 0
        && this.form.controls['email'].value.length) {
    
        this.backend.insertUsuario(this.form.controls['nombre'].value, 
        this.form.controls['departamento'].value,
        this.form.controls['usuario'].value,
        this.form.controls['password'].value,
        this.form.controls['email'].value).subscribe(x => {
        
          if (x.status === 1) {
            this.router.navigateByUrl('/configuration/users/users-list');
          }
        }
      )

    } else {
      alert('Error, favor completar todos los campos');
    }
    
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
