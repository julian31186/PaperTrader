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

        let owns = false
        let quantity = 0;
        let arr = (await userModel.findOne({discordId: interaction.user.tag} , {portfolio:1, _id:0}))

        if(!arr) {
            await interaction.followUp({ content:"You do not have a portfolio!"})
            return;
        }

        arr.portfolio.map(purchase => {
            if(purchase.ticker === ticker) {
                owns = true
                quantity = purchase.quantity
            }
        })
        if(owns === false) {
            await interaction.followUp({ content:"You do not own this stock!"})
            return;
        }
        if(sellQuantity > quantity) {
            await interaction.followUp({ content:"You do not own this many shares of this stock!"})
            return;
        }


        await userModel.updateOne({discordId:interaction.user.tag},{"$pull":{"portfolio":{"ticker": `${ticker}`}}});


        // let grabOldHoldBal = await userModel.findOne(
        //   { discordId: interaction.user.tag },
        //   { holdingsBalance: 1, _id: 0 }
        // );
        // let oldHoldBal = grabOldHoldBal?.holdingsBalance;

        // await userModel.updateOne(
        //   {
        //     discordId: interaction.user.tag,
        //   },
        //   {
        //     $push: {
        //       portfolio: {
        //         ticker: purchase.ticker,
        //         quantity: purchase.quantity,
        //         totalPrice: purchase.totalPrice,
        //       },
        //     },
        //     $set: {
        //       liquidBalance: availableCash - totalCost,
        //       holdingsBalance: oldHoldBal + totalCost,
        //     },
        //   }
        // );
        await interaction.followUp({ content:"Sell was a success!"})


    }
}