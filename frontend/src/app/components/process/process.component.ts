import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/service/backend.service';
import { Router } from '@angular/router';
import { ProcessItem } from 'src/app/models/ProcessItem';
import { Color, Label, SingleDataSet } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import * as Chart from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  processes : ProcessItem[];
  idUsuario : number;
  dataCharts: SingleDataSet[];
  dataLabels: Label[][];
  //charts: [{}];
  /* Charts */
  colors: Color[] = [
    {
      backgroundColor: [
        'green',
        'blue',
        'red',
        'yellow',
        'brown',
        'pink',
        'purple',
        'gray',
        'orange',
      ]
    }
  ];


  // Start PieChart
  public pieChartOptions: ChartOptions = {
    title: {
      display: true,
      position: 'top',
      text: 'State Graph',
      fontSize: 18,
      fontColor: '#111',
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: { backgroundColor: any; }[];
  public idPieChart: number;
  private categoria: any;
  // End PieChart

  formProcessList:FormGroup;
  
  

  constructor(private fb: FormBuilder,
    private backend: BackendService,
    private router: Router) { 
    this.processes = [];
    this.idUsuario = 0;
    this.dataCharts = [];
    this.dataLabels = [];
    this.idUsuario = Number(localStorage.getItem('idUsuario'));
    this.formProcessList = this.fb.group({
      processList: [''],
    });
    this.idPieChart = 0;
    this.pieChartColors = [];
    
    

  }

  ngOnInit(): void {
    //this.getPieChartData(1);
    this.backend.getProcess(this.idUsuario).subscribe(x => {
      this.processes = x.data; 
    })
  }

  printProcessSelected(idProcess: number, processSelected: string) {
    const mensaje = this.formProcessList.controls['processList'].value;
    //alert(mensaje?.innerHTML);
    //alert(mensaje);
    if (mensaje === processSelected) {
      if (this.idPieChart != idProcess) {
        this.updatePieChart(idProcess);
        return true;
      } else {
      return true;
      }
    } else {
      return false;
    };
  }

  updatePieChart(idProcess: number){
    this.pieChartLabels = [];
    this.pieChartData = [];
    this.backend.getStateChartData(idProcess).subscribe(res => {
      this.categoria = res;
      for (const cate of this.categoria) {
        this.pieChartLabels.push(cate.estado);
        this.pieChartData.push(cate.Instancias); 
      }
    });
    this.idPieChart = idProcess;
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
    let process = JSON.parse(JSON.stringify(data));
    localStorage.setItem('idProceso', process["idProceso"]);
    localStorage.setItem('nombreProceso', process["nombreProceso"]);
    this.irA('/instances');
  }

 

}
