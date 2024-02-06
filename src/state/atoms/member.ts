import { atom } from "recoil";
import { UserType } from "../../types/customType";

export const memeberState = atom<UserType[]>({
    key : "memberState",
    default : []
})