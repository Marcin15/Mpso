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
  @Output() profileSelected = new EventEmitter<ProfileData>();

  basicInformationDialogHidden = true;
  editingProfileData!: ProfileData | null;

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

    this.update.emit();
  }

  
  updateUserProfileData(event: ProfileData) {
    this.updateUserProfileDataArray(event);
    this.clearEditingUserProfileData();
    this.basicInformationDialogHidden = true;

    this.update.emit();
  }
  
  closeBasicInformationDialog() {
    this.basicInformationDialogHidden = true;
    this.clearEditingUserProfileData();
  }
  private updateUserProfileDataArray(data: ProfileData) {
    if(this.editingProfileData === null) {
      this.userDataArray.push(data);
      return;
    }
    
    this.userDataArray[this.editingProfileDataIndex] = data;
  }

  private clearEditingUserProfileData() {
    this.editingProfileData = {} as ProfileData;
    this.editingProfileDataIndex = {} as number;
  }

  addNewProfileData() {
    this.editingProfileData = null;
    this.basicInformationDialogHidden = false;
  }

  itemClick(event: ProfileData) {
    this.profileSelected.emit(event);
  }
}
