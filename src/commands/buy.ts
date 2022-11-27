import { CommandInteraction, Client, ChatInputCommandInteraction, Embed } from "discord.js";
import { Command } from "../Command";
import userModel, { Purchase } from '../model/userSchema'
import { EmbedBuilder } from "discord.js";

export const buy: Command = {
    name: "buy",
    description: "Buy a stock",
    options: [{ name:"ticker" , description:'ticker requested', type:3, required:true }, { name:"quantity" , description:'quantity requested', type:4, required:true }],
    run: async(client: Client, interaction: ChatInputCommandInteraction)  => {
        var ticker: string = ticker = interaction.options.getString('ticker')?.toUpperCase();
        var quantity: number = quantity = interaction.options.getInteger('quantity');
        let totalCost;
        let query;
        let availableCash; 
        var yahooStockPrices = require('yahoo-stock-prices');

         
        try {
        totalCost = (await yahooStockPrices.getCurrentData(ticker))
        totalCost = totalCost.price * quantity
        } catch(e) { await interaction.followUp("Please Enter a Valid Ticker!") }


        try {
            query = await userModel.findOne({discordId: interaction.user.tag} , {liquidBalance:1 , _id:0});
            availableCash = query?.liquidBalance;
        } catch(e) { await interaction.followUp({content: 'Error finding user'})}

    
        if(availableCash < totalCost) { await interaction.followUp("You do not have enough money for this order!") }

        else {
            //create a new purchase object of the ticker, the price of the ticker and subtract that amount from liquid
            //add the purchase object to the portfolio array of that user 
            //figure out how to add a purchas object to mongo portfolio

            const testPurchase: Purchase = {
                ticker: 'GME',
                quantity: 1,
                totalPrice: 26
            }
            // userModel.updateOne({discordId: interaction.user.tag}, {$push: {portfolio: {ticker: testPurchase.ticker, quantity: testPurchase.quantity, totalPrice: testPurchase.totalPrice}}})
            // await interaction.followUp({content: 'Purchase Successful!'})


            //push testpurchase to the portfolio array of the user
             userModel.update({
                 discordId: interaction.user.tag
                }, {
                    $push: {
                        portfolio: {
                            "ticker": testPurchase.ticker,
                            "quantity": testPurchase.quantity,
                            "totalPrice": testPurchase.totalPrice,
                        }
                    }
                })
                await interaction.followUp({content: 'Purchase Successful!'})
            
            


        }
           
    }
}