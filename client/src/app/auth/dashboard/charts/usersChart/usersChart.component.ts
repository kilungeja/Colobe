import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../../assets/js/canvasjs.min';

@Component({
  selector: 'app-users-chart',
  templateUrl: 'usersChart.component.html'
})
export class UsersChartComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      title: {
        text: 'Number of New Users'
      },
      axisY: {
        title: 'Number of Users',
        includeZero: false
      },
      toolTip: {
        shared: true
      },
      data: [
        {
          type: 'spline',
          name: '2018',
          showInLegend: true,
          dataPoints: [
            { y: 150, label: 'Jan' },
            { y: 145, label: 'Feb' },
            { y: 148, label: 'Mar' },
            { y: 138, label: 'Apr' },
            { y: 132, label: 'May' },
            { y: 120, label: 'Jun' },
            { y: 140, label: 'Jul' },
            { y: 129, label: 'Aug' },
            { y: 123, label: 'Sept' },
            { y: 138, label: 'Oct' },
            { y: 134, label: 'Nov' },
            { y: 160, label: 'Dec' }
          ]
        },
        {
          type: 'spline',
          name: '2019',
          showInLegend: true,
          dataPoints: [
            { y: 155, label: 'Jan' },
            { y: 150, label: 'Feb' },
            { y: 152, label: 'Mar' },
            { y: 148, label: 'Apr' },
            { y: 142, label: 'May' },
            { y: 150, label: 'Jun' },
            { y: 146, label: 'Jul' },
            { y: 149, label: 'Aug' },
            { y: 153, label: 'Sept' },
            { y: 158, label: 'Oct' },
            { y: 154, label: 'Nov' },
            { y: 150, label: 'Dec' }
          ]
        },
        {
          type: 'spline',
          name: '2020',
          showInLegend: true,
          dataPoints: [
            { y: 172, label: 'Jan' },
            { y: 173, label: 'Feb' },
            { y: 175, label: 'Mar' },
            { y: 172, label: 'Apr' },
            { y: 162, label: 'May' },
            { y: 165, label: 'Jun' },
            { y: 172, label: 'Jul' },
            { y: 168, label: 'Aug' },
            { y: 175, label: 'Sept' },
            { y: 170, label: 'Oct' },
            { y: 165, label: 'Nov' },
            { y: 169, label: 'Dec' }
          ]
        }
      ]
    });

    chart.render();
  }
}
