import { CommandInteraction, Client, ChatInputCommandInteraction, Embed, CommandInteractionOptionResolver } from "discord.js";
import { Command } from "../Command";
import userModel, { Purchase } from '../model/userSchema'


export const sell: Command = {
    name:"sell",
    description:"Sell any stocks within your portfolio",
    options: [{ name:"ticker" , description:'ticker requested', type:3, required:true }, { name:"quantity" , description:'quantity requested', type:4, required:true }],
    run: async(client: Client, interaction: ChatInputCommandInteraction) => {
        var ticker: string = ticker = interaction.options.getString('ticker')?.toUpperCase();
        var sellQuantity: number = sellQuantity = interaction.options.getInteger('quantity');
        var yahooStockPrices = require('yahoo-stock-prices');

        let owns = false
        let quantity = 0;
        let arr = (await userModel.findOne({discordId: interaction.user.tag} , {portfolio:1, _id:0}))

        if(!arr) {
            await interaction.followUp({content:"You do not have a portfolio!"})
            return;
        }


        let tickerQuantity = new Map()

        arr.portfolio.map(purchase => {
            if(!tickerQuantity.has(purchase.ticker)) {
                tickerQuantity.set(purchase.ticker, 1)
            }

            else if(tickerQuantity.has(purchase.ticker)) {
                tickerQuantity.set(purchase.ticker, tickerQuantity.get(purchase.ticker) + 1)
            }

            if(purchase.ticker === ticker) {
                owns = true
            }
            
        })

    
        if(owns === false) {
            await interaction.followUp({ content:"You do not own this stock!"})
            return;
        }

        quantity = tickerQuantity.get(ticker)

        if(sellQuantity > quantity) {
            await interaction.followUp({ content:"You do not own this many shares of this stock!"})
            return;
        }

        //UPDATE LIQUID AND HOLDINGS BALANCE BEFORE SELLING
        let grabOldHoldBal = await userModel.findOne(
            { discordId: interaction.user.tag },
            { holdingsBalance: 1, _id: 0 }
          );
        let oldHoldBal = grabOldHoldBal?.holdingsBalance;
        let query = await userModel.findOne({discordId: interaction.user.tag} , {liquidBalance:1 , _id:0});
        let availableCash = query?.liquidBalance;

        let singleSellPrice;

        try {
            singleSellPrice = (await yahooStockPrices.getCurrentData(ticker)) 
        } catch(e) {
            await interaction.followUp({content:"Please enter a valid ticker!"})
            return;
        }

        let totalSale = singleSellPrice.price * sellQuantity


        //figure out to make sure this only removes sellQuantity objects from the mongo array
        //BUG: where holding bal goes to negative infinity after selling??
        let count = 0
        

        

        //this also dosent work because if a purchase object is more than one, for example 2
        //and the user sells, one it deletes the entier thing so in order to fix we must
        //check if its > 1 and if so create a new purchase object, and add it to array, then update balances accordingly
        //********** */
        let newArr: any[] = []
            for (let i = 0; i < arr.portfolio.length; i++) {
              if(count === sellQuantity) break;

              if(arr.portfolio[i].ticker === ticker) {
                newArr.push(arr.portfolio[i])
                count++;
              } else {
                newArr.push(arr.portfolio[i])
              }
            }
            
        
        await userModel.updateOne({discordId:interaction.user.tag},
            {
                //switch this to just remove the purchase object from the purchase array
                //rather than pull bc pull removes all 
            //"$pull":{"portfolio":{"ticker": `${ticker}`}},
            
            $set: {
                portfolio: newArr,

                liquidBalance: availableCash + totalSale,

                //this only works if hold bal is being constantly refreshed to make sure we dont go negative
                holdingsBalance: oldHoldBal - totalSale,
            }
            });
        

        
        await interaction.followUp({ content:"Sell was a success!"})
    }
}