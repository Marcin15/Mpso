import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartLabelCreatorService {

  constructor() { }

  createLabel(data: number[]): number[] {

    if(!data)
    return [];

    let result: number[] = [];

    data.forEach((element, index) => {
      console.log(`${element} + ${index}`);
      
      result.push(index);
    });

    console.log(result);

    return result;
  }
}
