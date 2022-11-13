import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-data-insert',
  templateUrl: './data-insert.component.html',
  styleUrls: ['./data-insert.component.scss']
})
export class DataInsertComponent implements AfterViewInit {

  @ViewChild('dataInsertTable') dataInsertTable!: ElementRef;

  private _table!: HTMLTableElement;
  private _lastInput!: HTMLInputElement;
  private _asd!: number;
  constructor() { }

  ngAfterViewInit(): void {
    this._table = this.dataInsertTable.nativeElement;
    
    this._lastInput = this._table.rows[this._table.rows.length - 1].querySelector('input') as HTMLInputElement;   

    this._asd = 123

    console.log(this._lastInput);

    this._lastInput.addEventListener('keydown', this.lastInputKeyPressed.bind(this), false);
  }

  lastInputKeyPressed(event: KeyboardEvent) {    
    if(event) {
      this._lastInput.replaceWith(this._lastInput.cloneNode(true)); //remove all event listeners
    }
  }

  click() {
    this._lastInput.removeEventListener('keydown', this.lastInputKeyPressed, false)
  }
}
