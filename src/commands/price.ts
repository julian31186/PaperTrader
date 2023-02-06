import { Client, ChatInputCommandInteraction, CommandInteraction} from "discord.js"
import { Command } from "../Command"


export const price: Command = {
    name:"price",
    description:"Returns price of inputed ticker",
    options: [{ name:"ticker" , description:'ticker requested', type:3, required:true }],

    run: async(client: Client, interaction: ChatInputCommandInteraction) => {
        try {
        const yahooFinance = require('yahoo-finance2').default;
        //test this on intraday and see if the bid is the correct price
        const ticker = interaction.options.getString('ticker')?.toUpperCase()

        const data = await yahooFinance.quoteSummary(ticker);
        
        const price = data.price.regularMarketPrice
        let content = `The price of \$${ticker} is \$${price}`


        await interaction.followUp(content)

        } catch(e) {
            console.log(e)
            await interaction.followUp("Please Enter a Valid Ticker!")
        }
    }
};
