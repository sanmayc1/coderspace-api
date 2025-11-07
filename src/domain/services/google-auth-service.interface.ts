import { PassportStatic } from "passport";


export interface IGoogleAuthService{
    getPassport():PassportStatic
}