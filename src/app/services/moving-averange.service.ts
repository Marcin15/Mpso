import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovingAverangeService {

  constructor() { }

  threePointMovingAverange(data: number[]): number[] {
    let result: number[] = [];

    for (let i = 0; i < data.length; i++) {  
      if(i < 1) {
        result.push(NaN);
        continue;
      }
      
      result.push((1/3) * (data[i-1] + data[i] + data[i+1]));
    }
    

    return result;
  }

  fourPointMovingAverange(data: number[]): number[] {
    let result: number[] = [];

    for (let i = 0; i < data.length; i++) {
      if(i < 2) {
        result.push(NaN);
        continue;
      }

      result.push((1/4) * ((.5* data[i-2] + data[i-1] + data[i] + data[i+1] + .5*data[i + 2])));
    }

    return result;
  }

}
