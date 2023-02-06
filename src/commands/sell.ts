import { Client, ChatInputCommandInteraction, Embed } from "discord.js";
import { Command } from "src/Command";
import userModel, { Purchase } from '../model/userSchema'
import { Commands } from "../Commands";

export const sell: Command = {
    name: "sell",
    description: "Sell a stock",
    options: [ 
        { name:"ticker" , description:'ticker requested', type:3, required:true },
        { name:"quantity" , description:'quantity requested', type:4, required:true }
    ],
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {

        const ticker = interaction.options.getString('ticker')?.toUpperCase()
        const quantity = interaction.options.getInteger('quantity')
        let data;
        let price;

        const yahooFinance = require('yahoo-finance2').default;

        try {
            data = await yahooFinance.quoteSummary(ticker);
            price = data.price.regularMarketPrice
        } catch(e) {
            await interaction.followUp("Please enter a valid ticker!")
            return;
        }


        const discordId = interaction.user.tag;
        const user = await userModel.findOne({ discordId });

        if(!user) {
            await interaction.followUp("You do not have a portfolio!")
            return;
        }

        const ownsStock = user.portfolio.some(purchase => purchase.ticker === ticker);

        if(!ownsStock) {
            await interaction.followUp("You do not own this stock")
            return;
        }

        const stockToSell: Purchase = user.portfolio.find(purchase => purchase.ticker === ticker)

        if(stockToSell.quantity < quantity) {
            await interaction.followUp(`You do not own ${quantity} shares of this stock!`)
            return
        } 
        //other wise remove (quantity) amount of stock from their portfolio and update balances accordingly
        let yhdata = await yahooFinance.quoteSummary(ticker)
        let updatedMarketPrice = yhdata.price.regularMarketPrice
        let portfolio = user.portfolio

        let newHoldingBalance = 0;
        for(let i = 0; i < portfolio.length; i++) {
            const data = await yahooFinance.quoteSummary(portfolio[i].ticker);
            const price = data.price.regularMarketPrice;
            portfolio[i].totalPrice = price;
            newHoldingBalance += price * portfolio[i].quantity;
        }
        user.holdingsBalance = newHoldingBalance;
        user.totalBalance = user.liquidBalance + user.holdingsBalance;


        let totalSellAmount = updatedMarketPrice * quantity

        if(stockToSell.quantity === quantity) {
            user.portfolio = user.portfolio.filter(purchase => purchase.ticker !== ticker)
        } else {
            stockToSell.quantity -= quantity
        }

        user.liquidBalance += totalSellAmount
        user.holdingsBalance -= totalSellAmount
        user.totalBalance = user.liquidBalance + user.holdingsBalance
        
        await user.save()
        await interaction.followUp('Successfully sold stock!')
    }
}