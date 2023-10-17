import { Photo } from "./photo"

export interface Member {
    id: number
    username: string
    photoUrl: string
    age: number
    knownas: string
    created: Date
    lastactive: Date
    gender: string
    introduction: string
    lookingfor: string
    interests: string
    city: string
    country: string
    photos: Photo[]
}