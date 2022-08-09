import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/service/backend.service';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.scss']
})


export class IngresarComponent implements OnInit {
  form:FormGroup;
  constructor(private fb: FormBuilder,
              private backend: BackendService,
              private router: Router) {
    this.form = this.fb.group({
      nombre: [''],
      año: [''],
      sinopsis:  [''],
      editorial:  [''],
      usuario:  ['']
    });
  }

  grabar() {
    this.backend.insertaComic(this.form.controls['nombre'].value, 
    this.form.controls['año'].value,
    this.form.controls['sinopsis'].value,
    this.form.controls['editorial'].value,
    1).subscribe(x => {
      alert(x.message);
      if (x.message == "Comic insertado satisfactoriamente") {
        this.router.navigateByUrl('/menu');
      } 
      }
    );
    
  }

  ngOnInit(): void {
  }

}

