//have to refetch data for each stock here i think and update liquid/holding balance

//or possible make a refresh fuynctrion that updatres liquid/holding before every buy sell to maintain accuracy


import { CommandInteraction, Client, ChatInputCommandInteraction, Embed, CommandInteractionOptionResolver } from "discord.js";
import { Command } from "../Command";
import userModel, { Purchase } from '../model/userSchema'


export const sell: Command = {
    name:"sell",
    description:"Sell any stocks within your portfolio",
    options: [{ name:"ticker" , description:'ticker requested', type:3, required:true }, { name:"quantity" , description:'quantity requested', type:4, required:true }],
    run: async(client: Client, interaction: ChatInputCommandInteraction) => {
        var ticker: string = ticker = interaction.options.getString('ticker')?.toUpperCase();
        var sellQuantity: number = sellQuantity = interaction.options.getInteger('quantity');
        var yahooStockPrices = require('yahoo-stock-prices');



        await userModel.updateOne(
          { discordId: interaction.user.tag },
          {
            $set: {
                //only holding bal 
              holdingsBalance: oldHoldBal - totalSale,
            },
          }
        );


        await interaction.followUp({ content:"Sell was a success!"})
    }
}