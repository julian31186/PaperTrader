import { CommandInteraction, Client, ChatInputCommandInteraction, Embed } from "discord.js";
import { Command } from "../Command";
import userModel, { Purchase } from '../model/userSchema'


export const sell: Command = {
    name:"sell",
    description:"Sell any stocks within your portfolio",
    run: async(client: Client, interaction: ChatInputCommandInteraction) => {

    }

}