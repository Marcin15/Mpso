import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ProfileData } from 'src/app/models/profileData';

@Component({
  selector: 'app-basic-information-dialog[profileData]',
  templateUrl: './basic-information-dialog.component.html',
  styleUrls: ['./basic-information-dialog.component.scss']
})
export class BasicInformationDialogComponent implements OnInit {

  @Input() profileData!: ProfileData | null;

  @ViewChild('titleInput') titleInput!: ElementRef<HTMLInputElement>;
  @ViewChild('descriptionTextarea') descriptionTextarea!: ElementRef<HTMLTextAreaElement>;

  @Output() getUserProfileData = new EventEmitter<ProfileData>; 
  
  @Output() closeDialog = new EventEmitter;

  dialogHidden = false;
  
  //NgModel:
  title!: string;
  description!: string;

  values: number[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setInitialValues();
  }

  setInitialValues() { 
    if(this.profileData === null) return;
    

    this.title = this.profileData!.title;
    this.description = this.profileData!.description;

    this.values = this.profileData!.values;
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
      dateCreated: this.getDateCreated(),
      isModified: this.isModified(),
      lastModified: new Date()
    });
  }

  private getDateCreated(): Date {
    if(this.profileData === null)
      return new Date();

      return this.profileData!.dateCreated;
  }

  private isModified(): boolean {
    if(this.profileData === null)
      return false;

    return true;
  }
}
