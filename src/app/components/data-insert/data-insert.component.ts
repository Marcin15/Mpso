import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-data-insert',
  templateUrl: './data-insert.component.html',
  styleUrls: ['./data-insert.component.scss']
})
export class DataInsertComponent implements AfterViewInit {

  @ViewChild('dataInsertTable') dataInsertTable!: ElementRef;

  private _table!: HTMLTableElement;
  private _lastInput!: HTMLInputElement;
  
  tableRowInserterArray: any[] = [Object];

  constructor() { }

  ngAfterViewInit(): void {
    this._table = this.dataInsertTable.nativeElement;

    this.AppendEventToTheLastInput();
  }

  private AppendEventToTheLastInput() {
    this._lastInput = this._table.rows[this.tableRowInserterArray.length - 1].querySelector('input') as HTMLInputElement;

    console.log(this._lastInput);
    
    const lastInputEventSubscription = fromEvent(this._lastInput, 'keydown')
    .subscribe((event) => {
      if(event) {
        this.tableRowInserterArray.push(Object);
        lastInputEventSubscription.unsubscribe();

        setTimeout(() => { 
          this.AppendEventToTheLastInput(); //recursion HAVE TO be delayed in race condition
        }, 0);
      }
    });
  }
}
