import { CommandInteraction, Client, Embed } from "discord.js";
import { Command } from "../Command";
import userModel, { Purchase } from '../model/userSchema'
import { EmbedBuilder } from "discord.js";


export const createPortfolio: Command = {
    name:"create_portfolio",
    description:"Creates a portfolio starting with $10k USD",
    run: async(client: Client, interaction: CommandInteraction) => {
        let content;
        
       
        let initialPortfolio: Purchase[] = []

        try {
            const doesUserExit = await userModel.exists({discordId: interaction.user.tag});

            if(doesUserExit) {
                throw new Error('User already exists');
            } else {
                await userModel.create({
                    discordId: interaction.user.tag,
                    totalBalance: 10000,
                    liquidBalance: 10000,
                    holdingsBalance: 0,
                    portfolio: initialPortfolio,
                })
                const userTotalBalance = (await userModel.findOne({discordId: interaction.user.tag} , {totalBalance:1, _id:0}))?.totalBalance
                

                let testEmbed: EmbedBuilder;
                testEmbed = new EmbedBuilder()
                .setTitle(`${interaction.user.username}'s Portfolio`)
                .setThumbnail(`${interaction.user.displayAvatarURL()}`)
                .addFields({ name: 'Total Balance:', value: `\$${userTotalBalance}`, inline: true })

             

                content = `${interaction.user.tag}!, we have successfully created a portfolio for you!`;
                await interaction.followUp({
                    content,
                    embeds:[testEmbed],
                })
            }
        

        } catch(e) {
            console.log("You already have a portfolio!")
            content = `${interaction.user.tag} already has an existing portfolio!`
            await interaction.followUp({
                content,
            })
            
        }
    }
};
