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
    discordId: {type: String},
    totalBalance: {type: Number},
    liquidBalance: {type: Number},
    holdingsBalance: {type: Number},
    portfolio: [{ticker: String,
                 quantity: Number,
                 totalPrice: Number}]
})


export default model<UserInt>("user", User);