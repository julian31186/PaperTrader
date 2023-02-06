import { CommandInteraction, Client, ChatInputCommandInteraction, Embed } from "discord.js";
import { Command } from "../Command";
import userModel, { Purchase } from '../model/userSchema'
import { EmbedBuilder } from "discord.js";

export const portfolio: Command = {
    name: "portfolio",
    description: "View your portfolio",
    options: [],
    run: async(client: Client, interaction: ChatInputCommandInteraction)  => {
        const yahooFinance = require('yahoo-finance2').default;
        const discordId = interaction.user.tag;
        const user = await userModel.findOne({ discordId });

        if (!user) {
            await interaction.followUp("You do not have a portfolio!")
            return;
        }

        const portfolio = user.portfolio;


        let newHoldingBalance = 0;
        for(let i = 0; i < portfolio.length; i++) {
            const data = await yahooFinance.quoteSummary(portfolio[i].ticker);
            const price = data.price.regularMarketPrice;
            portfolio[i].totalPrice = price;
            newHoldingBalance += price * portfolio[i].quantity;
        }
        user.holdingsBalance = newHoldingBalance;
        user.totalBalance = user.liquidBalance + user.holdingsBalance;
        await user.save();


        const embed = new EmbedBuilder()
            .setTitle(`${interaction.user.username}'s Portfolio`)
            .setColor('#0099ff')
            .setThumbnail(interaction.user.avatarURL())
            .addFields(
                { name: 'Total Balance', value: `$${(user.totalBalance).toFixed(2)}`},
                { name: 'Liquid Cash', value: `$${(user.liquidBalance).toFixed(2)}`},
                { name: 'Total Holdings', value: `$${(user.holdingsBalance).toFixed(2)}` },
                )
            .addFields(
                {name: 'Shares' , value: '-----------------'}
            )
            .addFields(portfolio.map((p) => {
                return {
                    name: `$${p.ticker}`,
                    value: `Quantity: ${(p.quantity).toFixed(2)} \n Total Price: ${(p.totalPrice * p.quantity).toFixed(2)}`,
                };
            }))
        
        await interaction.followUp({embeds: [embed]})
    }
}