import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { fromEvent } from 'rxjs';
import { ProfileData } from 'src/app/models/profileData';
import { DataInsertInput } from 'src/app/models/dataInsertInput';

@Component({
  selector: 'app-data-insert-dialog',
  templateUrl: './data-insert-dialog.component.html',
  styleUrls: ['./data-insert-dialog.component.scss']
})
export class DataInsertDialogComponent implements AfterViewInit {

  @ViewChild('dataInsertTable') dataInsertTable!: ElementRef;
  @Output() getProfileData = new EventEmitter<ProfileData>; 
  @Output() closeDialog = new EventEmitter;

  private _table!: HTMLTableElement;
  private allowedCharacters = '1234567890,.';
  
  title: string = 'Profile1';
  tableRowInserterArray: DataInsertInput[] = [{Id: 1, value: 0}, {Id: 2, value: 1}];

  constructor() { }

  ngAfterViewInit(): void {
    this._table = this.dataInsertTable.nativeElement;

    this.AppendEventToTheLastInput();
  }
  
  private AppendEventToTheLastInput() {
    let lastInput = this._table.rows[this.tableRowInserterArray.length - 1] as HTMLTableRowElement;
    this.allowDragElements(lastInput);
    
    const lastInputEventSubscription = fromEvent(lastInput, 'keydown').subscribe((event) => {
      let keyboarEvent = event as KeyboardEvent;
      if(this.allowedCharacters.includes(keyboarEvent.key)) {
        this.addNewRow();
        lastInputEventSubscription.unsubscribe();

        setTimeout(() => { 
          this.AppendEventToTheLastInput(); //recursion HAVE TO be delayed in race condition
        }, 0);
      }
    });
  }

  private addNewRow() {
    console.log(this.tableRowInserterArray);
    
    let lastId = this.tableRowInserterArray.at(-1)?.Id as number;

    this.tableRowInserterArray.push({
      Id: lastId + 1,
      value: 0
    })
  }

  private allowDragElements(lastRow: HTMLTableRowElement) {

    let moveHandler = lastRow.querySelector('.moveHandler'); 

    console.log(moveHandler);
    

    fromEvent(lastRow, 'dragstart').subscribe((event) => {
      console.log(event);
      
    });
  }

  private swapArrayElements() {
    [this.tableRowInserterArray[0], this.tableRowInserterArray[1]] = 
    [this.tableRowInserterArray[1], this.tableRowInserterArray[0]];
  }

  saveClick() {
    this.getProfileData.emit({
      title: this.title,
      values: [1, 2, 3, 4, 5, 10],
      description: 'desc',
      dateCreated: new Date(),
      lastModified: new Date()
    });
  }

  closeDialogClick() {    
    this.closeDialog.emit();
  }
}
