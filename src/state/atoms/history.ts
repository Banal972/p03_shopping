import { atom } from "recoil";
import { HistoryType } from "../../types/customType";

export const historyState = atom<HistoryType[]>({
    key : "historyState",
    default : []
})