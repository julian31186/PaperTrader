import { Document, model, Schema } from "mongoose";

export interface Purchase {
    ticker: string,
    quantity: number,
    totalPrice: number
}

export interface UserInt extends Document{
    discordId: string,
    totalBalance: number,
    liquidBalance: number,
    holdingsBalance: number,
    portfolio: Purchase[],
}

export const User = new Schema({
    discordId: String,
    totalBalance: Number,
    liquidBalance: Number,
    holdingsBalance: Number,
    portfolio: [{ticker: String,
                 quantity: Number,
                 totalPrice: Number}]
})


export default model<UserInt>("user", User);