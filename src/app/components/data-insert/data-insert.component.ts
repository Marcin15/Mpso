import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-insert',
  templateUrl: './data-insert.component.html',
  styleUrls: ['./data-insert.component.scss']
})
export class DataInsertComponent implements OnInit {

  @Output() hideComponent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  hideComponentOnClick() {    
    this.hideComponent.emit(true);
  }
}
