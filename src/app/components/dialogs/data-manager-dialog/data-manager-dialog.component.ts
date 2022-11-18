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
  @Output() update = new EventEmitter<ProfileData>();
  constructor() { }

  ngOnInit(): void {
  }

  hideComponentOnClick() {    
    this.hideComponent.emit(true);
  }

  editDataManagerItem(event: ProfileData) {
    let item = this.userDataArray.findIndex(x => x.dateCreated === event.dateCreated);
    
  }

  removeDataManagerItem(event: ProfileData) {
    let item = this.userDataArray.findIndex(x => x.dateCreated === event.dateCreated);
    this.userDataArray.splice(item, 1);
  }
}
