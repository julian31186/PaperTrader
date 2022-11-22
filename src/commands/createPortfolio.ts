import { CommandInteraction, Client } from "discord.js";
import { Command } from "../Command";
import userModel, { Purchase } from '../model/userSchema'

export const createPortfolio: Command = {
    name:"create_portfolio",
    description:"Creates a portfolio starting with $10k USD",
    run: async(client: Client, interaction: CommandInteraction) => {
        //put business logic here with DB stuff
        //check if user exists already and possibly mess with schema 
        let content;
        let initialPortfolio: Purchase[] = []
       

        try {
            const doesUserExit = await userModel.exists({ discordId: interaction.user.tag});

            if(doesUserExit) {
                throw new Error('User already exists');
            } else {
                await userModel.create({
                    discordId: interaction.user.tag,
                    balance: 10000,
                    portfolio: initialPortfolio,
                })
                content = `Hello ${interaction.user.tag}!, we have successfully created a user for you!`;
            }
            
        } catch(e) {
            console.log("You already have a portfolio!")
            content = `${interaction.user.tag} already has an existing portfolio!`
        }

        
        await interaction.followUp({
            //show portfolio here
            content
        })
    }
};
