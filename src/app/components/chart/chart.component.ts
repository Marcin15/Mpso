import {
    AfterViewInit,
    Component,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChange,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { ChartConfiguration, ChartType, ChartTypeRegistry, TooltipItem, TooltipModel } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartLabelCreatorService } from 'src/app/services/chart-label-creator.service';
import { MovingAverangeService } from 'src/app/services/moving-averange.service';

import { TrendLineCalculatorService } from 'src/app/services/trend-line-calculator.service';
import { ProfileData } from 'src/app/models/profileData';
import { TrendLineData } from 'src/app/models/trendLineData';
import { ExponentialSmoothingService } from 'src/app/services/exponential-smoothing.service';
import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss'],
    providers: [TrendLineCalculatorService]
})
export class ChartComponent implements OnInit, AfterViewInit, OnChanges {
    @Input() profileData!: ProfileData;

    @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

    private _threePointMovingAverange!: Array<number | null>;
    private _fourPointMovingAverange!: Array<number | null>;
    private _exponentialSmoothingAlfa0_3!: Array<number | null>;
    private _exponentialSmoothingAlfa0_7!: Array<number | null>;

    private _baseDateTrendLine!: TrendLineData;
    private _threePointMovingAverangeTrendLine!: TrendLineData;
    private _fourPointMovingAverangeTrendLine!: TrendLineData;
    private _exponentialSmoothingAlfa0_3TrendLine!: TrendLineData;
    private _exponentialSmoothingAlfa0_7TrendLine!: TrendLineData;

    public chartType!: ChartType;
    public chartData!: ChartConfiguration['data'];
    public chartOptions!: ChartConfiguration['options'];

