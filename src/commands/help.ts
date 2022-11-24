import { Client, ChatInputCommandInteraction, Embed } from "discord.js";
import { Command } from "src/Command";
import { Commands } from "../Commands";


export const help: Command = {
    name: "help",
    description: "List all commands",
    run: async (client: Client, interaction: ChatInputCommandInteraction) => {
        const embed = {
            title: "Commands",
            description: "List of all commands",
            fields: Commands.map((command) => ({
                name: command.name,
                value: command.description,
            })),
        };

        await interaction.followUp({
            embeds: [embed],
        });
    }
}
