import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProfileData } from './models/profileData';
import { LocalStorageRepositoryService } from './services/local-storage-repository.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    profileDataArray: ProfileData[] = [];
    selectedProfile: ProfileData | null = null;
    showDataInsertDialog: boolean = false;
    showDataManagerDialog: boolean = false;

    constructor(private localStorageRepo: LocalStorageRepositoryService) {}

    ngOnInit(): void {
        var localStorageResult = this.localStorageRepo.getFromLocalStorage();

        if (localStorageResult) {
            this.profileDataArray = localStorageResult as ProfileData[];
            this.setDefaultProfile();
        }
    }

    click() {
        this.showDataInsertDialog = true;
    }

    getProfileData(event: ProfileData) {
        this.profileDataArray.push(event);
        this.showDataInsertDialog = false;

        this.setDefaultProfile();

        this.localStorageRepo.updateLocalStorage(this.profileDataArray);
    }

    setDefaultProfile() {
        if (this.profileDataArray.length > 0) {
            this.selectedProfile = this.profileDataArray[0];
        }
    }

    updateUserDataProfileArray() {
        this.localStorageRepo.updateLocalStorage(this.profileDataArray);
    }

    profileSelected(event: ProfileData) {
        this.selectedProfile = event;
    }
}
