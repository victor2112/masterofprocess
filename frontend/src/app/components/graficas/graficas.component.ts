import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-annotation';
import { Color, Label, MultiDataSet, SingleDataSet } from 'ng2-charts';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { BackendService } from 'src/app/service/backend.service';
//import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.scss']
})
export class GraficasComponent {

  /*doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];

  doughnutChartData: MultiDataSet = [
    [
      55,
      25,
      20
    ]
  ];

  doughnutChartType: ChartType = 'pie';
  */
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

  // End PieChart
  /*
  public chartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  */
  //public chartLabels: Label[] = [];
  
  
  /*line, bar, radar, pie, polarArea, doughnut, bubble and scatter.*/
  /*public chartType: ChartType = 'pie';
  public chartLegend = true;
  public chartPlugins = [pluginDataLabels];

  
  
  
  
  public chartData: ChartDataSets[];
  public chartColors: { backgroundColor: any; }[];
  */
  private categoria: any;
  //private dato: never | undefined;
  //private datos = [];
  //private nombre: never | undefined;
  //private nombreCategoria = [];
  //private color: never | undefined;
  //private colores = [];
  

  constructor(protected categoriaService: BackendService) {
    //this.getCategoria();
    //this.chartData = [];
    //this.chartColors = [];
    this.pieChartColors = [];
    this.categoriaService.getStateChartData(1).subscribe(res => {
      this.categoria = res;
      //alert(JSON.stringify(this.categoria));
      for (const cate of this.categoria) {
        this.pieChartLabels.push(cate.estado);
        this.pieChartData.push(cate.Instancias);
        let color = {backgroundColor: this.getRandomColor()};
        //alert(JSON.stringify(color));
        //this.pieChartColors.push(color);
        
        //this.colors[0]["backgroundColor"] = ["green,"];
        
        
        
        
      }
      //this.colors[0]["backgroundColor"].push('green');
      //alert("colors: " + JSON.stringify(this.colors) );
     
      
    });
    
  }

  
  getRandomColor() {
    var color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }

  /* Line Chart */
  chart: any;

  

  ngAfterViewInit() {
    let ctx: any = document.getElementById('lineChart') as HTMLElement;
    var data = {
      labels: ['match1', 'match2', 'match3', 'match4', 'match5'],
      datasets: [
        {
          label: 'TeamA Score',
          data: [10, 50, 25, 70, 40],
          backgroundColor: 'blue',
          borderColor: 'lightblue',
          fill: false,
          lineTension: 0,
          radius: 5,
        },
        {
          label: 'TeamB Score',
          data: [20, 35, 40, 60, 50],
          backgroundColor: 'green',
          borderColor: 'lightgreen',
          fill: false,
          lineTension: 0,
          radius: 5,
        },
      ],
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
      data: data,
      options: options,
    });
  }


  /* End Line Chart */


  

  /*getCategoria() {
    this.categoriaService.getCategorias().subscribe(res => {
      this.categoria = res;
      //alert(this.categoria);
      for (const cate of this.categoria) {
        this.dato = cate.DATOS_CATE.split(',');
        this.datos.push(this.dato!);
        this.nombre = cate.NOMBRE_CATE;
        this.nombreCategoria.push(this.nombre!);
        this.color = cate.COLOR_CATE;
        this.colores.push(this.color!);
      }
      
      this.cargarDatos(this.datos, this.nombreCategoria, this.colores);
    });
  }
  
  cargarDatos(datos: never[], nombreCategoria: never[], colores: never[]) {
    this.chartData = [];
    this.chartColors = [];

    for (const index in datos) {
      this.chartData.push({ data: datos[index], label: nombreCategoria[index] });
      this.chartColors.push({backgroundColor: colores[index]});
    }
    //alert("chartColors: " + JSON.stringify(this.chartColors) );
  }
  */

 
}
