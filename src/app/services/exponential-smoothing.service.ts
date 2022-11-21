import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExponentialSmoothingService {

  constructor() { }

  calculate(data: number[], alfa: number): Array<number | null> {
    let result: Array<number | null> = [];
    
    for (let i = 0; i < data.length; i++) {
      if(i === 0) {
        result.push(null);
        continue;
      }
      
      result.push(alfa*data[i] + (1 - alfa)*data[i-1]);
    }
    
    return result;
  }
}
