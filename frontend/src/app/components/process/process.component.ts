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
  idProcess : number;
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
  
  private categoria: any;

  // End PieChart

  formProcessList:FormGroup;
  
  

  constructor(private fb: FormBuilder,
    private backend: BackendService,
    private router: Router) { 
    this.processes = [];
    this.idProcess = 0;
    this.idUsuario = 0;
    //this.charts = [{}];
    this.dataCharts = [];
    this.dataLabels = [];
    this.idUsuario = Number(localStorage.getItem('idUsuario'));
    this.formProcessList = this.fb.group({
      processList: [''],
    });
    
    
    

  }

  ngOnInit(): void {
    //this.getPieChartData(1);
    this.backend.getProcess(this.idUsuario).subscribe(x => {
      this.processes = x.data;
      //alert(JSON.stringify(this.processes));
      this.processes.forEach(element => {
      
        
        this.backend.getStateChartData(element.idProceso).subscribe(res => {
          this.categoria = res;
          for (const cate of this.categoria) {
            this.pieChartLabels.push(cate.estado);
            this.pieChartData.push(cate.Instancias);
            //alert(JSON.stringify(this.pieChartLabels));
            //alert(JSON.stringify(this.pieChartData));
              
          };
          this.dataCharts[element.idProceso] = this.pieChartData;
          this.dataLabels[element.idProceso] = this.pieChartLabels;

          /** */
        let ctx: any = document.getElementById(element.idProceso + "") as HTMLElement;
        let data = {
          labels: this.pieChartLabels,
          datasets: [
            {
              label: 'TeamA Score',
              data: this.pieChartData,
              backgroundColor: 'blue',
              borderColor: 'lightblue',
              fill: false,
              lineTension: 0,
              radius: 5,
            },
          ],
        };
    
        //options
        let options: ChartOptions = {
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
    
        let chart = new Chart(ctx, {
          type: 'pie',
          data: data,
          options: options,
        });

        
        /** */

          alert(JSON.stringify(this.dataCharts[element.idProceso]));
          alert(JSON.stringify(this.dataLabels[element.idProceso]));
          //this.charts.push({"processId": element.idProceso, "pieChartLabels": this.pieChartLabels, "pieChartData": this.pieChartData});
          this.pieChartLabels = [];
          this.pieChartData = [];
        });
        
      });
    })
    //

    
    
  }

  printProcessSelected(processSelected: string) {
    const mensaje = this.formProcessList.controls['processList'].value;
    //alert(mensaje?.innerHTML);
    //alert(mensaje);
    if (mensaje === processSelected) {
      return true;
    } else {
      return false;
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
    let process = JSON.parse(JSON.stringify(data));
    this.idProcess = process["idProceso"];
    localStorage.setItem('idProceso', process["idProceso"]);
    localStorage.setItem('nombreProceso', process["nombreProceso"]);
    this.irA('/instances');
  }

}
