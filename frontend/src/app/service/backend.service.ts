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
import { ProcessList } from '../models/ProcessList';
import { InstancesList } from '../models/InstancesList';
import { Forms } from '../models/Forms';
import { FieldsItem } from '../models/FieldsItem';
import { FieldsList } from '../models/FieldsList';
import { SaveFieldValue } from '../models/SaveFieldValue';
import { ListValue } from '../models/ListValue';
import { ListValueResponse } from '../models/ListValueResponse';

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


  // Modulo Process
  getProcess(idUsuario: number){
    let url:string = BE_API + '/processes/' + idUsuario ;
    return this.http.get<ProcessList>(url, httpOptions);
  }

  // Modulo Instance
  getInstances(idUsuario: number, idProceso: number){
    let url:string = BE_API + '/instances/' + idUsuario + '/' + idProceso ;
    return this.http.get<InstancesList>(url, httpOptions);
  }
  


  // Modulo Forms
  getForms(idInstancia: number){
    let url:string = BE_API + '/forms/' + idInstancia ;
    return this.http.get<Forms>(url, httpOptions);
  }


  updateForms(idFormulario: number, pos: number, idInstancia: number, valor: string){
    let url: string = BE_API + '/forms/update/' + idFormulario + '/' + pos + '/' + idInstancia + '/' + valor;
    return this.http.put<GeneralResponse>(url, httpOptions);
  }

  // Modulo para crear una instancia nueva
  getFields(idProceso: number){
    let url:string = BE_API + '/fields/' + idProceso ;
    return this.http.get<FieldsList>(url, httpOptions);
  }

  getInstancesNumber() {
    let url:string = BE_API + '/instances/number';
    return this.http.get<GeneralResponse>(url, httpOptions);
  }

  insertInstance(idProceso: number, idEstado: number) {
    let url:string = BE_API + '/instances/new/' + idProceso + '/' + idEstado;
    return this.http.post<GeneralResponse>(url, httpOptions);
  }

  insertFieldsValues(idFormulario: number, pos: number, idInstancia: number, valor: string) {
    let url:string = BE_API + '/fields/value/new';
    let param: SaveFieldValue = new SaveFieldValue(idFormulario, pos, idInstancia, valor);
    //alert(url);
    return this.http.post<GeneralResponse>(url, param, httpOptions);
  }

  // Obtener una lista 
  getListValues(idList: number){
    let url:string = BE_API + '/lists/' + idList ;
    return this.http.get<ListValueResponse>(url, httpOptions);
  }

  //modulo de users
  getUsuario() {
    let url:string = BE_API + '/usuario';
    return this.http.get<UsuarioList>(url, httpOptions);
  }

  deleteUsuario(idUsuario: number) {
    let url:string = BE_API + '/usuario/' + idUsuario;
    return this.http.delete<GeneralResponse>(url, httpOptions);
  }












  getComic() {
    let url:string = BE_API + '/comic';
    return this.http.get<ComicList>(url, httpOptions);
  }

  

  insertUsuario(nombre: string, departamento: string, usuario: string, password: string, email: string) {
    let url:string = BE_API + '/usuario';
    let param : SaveUsuario = new SaveUsuario(nombre, departamento, usuario, password, email);
    return this.http.post<GeneralResponse>(url, param, httpOptions);
  }
  
  insertaComic(nombre: string, año: number, sinopsis: string, editorial: string, usuario: number) {
    let url:string = BE_API + '/comic';
    let param : SaveComic = new SaveComic(nombre, año, sinopsis, editorial, usuario);
    return this.http.post<SaveComicResponse>(url, param, httpOptions);
  }


}
