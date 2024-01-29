import { atom } from "recoil";
import { inquiryID } from "../../types/customType";

export const inquiryState = atom<inquiryID>({
    key : "inquiryState",
    default : {
        2 : [
            {
                write: "어드민",
                user: "admin",
                title: "asdsadas",
                cont: "<p>dasdsadsadsad</p>",
                token: 1700055019616,
                date: 1700055020481
            },
            {
                write: "어드민",
                user: "admin",
                title: "test2",
                cont: "<p>test2</p>",
                token: 166666666,
                date: 1700055020481
            }
        ]
    }
});