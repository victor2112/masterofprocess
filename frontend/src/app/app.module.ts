import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import "@angular/compiler";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { IngresarComponent } from './components/ingresar/ingresar.component';
import { ConsultarComponent } from './components/consultar/consultar.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ProcessComponent } from './components/process/process.component';
import { InstancesComponent } from './components/instances/instances.component';
import { FormsComponent } from './components/forms/forms.component';
import { NewInstanceComponent } from './components/new-instance/new-instance.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { UsersListComponent } from './components/configuration/users/users-list/users-list.component';
import { UsersNewComponent } from './components/configuration/users/users-new/users-new.component';
import { UsersEditComponent } from './components/configuration/users/users-edit/users-edit.component';
import { FormsListComponent } from './components/configuration/forms/forms-list/forms-list.component';
import { FormsNewComponent } from './components/configuration/forms/forms-new/forms-new.component';
import { FormsEditComponent } from './components/configuration/forms/forms-edit/forms-edit.component';
import { FieldsEditComponent } from './components/configuration/forms/fields/fields-edit/fields-edit.component';
import { FieldsNewComponent } from './components/configuration/forms/fields/fields-new/fields-new.component';
import { ListsListComponent } from './components/configuration/lists/lists-list/lists-list.component';
import { ListsEditComponent } from './components/configuration/lists/lists-edit/lists-edit.component';
import { ListsNewComponent } from './components/configuration/lists/lists-new/lists-new.component';
import { ValuesEditComponent } from './components/configuration/lists/values/values-edit/values-edit.component';
import { ValuesNewComponent } from './components/configuration/lists/values/values-new/values-new.component';
import { ProcessesListComponent } from './components/configuration/processes/processes-list/processes-list.component';
import { ProcessesEditComponent } from './components/configuration/processes/processes-edit/processes-edit.component';
import { ProcessesNewComponent } from './components/configuration/processes/processes-new/processes-new.component';
import { StatesNewComponent } from './components/configuration/states/states-new/states-new.component';
import { StatesEditComponent } from './components/configuration/states/states-edit/states-edit.component';
import { StatesListComponent } from './components/configuration/states/states-list/states-list.component';
import { TransitionsEditComponent } from './components/configuration/transitions/transitions-edit/transitions-edit.component';
import { TransitionsListComponent } from './components/configuration/transitions/transitions-list/transitions-list.component';
import { TransitionsNewComponent } from './components/configuration/transitions/transitions-new/transitions-new.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    IngresarComponent,
    ConsultarComponent,
    LoginComponent,
    RegistrarComponent,
    ProcessComponent,
    InstancesComponent,
    FormsComponent,
    NewInstanceComponent,
    ConfigurationComponent,
    UsersListComponent,
    UsersNewComponent,
    UsersEditComponent,
    FormsListComponent,
    FormsNewComponent,
    FormsEditComponent,
    FieldsEditComponent,
    FieldsNewComponent,
    ListsListComponent,
    ListsEditComponent,
    ListsNewComponent,
    ValuesEditComponent,
    ValuesNewComponent,
    ProcessesListComponent,
    ProcessesEditComponent,
    ProcessesNewComponent,
    StatesNewComponent,
    StatesEditComponent,
    StatesListComponent,
    TransitionsEditComponent,
    TransitionsListComponent,
    TransitionsNewComponent
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    MatFormFieldModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    BrowserAnimationsModule 
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { constructor() {
}
}
