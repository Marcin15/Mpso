import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartLabelCreatorService } from 'src/app/services/chart-label-creator.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {

  @Input() values!: number[];
  @Input() title!: string;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public chartType!: ChartType;
  public chartData!: ChartConfiguration['data'];
  public chartOptions!: ChartConfiguration['options'];

  constructor(
    private chartLabelCreator: ChartLabelCreatorService
  ) { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.chartType = this.getChartType();
      this.chartData = this.getChartData();
      this.chartOptions = this.getChartOptions();
    });
  }

  ngOnInit(): void {
  }

  getChartType(): ChartType {
    return 'line';
  }

  getChartData(): ChartConfiguration['data'] {
    return {
      datasets: [
        {
          data: this.values,
          label: 'Base data',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin',
        },
      ],
      labels: this.chartLabelCreator.createLabel(this.values)
    };
  }

  getChartOptions(): ChartConfiguration['options'] {
    return {
      maintainAspectRatio: false,
      elements: {
        line: {
          tension: 0.5
        }
      },
      scales: {
        // We use this empty structure as a placeholder for dynamic theming.
        x: {
          type: 'linear',
          ticks: {
            stepSize: 1
          }
        },
        y:
          {
            position: 'left',
          }
      },
  
      plugins: {
        legend: {
           display: true,
           position: 'right'
          },
          title: {
            display: true,
            text: 'Profile1',
            font: {
              size: 18
            }
          }
      }
    }
  }
}
