import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ProfileData } from 'src/app/models/profileData';

@Component({
  selector: 'app-basic-information-dialog',
  templateUrl: './basic-information-dialog.component.html',
  styleUrls: ['./basic-information-dialog.component.scss']
})
export class BasicInformationDialogComponent implements OnInit {

  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionTextarea') descriptionTextarea!: ElementRef<HTMLTextAreaElement>;

  @Output() getUserProfileData = new EventEmitter<ProfileData>; 
  dialogHidden = false;

  @Output() closeDialog = new EventEmitter;
  
  //NgModel:
  title!: string;
  description!: string;

  constructor() { }

  ngOnInit(): void {
  }

  titleInputClick(){
    this.titleInput.nativeElement.focus();
  }

  descriptionTextareaClick() {
    this.descriptionTextarea.nativeElement.focus();
  }

  closeDialogClick() {    
    this.closeDialog.emit();
  }

  submitClick() {
    this.dialogHidden = true;
  }

  operationSuccessful(event: number[]) {
    this.getUserProfileData.emit({
      title: this.title,
      description: this.description,
      values: event,
      dateCreated: new Date(),
      lastModified: new Date()
    });
  }
}
