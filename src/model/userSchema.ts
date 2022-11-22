import { Document, model, Schema } from "mongoose";

export interface Purchase {
    ticker: string,
    quantity: number,
    totalPrice: number
}

export interface UserInt {
    discordId: string,
    balance: number,
    portfolio: Purchase[],
}

export const User = new Schema({
    discordId: String,
    balance: Number,
    portfolio: Schema.Types.Mixed,
})


export default model<UserInt>("user", User);