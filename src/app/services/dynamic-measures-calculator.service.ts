import { Injectable } from '@angular/core';
import { CalculationHelperService } from './calculation-helper.service';

@Injectable({
  providedIn: 'root'
})
export class DynamicMeasuresCalculatorService {

  constructor(
    private calculationHelper: CalculationHelperService
  ) { }

  absuluteIncrease_t0(data: number[]): Array<number | null> {
    let result: Array<number | null> = [];
    result.push(null);

    for (let i = 1; i < data.length; i++) {
      let calculated = data[i] - data[0];
      result.push(calculated);   
    }

    return result;
  }

  absuluteIncrease_t1(data: number[]): Array<number | null> {
    let result: Array<number | null> = [];
    result.push(null);

    for (let i = 1; i < data.length; i++) {
      let calculated = data[i]-data[i-1];
      result.push(calculated);   
    }

    return result;
  }

  relativeIncrease_t0(data: Array<number | null>, baseFirstElement: number): Array<number | null> {
    let result: Array<number | null> = [];
    result.push(null);

    for (let i = 1; i < data.length; i++) {
      let calculated = <number>data[i]/baseFirstElement * 100;
      result.push(calculated);   
    }

    return result;
  }

  relativeIncrease_t1(data: Array<number | null>, baseFirstElement: number): Array<number | null> {
    let result: Array<number | null> = [];
    result.push(null);

    for (let i = 1; i < data.length; i++) {
      let calculated = <number>data[i]/baseFirstElement * 100;
      result.push(calculated);   
    }

    return result;
  }

  fixedBaseIndex(data: number[]): Array<number | null> {
    let result: Array<number | null> = [];
    result.push(null);

    for (let i = 1; i < data.length; i++) {
      let calculated = (data[i]-data[0])/data[0] + 1;
      result.push(calculated);     
    }

    return result;
  }

  chainBaseIndex(data: number[]): Array<number | null> {
    let result: Array<number | null> = [];
    result.push(null);

    for (let i = 1; i < data.length; i++) {
      let calculated = (data[i]-data[i-1])/data[i-1] + 1;
      result.push(calculated);      
    }

    return result;
  }

  averageRateOfChange(data: Array<number | null>): number {
    let result: number = data.filter(x => x !== null)[0] as number;
  
    for (let i = 2; i < data.length; i++) {
      result *= <number>data[i];
    }
    
    return Math.pow(result, 1/data.length);
  }
}
