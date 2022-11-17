import {
    AfterViewInit,
    Component,
    Input,
    OnInit,
    ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartLabelCreatorService } from 'src/app/services/chart-label-creator.service';
import { MovingAverangeService } from 'src/app/services/moving-averange.service';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
})
export class ChartComponent implements OnInit, AfterViewInit {
    @Input() values!: number[];
    @Input() title!: string;

    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    private threePointMovingAverange!: number[];
    private fourPointMovingAverange!: number[];

    public chartType!: ChartType;
    public chartData!: ChartConfiguration['data'];
    public chartOptions!: ChartConfiguration['options'];

    constructor(
        private chartLabelCreator: ChartLabelCreatorService,
        private movingAverangeService: MovingAverangeService
    ) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.chartType = this.getChartType();
            this.chartData = this.getChartData();
            this.chartOptions = this.getChartOptions();
        });

    }

    ngOnInit(): void {
        this.threePointMovingAverange =
            this.movingAverangeService.threePointMovingAverange(this.values);
        this.fourPointMovingAverange =
            this.movingAverangeService.fourPointMovingAverange(this.values);
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
                },
                {
                    data: this.threePointMovingAverange,
                    label: 'Three point moving averange',
                    backgroundColor: 'rgba(148,159,177,0.2)',
                    borderColor: 'blue',
                    pointBackgroundColor: 'rgba(148,159,177,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                },
                {
                    data: this.fourPointMovingAverange,
                    label: 'Four point moving averange',
                    backgroundColor: 'rgba(148,159,177,0.2)',
                    borderColor: 'red',
                    pointBackgroundColor: 'rgba(148,159,177,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(148,159,177,0.8)',
                },
            ],
            labels: this.chartLabelCreator.createLabel(this.values),
        };
    }

    getChartOptions(): ChartConfiguration['options'] {
        return {
            maintainAspectRatio: false,
            elements: {
                line: {
                    tension: 0,
                },
            },
            scales: {
                // We use this empty structure as a placeholder for dynamic theming.
                x: {
                    type: 'linear',
                    ticks: {
                        stepSize: 1,
                    },
                },
                y: {
                    position: 'left',
                },
            },

            plugins: {

                legend: {
                    display: false,
                    position: 'right',
                },
                title: {
                    display: true,
                    text: this.title,
                    font: {
                        size: 22,
                    },
                },
            },
        };
    }
}
