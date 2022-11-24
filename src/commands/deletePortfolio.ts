import { CommandInteraction, Client, ChatInputCommandInteraction, Embed } from "discord.js";
import { Command } from "../Command";
import userModel from '../model/userSchema'


//future fix, make a second confirmation prompt before deleting profile

export const deletePortfolio: Command = {
    name: "delete_portfolio",
    description: "Deletes users portfolio allowing them to start from scratch.",
    run: async (client: Client, interaction: ChatInputCommandInteraction ) => {
        const doesUserExistDelete = await userModel.exists({discordId:interaction.user.tag});
        let content;


        if(doesUserExistDelete) {
            await userModel.findOneAndDelete({ discordId:interaction.user.tag });
            content = `${interaction.user.tag}'s portfolio has been deleted!`
        } else {
            content = `${interaction.user.tag}'s portfolio does not exist!`
        }

        await interaction.followUp({
            content,
        })
    }
}