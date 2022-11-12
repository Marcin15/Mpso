import { Component } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Mpso';

  chartData!: ChartData[];
  showDataInsertComponent: boolean = false;

  click(){
    console.log('witam');
    this.showDataInsertComponent = true;
  }
}
