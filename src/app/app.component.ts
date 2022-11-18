import { Component, OnInit } from '@angular/core';
import { ProfileData } from './models/profileData';
import { LocalStorageRepositoryService } from './services/local-storage-repository.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    profileDataArray: ProfileData[] = [];
    selectedProfile!: ProfileData;
    showDataInsertDialog: boolean = false;
    showDataManagerDialog: boolean = false;

    constructor(private localStorageRepo: LocalStorageRepositoryService) {}

    ngOnInit(): void {
        var localStorageResult = this.localStorageRepo.getFromLocalStorage();

        if (localStorageResult) {
            this.profileDataArray = localStorageResult as ProfileData[];
            this.setDefaultProfile();
        }
        this.profileDataArray.push({
            title: 'Title 1',
            description: 'desc1',
            values: [23, 123.12, 1],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 2',
            description: 'desc2',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 3',
            description: 'desc3',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 4',
            description: 'desc4',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 5',
            description: 'desc5',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 5',
            description: 'desc5',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 5',
            description: 'desc5',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 5',
            description: 'desc5',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 5',
            description: 'desc5',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 5',
            description: 'desc5',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 5',
            description: 'desc5',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 5',
            description: 'desc5',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
        this.profileDataArray.push({
            title: 'Title 5',
            description: 'desc5',
            values: [],
            dateCreated: new Date(),
            lastModified: new Date(),
        });
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
        if (this.profileDataArray.length === 1) {
            this.selectedProfile = this.profileDataArray[0];
        }
    }
}
