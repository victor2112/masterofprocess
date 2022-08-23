import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ComicList } from '../models/ComicList';
import { SaveComic } from '../models/SaveComic';
import { SaveComicResponse } from '../models/SaveComicResponse';
import { SaveUsuario } from '../models/SaveUsuario';
import { SaveUsuarioResponse } from '../models/SaveUsuarioResponse';
import { UsuarioList } from '../models/UsuarioList';
import { GeneralResponse } from '../models/GeneralResponse';


const BE_API = environment.urlBackEnd;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient,
              private fb: FormBuilder) { 
    
  }

  // Modulo Login
  verificaUsuario(usuario: string, password: string) {
    let url: string = BE_API + '/usuario/' + usuario + '/' + password;
    return this.http.get<GeneralResponse>(url, httpOptions);
  }

  getUsuario() {
    let url:string = BE_API + '/usuario';
    return this.http.get<UsuarioList>(url, httpOptions);
  }

  getComic() {
    let url:string = BE_API + '/comic';
    return this.http.get<ComicList>(url, httpOptions);
  }

  

  insertUsuario(nombre: string, user: string, password: string, fecha_nacimiento: Date, sexo: string) {
    let url:string = BE_API + '/usuario';
    let param : SaveUsuario = new SaveUsuario(nombre, user, password, fecha_nacimiento, sexo);
    return this.http.post<SaveUsuarioResponse>(url, param, httpOptions);
  }
  
  insertaComic(nombre: string, año: number, sinopsis: string, editorial: string, usuario: number) {
    let url:string = BE_API + '/comic';
    let param : SaveComic = new SaveComic(nombre, año, sinopsis, editorial, usuario);
    return this.http.post<SaveComicResponse>(url, param, httpOptions);
  }


}
