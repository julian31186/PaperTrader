import { CommandInteraction, Client, ChatInputCommandInteraction, Embed } from "discord.js";
import { Command } from "../Command";
import userModel, { Purchase } from '../model/userSchema'
import { EmbedBuilder } from "discord.js";

export const buy: Command = {
    name: "buy",
    description: "Buy a stock",
    options: [
        { name:"ticker" , description:'ticker requested', type:3, required:true }, 
        { name:"quantity" , description:'quantity requested', type:4, required:true }
    ],
    run: async(client: Client, interaction: ChatInputCommandInteraction)  => {
        var ticker: string = ticker = interaction.options.getString('ticker')?.toUpperCase();
        var quantity: number = quantity = interaction.options.getInteger('quantity');
        let totalCost;
        let query;
        let availableCash; 
        let data;
        let price;
        const yahooFinance = require('yahoo-finance2').default;

        try {
            data = await yahooFinance.quoteSummary(ticker);
            price = data.price.regularMarketPrice
            totalCost = price * quantity

        } catch(e) { await interaction.followUp("Please Enter a Valid Ticker!") }

        try {
            query = await userModel.findOne({discordId: interaction.user.tag} , {liquidBalance:1 , _id:0});
            availableCash = query?.liquidBalance;
        } catch(e) { await interaction.followUp({content: 'Error finding user'})}


        if(availableCash < totalCost) { await interaction.followUp("You do not have enough money for this order!") }

        else {
            const discordId = interaction.user.tag;
            const user = await userModel.findOne({ discordId });

            if (!user) {
                await interaction.followUp("You do not have a portfolio!")
                return;
            }

            const portfolioIndex = user.portfolio.findIndex((p) => p.ticker === ticker);

            if (portfolioIndex === -1) {
                user.portfolio.push({ ticker, quantity, totalPrice: price });
                user.liquidBalance -= totalCost;
                user.holdingsBalance += totalCost;
                user.totalBalance = user.liquidBalance + user.holdingsBalance
            } else {
                user.portfolio[portfolioIndex].quantity += quantity;
                user.liquidBalance -= totalCost;
                user.holdingsBalance += totalCost;
                user.totalBalance = user.liquidBalance + user.holdingsBalance
            }

            await user.save();
            await interaction.followUp({content: 'Purchase Successful!'})
        }
           
    }
}