import { atom } from "recoil";
import { CartType } from "../../types/customType";

export const cartState = atom<CartType[]>({
    key : "cartState",
    default : []
})