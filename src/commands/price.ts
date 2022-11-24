import { Client, ChatInputCommandInteraction, CommandInteraction} from "discord.js"
import { Command } from "../Command"

export const price: Command = {
    name:"price",
    description:"Returns price of inputed ticker",
    options: [{ name:"ticker" , description:'ticker requested', type:3, required:true }],

    run: async(client: Client, interaction: ChatInputCommandInteraction) => {
        try {
        var yahooStockPrices = require('yahoo-stock-prices');
        const data = await yahooStockPrices.getCurrentData(interaction.options.getString('ticker'));

        let content = `The price of \$${interaction.options.getString('ticker')} is \$${data.price}`
        await interaction.followUp(content)
        } catch(e) {
            await interaction.followUp("Please Enter a Valid Ticker!")
        }
    }
};

