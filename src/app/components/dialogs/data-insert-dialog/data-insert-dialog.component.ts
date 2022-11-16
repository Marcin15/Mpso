import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { DataInsertInput } from 'src/app/models/dataInsertInput';
import { dragMode } from 'src/app/models/enums';
import { ProfileBasicInformation } from 'src/app/models/profileBasicInformation';
import { ProfileData } from 'src/app/models/profileData';

@Component({
  selector: 'app-data-insert-dialog',
  templateUrl: './data-insert-dialog.component.html',
  styleUrls: ['./data-insert-dialog.component.scss']
})
export class DataInsertDialogComponent implements AfterViewInit {

  @ViewChild('dataInsertTable') dataInsertTable!: ElementRef;

  // @Input() userProfileBasicInfo!: ProfileBasicInformation;

  @Output() getProfileData = new EventEmitter<number[]>; 
  @Output() closeDialog = new EventEmitter;

  private _table!: HTMLTableElement;
  private _allowedCharacters = '1234567890,.';
  private _draggingElement!: {
    element: HTMLDivElement,
    elementIndex: number
  };
  
  tableRowsArray: DataInsertInput[] = [
    {value: null, isDragging: false},
  ];

  constructor() { }

  ngAfterViewInit(): void {
    this._table = this.dataInsertTable.nativeElement;

    this.AppendEventToTheLastInput();
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

  insertNewRow(index: number) {
    this.tableRowsArray.splice(index, 0, {
      value: null,
      isDragging: false
    });
  }

  private addNewRow() {    
    this.tableRowsArray.push({
      value: null,
      isDragging: false
    })
  }

  dragStart(event: DragEvent, index: number) {
    if(index === this.tableRowsArray.length - 1)
      return;

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

  removeEmptyRow(event: KeyboardEvent, index: number) {

    if(this.tableRowsArray.length === 1 || index == this.tableRowsArray.length - 1)
      return;

    if(this.tableRowsArray[index].value === null && event.key === 'Backspace') {
      this.tableRowsArray.splice(index, 1);
    }
  }

  // EVENTS EMITTERS:
  saveClick() {
    console.log('witam');
    
    this.getProfileData.emit([1, 2, 3, 4, 5]);
  }

  closeDialogClick() {    
    this.closeDialog.emit();
  }
}
