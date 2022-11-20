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

import { TrendLineCalculatorService } from 'src/app/services/trend-line-calculator.service';
import { ProfileData } from 'src/app/models/profileData';
import { TrendLineData } from 'src/app/models/trendLineData';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    providers: [TrendLineCalculatorService]
})
export class ChartComponent implements OnInit, AfterViewInit {
    @Input() profileData!: ProfileData;

    @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

    private threePointMovingAverange!: Array<number | null>;
    private fourPointMovingAverange!: Array<number | null>;

    private _baseDateTrendLine!: TrendLineData;
    private _threePointMovingAverangeTrendLine!: TrendLineData;
    private _fourPointMovingAverangeTrendLine!: TrendLineData;

    public chartType!: ChartType;
    public chartData!: ChartConfiguration['data'];
    public chartOptions!: ChartConfiguration['options'];

    constructor(
        private chartLabelCreator: ChartLabelCreatorService,
        private movingAverangeService: MovingAverangeService,
        private trendLineService: TrendLineCalculatorService
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
            this.movingAverangeService.threePointMovingAverange(this.profileData.values);
        this.fourPointMovingAverange =
            this.movingAverangeService.fourPointMovingAverange(this.profileData.values);

        this.getTrendLineData();
    }

    private getTrendLineData() {
        this._baseDateTrendLine = this.trendLineService
                .getTrendLine(this.profileData.values, this.profileData.values.length);

        this._threePointMovingAverangeTrendLine = this.trendLineService
                .getTrendLine(this.threePointMovingAverange, this.profileData.values.length);

        this._fourPointMovingAverangeTrendLine = this.trendLineService
                .getTrendLine(this.fourPointMovingAverange, this.profileData.values.length);
    }

    getChartType(): ChartType {
        return 'line';
    }

    getChartData(): ChartConfiguration['data'] {
        return {
            datasets: [
                {
                    label: 'Base data',
                    data: this.profileData.values,
                    borderColor: 'rgba(68, 114, 196, .7)',
                    pointBorderColor: 'rgba(68, 114, 196, .7)',
                    pointBackgroundColor: 'rgba(68, 114, 196, .7)',
                    pointHoverBackgroundColor: 'rgba(68, 114, 196, 1)',
                    pointHoverBorderColor: 'rgba(68, 114, 196, 1)',
                    backgroundColor: 'rgba(68, 114, 196, .3)',
                },
                {
                    label: 'Base data (trend line)',
                    data: this._baseDateTrendLine.values,
                    borderWidth: 2,
                    borderColor: 'rgba(68, 114, 196, .8)',
                    pointRadius: 0,
                    borderDash: [0, 1, 8],
                    spanGaps: true,
                    hidden: true,
                },
                {
                    label: 'Three point moving averange',
                    data: this.threePointMovingAverange,
                    borderColor: 'rgba(255, 99, 132, .7)',
                    pointBorderColor: 'rgba(255, 99, 132, .7)',
                    pointBackgroundColor: 'rgba(255, 99, 132, .7)',
                    pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, .3)'
                },
                {
                    label: 'Three point moving averange (trend line)',
                    data: this._threePointMovingAverangeTrendLine.values,
                    borderWidth: 2,
                    borderColor: 'rgba(255, 99, 132, .8)',
                    pointRadius: 0,
                    borderDash: [0, 1, 8],
                    spanGaps: true,
                    hidden: true,
                },
                {
                    label: 'Four point moving averange',
                    data: this.fourPointMovingAverange,
                    borderColor: 'rgba(75, 192, 192, .7)',
                    pointBorderColor: 'rgba(75, 192, 192, .7)',
                    pointBackgroundColor: 'rgba(75, 192, 192, .7)',
                    pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointHoverBorderColor: 'rgba(75, 192, 192, .7)',
                    backgroundColor: 'rgba(75, 192, 192, .3)'
                },
                {
                    label: 'Four point moving averange (trend line)',
                    data: this._fourPointMovingAverangeTrendLine.values,
                    borderWidth: 2,
                    borderColor: 'rgba(75, 192, 192, .8)',
                    pointRadius: 0,
                    borderDash: [0, 1, 8],
                    spanGaps: true,
                    hidden: true,
                },
            ],
            labels: this.chartLabelCreator.createLabel(this.profileData.values),
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
                    // max: this.profileData.values.length - 1
                },
                y: {
                    position: 'left',
                    beginAtZero: true,
                    // max: Math.max.apply(null, this.profileData.values) * 1.19
                },
            },

            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    align: 'center',
                },
                title: {
                    display: true,
                    text: this.profileData.title,
                    font: {
                        size: 22,
                    },
                },
            },
        };
    }
}
