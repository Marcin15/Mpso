import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager-dialog.component.html',
  styleUrls: ['./data-manager-dialog.component.scss']
})
export class DataManagerDialogComponent implements OnInit {

  @Output() hideComponent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  hideComponentOnClick() {    
    this.hideComponent.emit(true);
  }
}
