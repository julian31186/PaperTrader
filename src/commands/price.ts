import { Client, ChatInputCommandInteraction, CommandInteraction} from 'discord.js'
import { Command } from '../Command'

export const price: Command = {
    name: 'price',
    description: 'Returns price of inputed ticker',
    run: async(client: Client, interaction: ChatInputCommandInteraction) => {
        //interaction.options.getString('sdf')
    }
}