import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculationHelperService {

  constructor() { }

  roundToDecimalPlace(value: number, precision: number): number {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
  }
}
