import { atom } from "recoil";
import { UserType } from "../../types/customType";

export const userState = atom<UserType | null>({
    key : "userState",
    default : {
        userID : "test",
        password : "a123456",
        email : "admin@test.com",
        name : "테스트",
        nickname : "테스트",
        zipcode : "21405",
        address : "인천 부평구 경원대로1232번길 2 (산곡동)",
        address2 : "21321",
        phone : "01012345678"
    }
})