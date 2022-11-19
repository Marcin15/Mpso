import { ProfileBasicInformation } from "./profileBasicInformation"

export interface ProfileData {
    title: string,
    description: string
    values: number[],
    dateCreated: Date,
    isModifiled: boolean
    lastModified: Date
}