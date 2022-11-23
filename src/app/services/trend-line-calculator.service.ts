import { Injectable } from '@angular/core';
import { TrendLineData } from '../models/trendLineData';
import { CalculationHelperService } from './calculation-helper.service';

@Injectable({
  providedIn: 'root'
})
export class TrendLineCalculatorService {

  private xSum: number = 0;
  private ySum: number = 0;
  private xySum: number = 0;
  private xPower2Sum: number = 0;
  private elementsCount: number = 0;
  private baseDataLenght: number = 0;

  constructor(
    private calculationHelper: CalculationHelperService
  ) {  }

  getTrendLine(data: Array<number | null>, baseDataLenght: number): TrendLineData {
   
    this.resetInitialValues();

    this.xSumSetter(data);
    this.ySumSetter(data);
    this.xySumSetter(data);
    this.elementsCount = data.filter(x => x !== null).length ;      
    this.baseDataLenght = baseDataLenght;
    
    let slope = this.calculateSlope();
    let intercept = this.calculateYIntercept(slope);

    let values: Array<number | null> = []

    for (let i = 0; i < this.baseDataLenght; i++) {
      if(i === 0) {
        values.push(intercept);
        continue;
      }

      // if(i === baseDataLenght / 2) {
      //   values.push(slope*i+ intercept);
      //   continue;
      // }

      if(i === this.baseDataLenght - 1) {
        values.push(slope*i+ intercept);
        continue;
      }
      
      values.push(null);
    } 
  
    return {
      values: values,
      equation: `y = ${this.calculationHelper.roundToDecimalPlace(slope, 4)}x + ${this.calculationHelper.roundToDecimalPlace(intercept, 4)}`
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

  private xSumSetter(data: Array<number | null>): void {

    data.forEach((_, index) => {
      this.xSum += index;      
      this.xPower2Sum += Math.pow((index), 2);
    });

  }

  private ySumSetter(data: Array<number | null>): void {

    data.forEach((element) => {
      this.ySum += element!;
    });
  }

  private xySumSetter(data: Array<number | null>): void {

    data.forEach((element, index) => {
      this.xySum += element!*index;
    });
  }

  private resetInitialValues() {

    this.xSum = 0;
    this.ySum = 0;
    this.xySum = 0;
    this.xPower2Sum = 0;
    this.elementsCount = 0;
  }
}
