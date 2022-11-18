import { Injectable } from '@angular/core';
import { TrendLineData } from '../models/trendLineData';

@Injectable({
  providedIn: 'root'
})
export class TrendLineCalculatorService {

  private xSum: number = 0;
  private ySum: number = 0;
  private xySum: number = 0;
  private xPower2Sum: number = 0;
  private elementsCount: number = 0;

  constructor() {  }

  getTrendLine(data: number[]): TrendLineData {
    this.xSumSetter(data);
    this.ySumSetter(data);
    this.xySumSetter(data);
    this.elementsCount = data.length ;    

    let slope = this.calculateSlope();
    let intercept = this.calculateYIntercept(slope);

    let values: Array<number | null> = []

    for (let i = 0; i < data.length; i++) {
      if(i == 0) {
        values.push(intercept);
        continue;
      }
      if(i == data.length - 1) {
        values.push(slope*this.elementsCount - 1 + intercept);
        continue;
      }
      values.push(null);
    }

    console.log(`y = ${slope}x + ${intercept}`);
    console.log(this.elementsCount);
    
    

    return {
      values: values,
      equation: `y = ${slope}x + ${intercept}`
    }
  }

  private calculateSlope(): number {
    let numerator = this.elementsCount*this.xySum - this.xSum*this.ySum;
    let denominator = this.elementsCount*this.xPower2Sum-Math.pow(this.xSum, 2);

    return numerator / denominator
  }

  private calculateYIntercept(slope: number): number {

    return (this.ySum - slope*this.xSum) / this.elementsCount;
  }

  private xSumSetter(data: number[]): void {

    data.forEach((_, index) => {
      this.xSum += index;
      this.xPower2Sum += Math.pow((index), 2);
    });

  }

  private ySumSetter(data: number[]): void {

    data.forEach((element) => {
      this.ySum += element;
    });

  }

  private xySumSetter(data: number[]): void {

    data.forEach((element, index) => {
      this.xySum += element*index;
    });
  }
}
