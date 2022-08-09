import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SaveUsuario } from 'src/app/models/SaveUsuario';
import { BackendService } from 'src/app/service/backend.service';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {

  

  form:FormGroup;
  
  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      nombre: [''],
      usuario: [''],
      password: [''],
      fecha_nac: [''],
      sexo: ['']
    });
    
   }

  ngOnInit(): void {
  }

  Grabar() {
    this.backend.insertUsuario(this.form.controls['nombre'].value, 
      this.form.controls['usuario'].value,
      this.form.controls['password'].value,
      this.form.controls['fecha_nac'].value,
      this.form.controls['sexo'].value).subscribe(x => {
      alert(x.message);
      if (x.message == "Usuario insertado satisfactoriamente") {
        this.router.navigateByUrl('/login');
      }
      }
    )
    
  }

}
