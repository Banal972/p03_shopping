import { atom } from "recoil";
import { UserType } from "../../types/customType";

export const userState = atom<UserType | null>({
    key : "userState",
    default : null
})