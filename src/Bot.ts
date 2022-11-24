import { Client } from "discord.js";
import ready from "./listeners/ready";
import * as dotenv from 'dotenv';
import interactionCreate from "./listeners/interactionCreate";

//TODO
//setup prisma
//when bot finished compose with docker
//setup alpaca API
//possibly make createPort embed look nicer


//Buy/Sell Logic
//when buyinig x amount shares, we subtract X * market share price from liquid balance and add it to holding balance.
//when selling x amount of shares, we add X * market share price to liquid balance and subtract it from holding balance
//total balance is always liquid+holding



//Viewing port logic
//loop through purchase array, create a hashmap of ticker:quantity while looping through purchases and show TICKER:QUANTIY totals
//also show net port balance on top

dotenv.config()
const token = process.env.DISC_TOKEN;

console.log("Bot is starting...");

const client = new Client({
    intents: []
});


ready(client)
interactionCreate(client)

client.login(token)