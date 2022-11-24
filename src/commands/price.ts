import { Client, ChatInputCommandInteraction, CommandInteraction} from "discord.js"
import { Command } from "../Command"

export const price: Command = {
    name:"price",
    description:"Returns price of inputed ticker",
    options: [{ name:"ticker" , description:'ticker requested', type:3, required:true }],

    run: async(client: Client, interaction: ChatInputCommandInteraction) => {
        
        let content = `${interaction.options.getString('ticker')}`
        await interaction.followUp(content)
    }
};

//take in first arg as a parameter and call alphavantage api to get price of X ticker 