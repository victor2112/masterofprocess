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
import { TransitionList } from '../models/TransitionList'; 
import { UsuarioItem } from '../models/UsuarioItem';
import { FormsList } from '../models/FormsList';
import { SaveField } from '../models/SaveField';
import { ListsList } from '../models/ListsList';
import { ProcessesList } from '../models/ProcessesList';
import { StatesList } from '../models/StatesList';
import { PermissionsList } from '../models/PermissionsList';
import { LogList } from '../models/LogList';


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
    let url:string = BE_API + '/process/' + idUsuario ;
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
  
  getFieldsByForm(idForm: number){
    let url:string = BE_API + '/fields/forms/' + idForm ;
    return this.http.get<FieldsList>(url, httpOptions);
  }

  
  updateForms(idFormulario: number, pos: number, idInstancia: number, valor: string){
    let url: string = BE_API + '/forms/update/' + idFormulario + '/' + pos + '/' + idInstancia + '/' + valor;
    return this.http.put<GeneralResponse>(url, httpOptions);
  }

  getTransitionsByForm(idProcess: number, idOrigin: number){
    let url:string = BE_API + '/states/' + idProcess + '/' + idOrigin ;
    return this.http.get<TransitionList>(url, httpOptions);
  }

  updateInstanceState(idInstance: number, idState: number, idUser: number){
    let url : string = BE_API + '/instances/' + idInstance + '/' + idState + '/' + idUser;
    return this.http.put<GeneralResponse>(url, httpOptions);
  }

  updateInstanceModificationData(idInstance: number, idUser: number){
    let url : string = BE_API + '/instances/' + idInstance + '/' + idUser;
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

  insertInstance(idProceso: number, idEstado: number, idUsuario: number) {
    let url:string = BE_API + '/instances/new/' + idProceso + '/' + idEstado + '/' + idUsuario;
    return this.http.post<GeneralResponse>(url, httpOptions);
  }

  insertFieldsValues(idFormulario: number, pos: number, idInstancia: number, valor: string) {
    let url:string = BE_API + '/fields/value/new';
    let param: SaveFieldValue = new SaveFieldValue(idFormulario, pos, idInstancia, valor);
    return this.http.post<GeneralResponse>(url, param, httpOptions);
  }

  getInitialState(idProcess: number) {
    let url:string = BE_API + '/initialState/' + idProcess ;
    return this.http.get<GeneralResponse>(url, httpOptions);
  }

  // Obtener los values de una lista 
  getListValues(idList: number){
    let url:string = BE_API + '/lists/' + idList ;
    return this.http.get<ListValueResponse>(url, httpOptions);
  }

  getListName(idList: number){
    let url:string = BE_API + '/lists/name/' + idList ;
    return this.http.get<GeneralResponse>(url, httpOptions);
  }

  //modulo de users
  getUsuario() {
    let url:string = BE_API + '/usuario';
    return this.http.get<UsuarioList>(url, httpOptions);
  }

  getUsuarioById(idUsuario: number) {
    let url:string = BE_API + '/usuario/' + idUsuario;
    return this.http.get<UsuarioList>(url, httpOptions);
  }

  deleteUsuario(idUsuario: number) {
    let url:string = BE_API + '/usuario/' + idUsuario;
    return this.http.delete<GeneralResponse>(url, httpOptions);
  }

  updateUser( idUsuario: number, nombre: string, departamento: string, idTipoUsuario: number, usuario: string, password: string, email: string){
    let url :string = BE_API + '/usuario/' + idUsuario;
    let param : UsuarioItem = new UsuarioItem(idUsuario, nombre, departamento, idTipoUsuario, usuario, password, email);
    return this.http.put<GeneralResponse>(url, param, httpOptions); 
  }

  //modulo de forms
  getFormsList(){
    let url:string = BE_API + '/formsList';
    return this.http.get<FormsList>(url, httpOptions);
  }

  getFormByIdForm(idForm: number){
    let url:string = BE_API + '/formsList/' + idForm;
    return this.http.get<FormsList>(url, httpOptions);
  }

  insertForm(name: string){
    let url:string = BE_API + '/forms/' + name;
    return this.http.post<GeneralResponse>(url, httpOptions);
  }

  updateForm(idForm: number, name: string) {
    let url:string = BE_API + '/forms/' + idForm + '/' + name;
    //alert(url);
    return this.http.put<GeneralResponse>(url, httpOptions);
  }

  deleteForm(idForm: number){
    let url:string = BE_API + '/forms/' + idForm;
    return this.http.delete<GeneralResponse>(url, httpOptions);
  }

  //modulo Fields
  insertField(idForm: number, pos: number, idType: number, name: string, idList: number, externalProcess: number, externalIdForm: number, externalPos: number, externalKeyPos: number, externalKeyValue: number) {
    let url:string = BE_API + '/fields/new';
    let param : SaveField = new SaveField(idForm, pos, idType, name, idList, externalProcess, externalIdForm, externalPos, externalKeyPos, externalKeyValue);
    return this.http.post<GeneralResponse>(url, param, httpOptions);
  }

  updateField(idFormEdit: number, posEdit: number, idForm: number, pos: number, idType: number, name: string, idList: number, externalProcess: number, externalIdForm: number, externalPos: number, externalKeyPos: number, externalKeyValue: number) {
    let url:string = BE_API + '/fields/' + idFormEdit + '/' + posEdit;
    let param : SaveField = new SaveField(idForm, pos, idType, name, idList, externalProcess, externalIdForm, externalPos, externalKeyPos, externalKeyValue);
    return this.http.put<GeneralResponse>(url, param, httpOptions);
  }

  deleteField(idForm: number, pos: number) {
    let url:string = BE_API + '/fields/' + idForm + '/' + pos;
    return this.http.delete<GeneralResponse>(url, httpOptions);
  }

  getFieldByIdFormPos(idForm: number, pos: number) {
    let url:string = BE_API + '/fields/' + idForm + '/' + pos;
    return this.http.get<FieldsList>(url, httpOptions);
  }
    
  // modulo Lists
  getLists(){
    let url:string = BE_API + '/lists';
    return this.http.get<ListsList>(url, httpOptions);
  }

  insertList(name: string){
    let url:string = BE_API + '/lists/' + name;
    return this.http.post<GeneralResponse>(url, httpOptions);
  }

  updateList(idList: number, name: string) {
    let url:string = BE_API + '/lists/' + idList + '/' + name;
    return this.http.put<GeneralResponse>(url, httpOptions);
  }

  deleteList(idList: number){
    let url:string = BE_API + '/lists/' + idList;
    return this.http.delete<GeneralResponse>(url, httpOptions);
  }


  getListByIdList(idList: number) {
    let url:string = BE_API + '/lists/' + idList;
    return this.http.get<ListValueResponse>(url, httpOptions);
  }
  


  deleteValue(idValue: number) {
    let url:string = BE_API + '/values/' + idValue;
    return this.http.delete<GeneralResponse>(url, httpOptions);
  }

  insertValue(idList: number, name: string){
    let url:string = BE_API + '/values/' + idList + '/' + name;
    return this.http.post<GeneralResponse>(url, httpOptions);
  }

  updateValue(idValue: number, name: string) {
    let url:string = BE_API + '/values/' + idValue + '/' + name;
    return this.http.put<GeneralResponse>(url, httpOptions);
  }



  getValueByIdValue(idValue: number) {
    let url:string = BE_API + '/values/' + idValue;
    return this.http.get<ListValueResponse>(url, httpOptions);
  }


  // Modulo Config Process
  getProcesses(){
    let url:string = BE_API + '/processes';
    return this.http.get<ProcessesList>(url, httpOptions);
  }

  getProcessesById(idProcess: number){
    let url:string = BE_API + '/processes/' + idProcess ;
    return this.http.get<ProcessesList>(url, httpOptions);
  }

  deleteProcess(idProcess: number) {
    let url:string = BE_API + '/processes/' + idProcess;
    return this.http.delete<GeneralResponse>(url, httpOptions);
  }

  insertProcess(processName: string, idUser: number, idForm: number){
    let url:string = BE_API + '/processes/' + processName + '/' + idUser + '/' + idForm;
    return this.http.post<GeneralResponse>(url, httpOptions);
  }

  updateProcess(idProcess: number, processName: string, idForm: number) {
    let url:string = BE_API + '/processes/' + idProcess + '/' + processName + '/' + idForm;
    return this.http.put<GeneralResponse>(url, httpOptions);
  }

  // Modulo Config States
  getStates(){
    let url:string = BE_API + '/states';
    return this.http.get<StatesList>(url, httpOptions);
  }

  getStateById(idState: number){
    let url:string = BE_API + '/states/' + idState ;
    return this.http.get<StatesList>(url, httpOptions);
  }

  deleteState(idState: number) {
    let url:string = BE_API + '/states/' + idState;
    return this.http.delete<GeneralResponse>(url, httpOptions);
  }

  insertState(stateName: string, idProceso: number, initial: string, final: string){
    let url:string = BE_API + '/states/' + stateName + '/' + idProceso + '/' + initial + '/' + final;
    return this.http.post<GeneralResponse>(url, httpOptions);
  }
  
  updateState(idState: number, stateName: string, idProcess: number, initial: string, final: string) {
    let url:string = BE_API + '/states/' + idState + '/' + stateName + '/' + idProcess + '/' + initial + '/' + final;
    return this.http.put<GeneralResponse>(url, httpOptions);
  }


  // Modulo Config Transitions
  getTransitions(){
    let url:string = BE_API + '/transitions';
    return this.http.get<TransitionList>(url, httpOptions);
  }

  getTransitionById(idTransition: number){
    let url:string = BE_API + '/transitions/' + idTransition ;
    return this.http.get<TransitionList>(url, httpOptions);
  }

  deleteTransition(idTransition: number) {
    let url:string = BE_API + '/transitions/' + idTransition;
    return this.http.delete<GeneralResponse>(url, httpOptions);
  }

  insertTransition(idOrigin: number, idDestiny: number, idProcess: number){
    let url:string = BE_API + '/transitions/' + idOrigin + '/' + idDestiny + '/' + idProcess;
    return this.http.post<GeneralResponse>(url, httpOptions);
  }
  
  updateTransition(idTransition: number, idOrigin: number, idDestiny: number, idProcess: number) {
    let url:string = BE_API + '/transitions/' + idTransition + '/' + idOrigin + '/' + idDestiny + '/' + idProcess;
    return this.http.put<GeneralResponse>(url, httpOptions);
  }
  

  // Modulo Config Permissions
  getPermissions(){
    let url:string = BE_API + '/permissions';
    return this.http.get<PermissionsList>(url, httpOptions);
  }

  getPermissionById(idPermission: number){
    let url:string = BE_API + '/permissions/' + idPermission ;
    return this.http.get<PermissionsList>(url, httpOptions);
  }

  deletePermission(idPermission: number) {
    let url:string = BE_API + '/permissions/' + idPermission;
    return this.http.delete<GeneralResponse>(url, httpOptions);
  }

  insertPermission(idUser: number, idState: number){
    let url:string = BE_API + '/permissions/' + idUser + '/' + idState;
    return this.http.post<GeneralResponse>(url, httpOptions);
  }
  
  updatePermission(idPermission: number, idUser: number, idState: number) {
    let url:string = BE_API + '/permissions/' + idPermission + '/' + idUser + '/' + idState;
    return this.http.put<GeneralResponse>(url, httpOptions);
  }


  /* Categorias */
  getCategorias() {
    return this.http.get(BE_API + `/categorias`);
  }

  getCategoria(idCategoria: string){
   return this.http.get(BE_API + `/categorias/${idCategoria}`);
  }

  guardarCategoria(categoria: any) {
    return this.http.post(BE_API + `/addCategoria`, categoria);
  }

  borrarCategoria(idCategoria: number){
      return this.http.delete(BE_API + `/deleteCategoria/${idCategoria}`);
  }

  actualizarCategoria(categoria: any){
    return this.http.put(BE_API + `/updateCategoria/${categoria['idCategoria']}`, categoria);
  }


  /* Charts */
  getStateChartData(idProcess: number) {
    return this.http.get(BE_API + `/charts/states/` + idProcess);
  }

  /* Charts */
  getCompletionChartData(idProcess: number) {
    return this.http.get(BE_API + `/charts/completion/` + idProcess);
  }


  getComic() {
    let url:string = BE_API + '/comic';
    return this.http.get<ComicList>(url, httpOptions);
  }

  /* Logs */
  getLogs(idInstance: number){
    let url:string = BE_API + '/log/' + idInstance;
    return this.http.get<LogList>(url, httpOptions);
  }

  insertLog(idInstance: number, idUser: number, idLogType: number, oldData: string, newData: string){
    let url:string = BE_API + '/log/' + idInstance + '/' + idUser + '/' + idLogType + '/' + oldData + '/' +  newData;
    //alert(url);
    return this.http.post<GeneralResponse>(url, httpOptions);
  }
  
  

  insertUsuario(nombre: string, departamento: string, usuario: string, password: string, email: string) {
    let url:string = BE_API + '/usuario';
    let param : SaveUsuario = new SaveUsuario(nombre, departamento, usuario, password, email);
    return this.http.post<GeneralResponse>(url, param, httpOptions);
  }
  
  insertaComic(nombre: string, a??o: number, sinopsis: string, editorial: string, usuario: number) {
    let url:string = BE_API + '/comic';
    let param : SaveComic = new SaveComic(nombre, a??o, sinopsis, editorial, usuario);
    return this.http.post<SaveComicResponse>(url, param, httpOptions);
  }


}
