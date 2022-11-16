import { ProfileBasicInformation } from "./profileBasicInformation"

export interface ProfileData {
    userProfileBasicInfo: ProfileBasicInformation,
    values: number[],
    dateCreated: Date,
    lastModified: Date
}