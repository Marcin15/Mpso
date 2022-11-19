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

  basicInformationDialogHidden = true;
  editingProfileData!: ProfileData;

  private editingProfileDataIndex!: number;

  constructor() { }

  ngOnInit(): void {
  }

  hideComponentOnClick() {    
    this.hideComponent.emit(true);
  }

  editDataManagerItem(event: ProfileData) {
    let item = this.userDataArray.findIndex(x => x.dateCreated === event.dateCreated);
    this.basicInformationDialogHidden = false;
    
    this.editingProfileData = this.userDataArray[item];
    this.editingProfileDataIndex = item;
  }

  removeDataManagerItem(event: ProfileData) {
    let item = this.userDataArray.findIndex(x => x.dateCreated === event.dateCreated);
    this.userDataArray.splice(item, 1);
  }

  closeBasicInformationDialog() {
    this.basicInformationDialogHidden = true;
    this.clearEditingUserProfileData();
  }

  updateUserProfileData(event: ProfileData) {
    this.userDataArray[this.editingProfileDataIndex] = event;
    this.basicInformationDialogHidden = true;
    this.clearEditingUserProfileData();
  }

  clearEditingUserProfileData() {
    this.editingProfileData = {} as ProfileData;
    this.editingProfileDataIndex = {} as number;
  }
}
