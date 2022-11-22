import { CommandInteraction, Client } from "discord.js";
import { Command } from "../Command";

//ephemiral false. we want every 1 to see it 

export const createPortfolio: Command = {
    name:"create_portfolio",
    description:"Creates a portfolio starting with $10k USD",
    run: async(client: Client, interaction: CommandInteraction) => {
        const content = "FUCK YOU PARK";
        await interaction.followUp({
            //ephemeral: false,
            content
        })
    }
};
