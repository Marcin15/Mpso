import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProfileData } from 'src/app/models/profileData';

@Component({
  selector: 'app-basic-information-dialog',
  templateUrl: './basic-information-dialog.component.html',
  styleUrls: ['./basic-information-dialog.component.scss']
})
export class BasicInformationDialogComponent implements OnInit {

  @Output() getProfileData = new EventEmitter<ProfileData>; 
  @Output() closeDialog = new EventEmitter;
  
  title!: string;
  description!: string;

  constructor() { }

  ngOnInit(): void {
  }

  closeDialogClick() {    
    this.closeDialog.emit();
  }
}
