import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../../assets/js/canvasjs.min';
import { AuthService } from 'src/app/auth/auth.service';
import { DashboardService } from '../../dashboard.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie.component.html'
})
export class PieChartComponent implements OnInit {
  loading = true;
  constructor(
    private authService: AuthService,
    private dashService: DashboardService
  ) {}
  data = {
    title: 'Total assets',
    unit: 'Tzsh',
    dataPoints: [
     
    ]
  };
  ngOnInit() {
    this.getPieData().subscribe(
      dataPoints => {
        this.loading = false;
        this.data.dataPoints = dataPoints
        this.renderChat();
      },
      (err: HttpErrorResponse) => {
        this.loading = false;
      }
    );
  }

  getPieData() {
    return this.dashService.getPieData();
  }

  renderChat() {
    if (this.authService.getDecodedToken().data.isAdmin) {
      this.data.title = 'User summary';
      this.data.unit = 'users';
      
    }
    const chart = this.makePieChart(this.data);

    chart.render();
  }

  makePieChart(data) {
    return new CanvasJS.Chart('chartContainerPie', {
      theme: 'light2',
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: data.title
      },
      data: [
        {
          type: 'pie',
          showInLegend: true,
          toolTipContent: `<b>{name}</b>: ${data.unit} {y} (#percent%)`,
          indexLabel: '{name} - #percent%',
          dataPoints: data.dataPoints
        }
      ]
    });
  }
}
