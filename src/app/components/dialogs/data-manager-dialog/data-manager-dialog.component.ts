import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProfileData } from 'src/app/models/profileData';

@Component({
  selector: 'app-data-manager[userDataArray]',
  templateUrl: './data-manager-dialog.component.html',
  styleUrls: ['./data-manager-dialog.component.scss']
})
export class DataManagerDialogComponent implements OnInit {

  @Input() userDataArray!: ProfileData[];

  @Output() hideComponent = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  hideComponentOnClick() {    
    this.hideComponent.emit(true);
  }
}
