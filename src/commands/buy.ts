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


        
        query = await userModel.findOne({discordId: interaction.user.tag} , {liquidBalance:1 , _id:0});
        availableCash = query?.liquidBalance;
        
        if(!query) {
            await interaction.followUp({content: 'Error finding user, please create a portfolio'})
            return;
        }
        
        

    
        if(availableCash < totalCost) { await interaction.followUp("You do not have enough money for this order!") }

        else {
            //create a new purchase object of the ticker, the price of the ticker and subtract that amount from liquid
            //add the purchase object to the portfolio array of that user 
            //figure out how to add a purchas object to mongo portfolio



            let singlePrice = (await yahooStockPrices.getCurrentData(ticker))
            let finalPrice = singlePrice.price * interaction.options.getInteger('quantity')

            const purchase: Purchase = {
                ticker: interaction.options.getString('ticker')?.toUpperCase(),
                quantity: interaction.options.getInteger('quantity'),
                totalPrice: finalPrice,
            }

            //push the purchase object to the portfolio array of the user
            let grabOldHoldBal = await userModel.findOne({discordId: interaction.user.tag} , {holdingsBalance:1 , _id:0});
            let oldHoldBal = grabOldHoldBal?.holdingsBalance;

            await userModel.updateOne({
                discordId: interaction.user.tag
            }, {
                $push: {
                    portfolio: {
                        ticker: purchase.ticker,
                        quantity: purchase.quantity,
                        totalPrice: purchase.totalPrice
                    }
                },
                $set: {
                    liquidBalance: availableCash - totalCost,
                    holdingsBalance: oldHoldBal + totalCost,
                }
            })


            await interaction.followUp({content: 'Purchase Successful!'})
        }
           
    }
}