    constructor(
        private chartLabelCreator: ChartLabelCreatorService,
        private movingAverangeService: MovingAverangeService,
        private trendLineService: TrendLineCalculatorService,
        private exponentialSmoothingService: ExponentialSmoothingService
    ) {}
    ngOnChanges(changes: SimpleChanges): void {
        let change = changes['profileData'];

        if(!change.firstChange) 
            this.updateChartInvoker(change.currentValue);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.chartType = this.getChartType();
            this.chartData = this.getChartData();
            this.chartOptions = this.getChartOptions();
        });
    }

    ngOnInit(): void {
        this.setChartData();
        this.setTrendLineData();
    }

    updateChartInvoker(profileData: ProfileData) {        
        this.profileData = profileData;
        this.setChartData();
        this.setTrendLineData();
        this.chartData = this.getChartData();
        this.chartOptions = this.getChartOptions();
        console.log(this._baseDateTrendLine);
        
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
                    label: 'Base data (trendline)',
                    data: this._baseDateTrendLine.values,
                    borderWidth: 2,
                    borderColor: 'rgba(68, 114, 196, .8)',
                    pointRadius: 0,
                    borderDash: [0, 1, 8],
                    spanGaps: true,
                    pointHitRadius: 0
                },
                {
                    label: 'Three point moving averange',
                    data: this._threePointMovingAverange,
                    borderColor: 'rgba(255, 99, 132, .7)',
                    pointBorderColor: 'rgba(255, 99, 132, .7)',
                    pointBackgroundColor: 'rgba(255, 99, 132, .7)',
                    pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
                    pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, .3)',
                    hidden: true,
                },
                {
                    label: 'Three point moving averange (trendline)',
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
                    data: this._fourPointMovingAverange,
                    borderColor: 'rgba(75, 192, 192, .7)',
                    pointBorderColor: 'rgba(75, 192, 192, .7)',
                    pointBackgroundColor: 'rgba(75, 192, 192, .7)',
                    pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
                    pointHoverBorderColor: 'rgba(75, 192, 192, .7)',
                    backgroundColor: 'rgba(75, 192, 192, .3)',
                    hidden: true,
                },
                {
                    label: 'Four point moving averange (trendline)',
                    data: this._fourPointMovingAverangeTrendLine.values,
                    borderWidth: 2,
                    borderColor: 'rgba(75, 192, 192, .8)',
                    pointRadius: 0,
                    borderDash: [0, 1, 8],
                    spanGaps: true,
                    hidden: true,
                },
                {
                    label: 'exponential smoothing α = 0.3',
                    data: this._exponentialSmoothingAlfa0_3,
                    borderColor: 'rgba(153, 102, 255, .7)',
                    pointBorderColor: 'rgba(153, 102, 255, .7)',
                    pointBackgroundColor: 'rgba(153, 102, 255, .7)',
                    pointHoverBackgroundColor: 'rgba(153, 102, 255, 1)',
                    pointHoverBorderColor: 'rgba(153, 102, 255, .7)',
                    backgroundColor: 'rgba(153, 102, 255, .3)',
                    hidden: true,
                },
                {
                    label: 'exponential smoothing α = 0.3 (trendline)',
                    data: this._exponentialSmoothingAlfa0_3TrendLine.values,
                    borderWidth: 2,
                    borderColor: 'rgba(153, 102, 255, .8)',
                    pointRadius: 0,
                    borderDash: [0, 1, 8],
                    spanGaps: true,
                    hidden: true,
                },
                {
                    label: 'exponential smoothing α = 0.7',
                    data: this._exponentialSmoothingAlfa0_7,
                    borderColor: 'rgba(255, 205, 86, .7)',
                    pointBorderColor: 'rgba(255, 205, 86, .7)',
                    pointBackgroundColor: 'rgba(255, 205, 86, .7)',
                    pointHoverBackgroundColor: 'rgba(255, 205, 86, 1)',
                    pointHoverBorderColor: 'rgba(255, 205, 86, .7)',
                    backgroundColor: 'rgba(255, 205, 86, .3)',
                    hidden: true,
                },
                {
                    label: 'exponential smoothing α = 0.7 (trendline)',
                    data: this._exponentialSmoothingAlfa0_7TrendLine.values,
                    borderWidth: 2,
                    borderColor: 'rgba(255, 205, 86, .8)',
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
                    // labels: {
                    //     filter(item, data) {
                    //         if(item.datasetIndex!%2 !== 0)
                    //             return false;

                    //         return true;
                    //     },

                    // }
                },
                tooltip: {
                    intersect: false,
                    position: 'nearest',
                    mode: 'index',
                    callbacks: {
                        label(thiss, tooltipItem) {
                            let chart = thiss as any;
                            
                            let datasetIndex = chart.datasetIndex;
                            
                            if(datasetIndex %2 !== 0) {
                                return '';
                            }

                            return `${chart.dataset.label}: ${chart.formattedValue}`;
                        },

                    }
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

    private setChartData() {
        this._threePointMovingAverange =
            this.movingAverangeService.threePointMovingAverange(this.profileData.values);
        this._fourPointMovingAverange =
            this.movingAverangeService.fourPointMovingAverange(this.profileData.values);
        this._exponentialSmoothingAlfa0_3 = 
            this.exponentialSmoothingService.calculate(this.profileData.values, .3);
        this._exponentialSmoothingAlfa0_7 = 
            this.exponentialSmoothingService.calculate(this.profileData.values, .7);
    }

    private setTrendLineData() {
        this._baseDateTrendLine = this.trendLineService
                .getTrendLine(this.profileData.values, this.profileData.values.length);

        this._threePointMovingAverangeTrendLine = this.trendLineService
                .getTrendLine(this._threePointMovingAverange, this.profileData.values.length);

        this._fourPointMovingAverangeTrendLine = this.trendLineService
                .getTrendLine(this._fourPointMovingAverange, this.profileData.values.length);

        this._exponentialSmoothingAlfa0_3TrendLine = this.trendLineService
                .getTrendLine(this._exponentialSmoothingAlfa0_3, this.profileData.values.length);

        this._exponentialSmoothingAlfa0_7TrendLine = this.trendLineService
                .getTrendLine(this._exponentialSmoothingAlfa0_7, this.profileData.values.length);
    }
}
