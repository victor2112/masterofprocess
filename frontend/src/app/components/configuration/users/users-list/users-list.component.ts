import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { UsuarioItem } from 'src/app/models/UsuarioItem';
import { BackendService } from 'src/app/service/backend.service';



@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements AfterViewInit {
  users: UsuarioItem[];

  



  displayedColumns: string[] = ['nombre'];
  dataSource: MatTableDataSource<UsuarioItem>;
  
  idProcess : number;
  idUsuario : number;
  idInstance : number;
  processName : string;

 

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator!;
  }

  constructor(private backend: BackendService,
    private router: Router) { 
      this.users = [];
      this.idInstance = 0;
      this.idUsuario = 0;
      this.idProcess = 0;
      this.processName = ""
      
   
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource<UsuarioItem>(this.users);
   

  }

  ngOnInit(): void {
    this.processName = localStorage.getItem('nombreProceso')!;
    this.idUsuario = Number(localStorage.getItem('idUsuario'));
    this.idProcess = Number(localStorage.getItem('idProceso'));
    this.backend.getUsuario().subscribe(x => {
      this.users = x.data;
      this.dataSource = new MatTableDataSource<UsuarioItem>(this.users);
      //alert(JSON.stringify(this.users));
      this.dataSource.paginator = this.paginator!;
    })
      
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  



  irA(ruta: string) {
      
    if (ruta === "login") {
      localStorage.clear();
      this.router.navigateByUrl('/' + ruta); 
    } else if (ruta.length > 0) {
      this.router.navigateByUrl('/' + ruta); 
    }
  }

  getItems(data: any){
    let instance = JSON.parse(JSON.stringify(data));
    localStorage.setItem('idInstancia', instance["idInstancia"]);
    localStorage.setItem('estadoInstancia', instance["estado"]);
    this.irA('/forms');
  }

  deleteUser(idUsuario: number) {
    this.backend.deleteUsuario(idUsuario).subscribe(x => {
      alert(x.message);
      window.location.reload()
    })
  }


}
