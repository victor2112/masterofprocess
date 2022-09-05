
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioItem } from 'src/app/models/UsuarioItem';
import { BackendService } from 'src/app/service/backend.service';

  
  


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuarios: UsuarioItem[];
  
  ngOnInit(): void {
    localStorage.clear();
  }


  form:FormGroup;
  
  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.usuarios = [];
    this.form = this.fb.group({
      usuario: [''],
      password: ['']
    });
    
   }

  irA(ruta: string) {
    if (ruta == 'processes') {
      if (this.form.controls['usuario'].value.length > 0 && this.form.controls['password'].value.length > 0) {
        this.backend.verificaUsuario(this.form.controls['usuario'].value, this.form.controls['password'].value).subscribe(x => {
          
          if (x.data.length > 0) {
            let usuario = JSON.parse(JSON.stringify(x.data))[0];
            console.log(JSON.parse(JSON.stringify(x.data))[0]["idUsuario"]);

            localStorage.setItem('idUsuario', usuario["idUsuario"]);
            localStorage.setItem('nombreUsuario', usuario["nombre"]);
            localStorage.setItem('departamento', usuario["departamento"]);      
            localStorage.setItem('idTipoUsuario', usuario["idTipoUsuario"]); 
            localStorage.setItem('usuario', usuario["usuario"]); 
            localStorage.setItem('email', usuario["email"]);           
            
            this.router.navigateByUrl('/' + ruta);
          
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
