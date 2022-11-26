import { Client, ChatInputCommandInteraction, CommandInteraction} from "discord.js"
import { Command } from "../Command"

export const price: Command = {
    name:"price",
    description:"Returns price of inputed ticker",
    options: [{ name:"ticker" , description:'ticker requested', type:3, required:true }],

    run: async(client: Client, interaction: ChatInputCommandInteraction) => {
        try {
        var yahooStockPrices = require('yahoo-stock-prices');
        const ticker = interaction.options.getString('ticker')?.toUpperCase()
        const data = await yahooStockPrices.getCurrentData(ticker);

        let content = `The price of \$${ticker} is \$${data.price}`
        await interaction.followUp(content)
        } catch(e) {
            await interaction.followUp("Please Enter a Valid Ticker!")
        }
    }
};
