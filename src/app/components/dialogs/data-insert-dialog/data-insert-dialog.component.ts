import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { fromEvent, Subscription } from 'rxjs';
import { ProfileData } from 'src/app/models/profileData';
import { DataInsertInput } from 'src/app/models/dataInsertInput';
import { dragMode } from 'src/app/models/enums';

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
  private _allowedCharacters = '1234567890,.';
  private _draggingElement!: {
    element: HTMLDivElement,
    elementIndex: number
  };
  
  title: string = 'Profile1';
  tableRowsArray: DataInsertInput[] = [
    {value: 1, isDragging: false}, 
    {value: 2, isDragging: false},
    {value: 3, isDragging: false},
    {value: 4, isDragging: false},
    {value: 5, isDragging: false},
    {value: null, isDragging: false},
  ];

  constructor() { }

  ngAfterViewInit(): void {
    this._table = this.dataInsertTable.nativeElement;

    // this.AppendEventToTheLastInput();
  }
  
  private AppendEventToTheLastInput() {
    let lastInput = this._table.rows[this.tableRowsArray.length - 1] as HTMLTableRowElement;
    
    const lastInputEventSubscription = fromEvent(lastInput, 'keydown').subscribe((event) => {
      let keyboarEvent = event as KeyboardEvent;
      if(this._allowedCharacters.includes(keyboarEvent.key)) {
        this.addNewRow();
        lastInputEventSubscription.unsubscribe();

        setTimeout(() => { 
          this.AppendEventToTheLastInput(); //recursion HAVE TO be delayed in race condition
        }, 0);
      }
    });
  }

  private addNewRow() {
    // console.log(this.tableRowsArray);
    
    this.tableRowsArray.push({
      value: null,
      isDragging: false
    })
  }

  dragStart(event: DragEvent, index: number) {
    this._draggingElement = {
      element: event.target as HTMLDivElement,
      elementIndex: index
    }
    
    this.tableRowsArray[index].isDragging = true;
  }

  dragEnd(index: number) {
    this.tableRowsArray[index].isDragging = false;
  }

  dragOver(event: DragEvent) {

    event.preventDefault();
    let clientY = event.clientY;
    const elementsBoundingRect = this._draggingElement.element.getBoundingClientRect();
    const halfOfHeight = elementsBoundingRect.height / 2;
    const elementBottom = elementsBoundingRect.bottom;
    let swappingElementIndex = this._draggingElement.elementIndex;

    if(clientY >= elementBottom + halfOfHeight) {

      this.swapClient(swappingElementIndex, dragMode.UP);
      return;
    }

    if(clientY <= elementBottom - halfOfHeight) {

      this.swapClient(swappingElementIndex, dragMode.DOWN);
      return;
    }
  }

  private swapClient(swappingElementIndex: number, dragMode: dragMode) {

    let swappedElementIndex = swappingElementIndex + dragMode;

    if(swappedElementIndex == -1 || swappedElementIndex == this.tableRowsArray.length - 1)
      return;

    this.swapArrayElements(swappingElementIndex, swappedElementIndex);
    this._draggingElement.elementIndex += dragMode;
  }

  private swapArrayElements(swappingElementIndex: number, swappedElementIndex: number) {
    [this.tableRowsArray[swappingElementIndex], this.tableRowsArray[swappedElementIndex]] = 
    [this.tableRowsArray[swappedElementIndex], this.tableRowsArray[swappingElementIndex]];
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

  removeEmptyRow(event: KeyboardEvent,index: number) {

    if(this.tableRowsArray.length === 1 || index == this.tableRowsArray.length - 1)
      return;

    if(this.tableRowsArray[index].value === null) {
      this.tableRowsArray.splice(index, 1);
    }
  }
}
