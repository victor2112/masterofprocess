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
export class ProcessComponent {

  processes : ProcessItem[];
  idUsuario : number;
  dataCharts: SingleDataSet[];
  dataLabels: Label[][];
  
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
    responsive: true,
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

  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }
  
  public lineChartData = {};
  /* Line Chart */
  chart: any;

    



  

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


      /** */
      var dataX: any[] = [];
      var dataMR: any[] = [];

      var labelsTemp: any[] = [];

      this.backend.getCompletionChartData(idProcess).subscribe(res => {
        this.categoria = res;
        var ucl: any[] = [];
        var lcl: any[] = [];
        var lc: any[] = [];
        var lcMR: any[] = [];

        for (const cate of this.categoria) {
          dataX.push(cate.Instancias);
          labelsTemp.push(cate.fechaModificacion.substring(0,10));
          
        }

        // Calculate LC, UCL and LCL
        var sumX = 0;
        var sumMR = 0;


        // dataMR and sum of dataX
        dataX.forEach((element, index) => {
          sumX += element;
          if (dataMR.length === 0 ) {
            dataMR.push(0);
          } else {
            dataMR.push(Math.abs(element - dataX[index-1]));
            sumMR += dataMR[index];
          };
        });

        var e2 = 2.659;


        // LC Graph MR
        for (const entry of dataMR) {
          lcMR.push((sumMR / (dataMR.length - 1)));
          
        };

        // LC Graph X
        for (const entry of dataX) {
          lc.push((sumX / dataX.length));
          
        };
        
        dataX.forEach((element, index) => {
          ucl.push(lc[index] + (e2 * lcMR[index]));
          let lclEntry = lc[index] - (e2 * lcMR[index]);
          if (lclEntry > 0) {
            lcl.push(lclEntry);
          } else {
            lcl.push(0);
          }
          
        });
        


        
        var dataSetTemp = [{
            label: 'Completion',
            data: dataX,
            backgroundColor: 'blue',
            borderColor: 'lightblue',
            fill: false,
            lineTension: 0,
            radius: 5,
          },{
            label: 'LC',
            data: lc,
            backgroundColor: 'red',
            borderColor: 'red',
            fill: false,
            lineTension: 0,
            radius: 5,
          },{
            label: 'UCL',
            data: ucl,
            backgroundColor: 'yellow',
            borderColor: 'yellow',
            fill: false,
            lineTension: 0,
            radius: 5,
          },{
            label: 'LCL',
            data: lcl,
            backgroundColor: 'green',
            borderColor: 'lightgreen',
            fill: false,
            lineTension: 0,
            radius: 5,
          },
        ];


        let ctx: any = document.getElementById('lineChart') as HTMLElement;
        this.lineChartData = {
          labels: labelsTemp,
          datasets: dataSetTemp,
        };


        

        //options
        var options: ChartOptions = {
          responsive: true,
          title: {
            display: true,
            position: 'top',
            text: 'Completion Graph',
            fontSize: 18,
            fontColor: '#111',
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontColor: '#333',
              fontSize: 16,
            },
          },
        };

        var chart = new Chart(ctx, {
          type: 'line',
          data: this.lineChartData,
          options: options,
        });
        /** */


      });

      



      //alert(JSON.stringify(dataSetTemp));
      //alert(JSON.parse(JSON.stringify(this.lineChartData)).datasets + (JSON.stringify(dataSetTemp)));
      //alert(JSON.stringify(JSON.parse(JSON.stringify(this.lineChartData)).datasets));
      //JSON.parse(JSON.stringify(this.lineChartData))['datasets'][1] = dataSetTemp;

      //alert(this.pieChartData.length);
      
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
