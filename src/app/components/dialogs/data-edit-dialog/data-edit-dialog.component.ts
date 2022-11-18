import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DataInsertInput as DataEditInput } from 'src/app/models/dataInsertInput';
import { dragMode } from 'src/app/models/enums';
import { ProfileData } from 'src/app/models/profileData';

@Component({
  selector: 'app-data-edit-dialog[profileData]',
  templateUrl: './data-edit-dialog.component.html',
  styleUrls: ['./data-edit-dialog.component.scss']
})
export class DataInsertDialogComponent implements OnInit{

  @ViewChild('dataInsertTable') dataInsertTable!: ElementRef;

  @Input() profileData!: ProfileData | null;

  @Output() getProfileData = new EventEmitter<number[]>; 
  @Output() backToPreviousDialog = new EventEmitter;
  @Output() closeDialog = new EventEmitter;

  private _allowedCharacters = [...'1234567890,.'];
  private _draggingElement!: {
    element: HTMLDivElement,
    elementIndex: number
  };

  tableRowsArray: DataEditInput[] = [
    {value: null, isDragging: false},
  ];

  constructor() { }

  ngOnInit(): void {
    this.setInitialValues();
  }

  setInitialValues() {
    if(this.profileData === null) return;

    this.tableRowsArray = this.profileData!.values.map(x =>{
      return {
        value: x,
        isDragging: false
      } as DataEditInput
    });

    this.tableRowsArray.push({
      value: null,
      isDragging: false
    })
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

  onNgModelChange(event: string, index: number) {  
    if(!(index === this.tableRowsArray.length - 1)) return;
    if(event === null) return;    
    if(![...event.toString()].every(x => this._allowedCharacters.indexOf(x) >= 0)) return;
      
    this.addNewRow();
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

  private getValuesFormElementArray(): number[] {
    return this.tableRowsArray
          .filter(x => x.value !== null)
          .map(x => x.value) as number[];
  }

  // EVENTS EMITTERS:
  saveClick() {    
    this.getProfileData.emit(this.getValuesFormElementArray());
  }

  closeDialogClick() {    
    this.closeDialog.emit();
  }

  backToPreviousDialogClick() {
    this.backToPreviousDialog.emit();
  }
}
